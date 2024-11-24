package user_collection

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"log"
	"time"
	"toni-tunes/db"
	"toni-tunes/providers/spotify"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type SessionIdWithExp struct {
	SessionId string `bson:"sessionId"`
	Expires   string `bson:"expires"` // string representing time when expires
}

func genSessionId() (string, error) {
	newSessionId := func() (string, error) {
		const length int = 128
		// create byte slice of length 128
		bytes := make([]byte, length)

		// read random bytes from crypto/rand
		_, err := rand.Read(bytes)
		if err != nil {
			return "", err
		}

		// encode bytes to a base64 string
		return base64.RawURLEncoding.EncodeToString(bytes)[:length], nil
	}

	// create new session id
	sessionId, err := newSessionId()
	if err != nil {
		return "", err
	}
	// ensure unique session id
	for {
		_, err := GetUserBySessionId(sessionId)
		if err != nil {
			break
		}
		sessionId, err = newSessionId()
		if err != nil {
			return "", err
		}
	}
	return sessionId, nil
}

func RemoveSessionId(sessionId string) error {
	collection := db.GetCollection(USER_COLLECTION)

	filter := bson.M{
		"sessionIdList": bson.M{
			"$elemMatch": bson.M{
				"sessionId": sessionId,
			},
		},
	}
	update := bson.M{
		"$pull": bson.M{
			"sessionIdList": bson.M{
				"sessionId": sessionId,
			},
		},
	}
	_, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return err
	}

	return nil
}

func GetSessionId(user *DBUser) (string, error) {
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

	collection := db.GetCollection(USER_COLLECTION)
	res, err := collection.UpdateOne(context.Background(), bson.M{"providerId": user.ProviderId}, bson.M{
		"$set": bson.M{
			"accessToken":  user.AccessToken,
			"refreshToken": user.RefreshToken,
			"username":     user.Username,
			"email":        user.Email,
			"image":        user.Image,
		},
		"$setOnInsert": bson.M{
			"scoreHistory": []int{},
			"providerId":   user.ProviderId,
			"provider":     user.Provider,
			"lastUpdated":  newLastUpdatedString,
			"latestScore":  0,
		},
		"$push": bson.M{
			"sessionIdList": SessionIdWithExp{
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
