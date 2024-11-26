package user_collection

import (
	"context"
	"fmt"
	"time"
	"toni-tunes/db"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func AppendScore(id primitive.ObjectID, score float32, newAccessToken string) (string, error) {
	lastUpdated := time.Now()
	lastedUpdatedString, err := lastUpdated.MarshalText()
	if err != nil {
		return "", err
	}

	set := bson.M{
		"lastUpdated": lastedUpdatedString,
		"latestScore": score,
	}
	if newAccessToken != "" {
		set["accessToken"] = newAccessToken
	}

	today := time.Now()
	todayDate := today.Format("01/02/2006")

	collection := db.GetCollection(USER_COLLECTION)
	res, err := collection.UpdateByID(context.Background(), id, bson.M{
		"$set": set,
		"$push": bson.M{
			"scoreHistory": DBScoreElement{
				Score: score,
				Date:  todayDate,
			},
		},
	})
	if err != nil {
		return "", err
	}
	if res.ModifiedCount == 0 {
		return "", fmt.Errorf("score not appended to anything")
	}

	return todayDate, nil
}
