package db

import (
	"context"
	"fmt"
	"log"
	"slices"
	"time"
	"toni-tunes/providers/spotify"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const USER_COLLECTION = "user-collection"

type SessionWithExp struct {
	SessionId string `bson:"sessionId"`
	Expires   string `bson:"expires"` // string representing time when expires
}

type OAuthProvider string

const (
	SPOTIFY OAuthProvider = "spotify"
)

type DBUser struct {
	ProviderId    string             `bson:"providerId"`
	Id            primitive.ObjectID `bson:"_id"`
	AccessToken   string             `bson:"accessToken"`
	RefreshToken  string             `bson:"refreshToken"`
	SessionIdList []SessionWithExp   `bson:"sessionIdList"`
	Provider      OAuthProvider      `bson:"provider"`
	ScoreHistory  []float32          `bson:"scoreHistory"`
	Username      string             `bson:"username"`
	Email         string             `bson:"email"`
	LastUpdated   string             `bson:"lastUpdated"`
}

// get a user by their database id
func GetUserById(id primitive.ObjectID) (*DBUser, error) {
	collection := GetCollection(USER_COLLECTION)

	var user DBUser
	err := collection.FindOne(context.Background(), bson.M{"_id": id}).Decode(&user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

// get a user by their sessionId
func GetUserBySessionId(sessionId string) (*DBUser, error) {
	collection := GetCollection(USER_COLLECTION)

	// res := collection.FindOne(context.Background(), bson.M{"sessionId": sessionId})
	res := collection.FindOne(context.Background(), bson.M{"sessionIdList": bson.M{"$elemMatch": bson.M{"sessionId": sessionId}}})

	var user DBUser
	err := res.Decode(&user)
	if err != nil {
		return nil, err
	}

	// check if sessionId is expired
	i := slices.IndexFunc(user.SessionIdList, func(sessionIdWithExp SessionWithExp) bool {
		return sessionIdWithExp.SessionId == sessionId
	})
	if i == -1 {
		return nil, fmt.Errorf("could not validate sessionId")
	}
	var expires time.Time
	err = expires.UnmarshalText([]byte(user.SessionIdList[i].Expires))
	if err != nil {
		return nil, err
	}
	now := time.Now()
	if now.After(expires) {
		// remove this sessionId from database
		newSessionIdList := user.SessionIdList[i+1:]
		res, err := collection.UpdateByID(context.Background(), user.Id, bson.M{
			"$set": bson.M{
				"sessionIdList": newSessionIdList,
			},
		})
		if err != nil {
			// it's okay if something goes wrong with this operation, should not affect user flow
			log.Println("error removing", err.Error())
		}
		log.Println(res.MatchedCount, "matches found", res.ModifiedCount, "modified")

		// reject this sessionId and redirect to login flow
		return nil, fmt.Errorf("redirect")
	}

	return &user, nil
}

func InsertUser(user *DBUser) (string, error) {
	sessionId, err := genSessionId()
	if err != nil {
		return "", err
	}

	expires := time.Now().Add(spotify.REFRESH_PERIOD)
	expiresString, err := expires.MarshalText()
	if err != nil {
		return "", err
	}

	// last updated value for new users so, upon request, we will calculate a score for them
	newLastUpdated := time.Now().Add(-spotify.REFRESH_PERIOD)
	newLastUpdatedString, err := newLastUpdated.MarshalText()
	if err != nil {
		return "", err
	}

	collection := GetCollection(USER_COLLECTION)
	res, err := collection.UpdateOne(context.Background(), bson.M{"providerId": user.ProviderId}, bson.M{
		"$set": bson.M{
			"accessToken":  user.AccessToken,
			"refreshToken": user.RefreshToken,
			"username":     user.Username,
			"email":        user.Email,
		},
		"$setOnInsert": bson.M{
			"scoreHistory": []int{},
			"providerId":   user.ProviderId,
			"provider":     user.Provider,
			"lastUpdated":  newLastUpdatedString,
		},
		"$push": bson.M{
			"sessionIdList": SessionWithExp{
				SessionId: sessionId,
				Expires:   string(expiresString),
			},
		},
	}, options.Update().SetUpsert(true))
	if err != nil {
		log.Println("error with mongodb operation", err.Error())
		return "", err
	}
	if res.ModifiedCount == 0 && res.UpsertedCount == 0 && res.MatchedCount == 0 {
		log.Println("no entry in db")
		return "", fmt.Errorf("no db update")
	}

	return sessionId, nil
}

func AppendScore(id primitive.ObjectID, score float32, recommendations []spotify.DbTrack, newAccessToken string) error {
	lastUpdated := time.Now()
	lastedUpdatedString, err := lastUpdated.MarshalText()
	if err != nil {
		return err
	}

	set := bson.M{
		"lastUpdated": lastedUpdatedString,
		"currentRecs": recommendations,
	}
	if newAccessToken != "" {
		set["accessToken"] = newAccessToken
	}

	collection := GetCollection(USER_COLLECTION)
	res, err := collection.UpdateByID(context.Background(), id, bson.M{
		"$set": set,
		"$push": bson.M{
			"scoreHistory": score,
		},
	})
	if err != nil {
		return err
	}
	if res.ModifiedCount == 0 {
		return fmt.Errorf("score not appended to anything")
	}

	return nil
}
