package user_collection

import (
	"context"
	"fmt"
	"log"
	"slices"
	"time"
	"toni-tunes/db"
	"toni-tunes/providers"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

const USER_COLLECTION = "user-collection"

type DBScoreElement struct {
	Score float32 `bson:"score" json:"score"`
	Date  string  `bson:"date" json:"date"`
}

type DBUser struct {
	ProviderId    string                  `bson:"providerId"`
	Id            primitive.ObjectID      `bson:"_id"`
	AccessToken   string                  `bson:"accessToken"`
	RefreshToken  string                  `bson:"refreshToken"`
	SessionIdList []SessionIdWithExp      `bson:"sessionIdList"`
	Provider      providers.OAuthProvider `bson:"provider"`
	ScoreHistory  []DBScoreElement        `bson:"scoreHistory"`
	Username      string                  `bson:"username"`
	Email         string                  `bson:"email"`
	Image         string                  `bson:"image"`
	LastUpdated   string                  `bson:"lastUpdated"`
	LatestScore   float32                 `bson:"latestScore"`
}

// get a user by their database id
func GetUserById(id primitive.ObjectID) (*DBUser, error) {
	collection := db.GetCollection(USER_COLLECTION)

	var user DBUser
	err := collection.FindOne(context.Background(), bson.M{"_id": id}).Decode(&user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

// get a user by their sessionId
func GetUserBySessionId(sessionId string) (*DBUser, error) {
	collection := db.GetCollection(USER_COLLECTION)

	// res := collection.FindOne(context.Background(), bson.M{"sessionId": sessionId})
	res := collection.FindOne(context.Background(), bson.M{"sessionIdList": bson.M{"$elemMatch": bson.M{"sessionId": sessionId}}})

	var user DBUser
	err := res.Decode(&user)
	if err != nil {
		return nil, err
	}

	// check if sessionId is expired
	i := slices.IndexFunc(user.SessionIdList, func(sessionIdWithExp SessionIdWithExp) bool {
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

func AllUsers() (*[]DBUser, error) {
	collection := db.GetCollection(USER_COLLECTION)

	pipeline := mongo.Pipeline{
		bson.D{
			{Key: "$sort", Value: bson.D{
				{Key: "latestScore", Value: -1},
			}},
		},
	}

	cursor, err := collection.Aggregate(context.Background(), pipeline)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	users := []DBUser{}
	for cursor.Next(context.Background()) {
		var user DBUser
		if err := cursor.Decode(&user); err != nil {
			log.Println("error decoding")
			continue
		} else if len(user.ScoreHistory) == 0 {
			continue
		}
		log.Println("decoding success")
		users = append(users, user)
		if len(users) == 10 {
			break
		}
	}

	return &users, nil
}
