package user_collection

import (
	"context"
	"fmt"
	"time"
	"toni-tunes/db"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func AppendScore(id primitive.ObjectID, score float32, newAccessToken string) error {
	lastUpdated := time.Now()
	lastedUpdatedString, err := lastUpdated.MarshalText()
	if err != nil {
		return err
	}

	set := bson.M{
		"lastUpdated": lastedUpdatedString,
		"latestScore": score,
	}
	if newAccessToken != "" {
		set["accessToken"] = newAccessToken
	}

	collection := db.GetCollection(USER_COLLECTION)
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
