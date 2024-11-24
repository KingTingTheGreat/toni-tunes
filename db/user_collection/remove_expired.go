package user_collection

import (
	"context"
	"log"
	"slices"
	"sync"
	"time"
	"toni-tunes/db"

	"go.mongodb.org/mongo-driver/bson"
)

func RemoveExpired() error {
	collection := db.GetCollection(USER_COLLECTION)

	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}

	n := time.Now()
	nStr, err := n.MarshalText()
	if err != nil {
		return err
	}
	nowSession := SessionIdWithExp{
		Expires: string(nStr),
	}

	cleanUserSessionIdList := func(user *DBUser, wg *sync.WaitGroup) error {
		defer wg.Done()
		index, _ := slices.BinarySearchFunc(user.SessionIdList, nowSession, func(E, T SessionIdWithExp) int {
			var expires time.Time
			err := expires.UnmarshalText([]byte(E.Expires))
			if err != nil {
				log.Println("failed to unmarshal expiration")
				return -1
			}

			if n.After(expires) {
				return -1
			} else if n.Before(expires) {
				return 1
			}
			return 0
		})

		var newSessionIdList []SessionIdWithExp
		if index >= len(user.SessionIdList) {
			newSessionIdList = []SessionIdWithExp{}
		} else {
			newSessionIdList = user.SessionIdList[index:]
		}

		if len(user.SessionIdList) != len(newSessionIdList) {
			log.Println("removing expired session id")
		} else {
			log.Println("no expired session id to remove")
		}

		collection.UpdateByID(context.Background(), user.Id, bson.M{"$set": bson.M{
			"sessionIdList": newSessionIdList,
		}})

		return nil
	}

	wg := sync.WaitGroup{}
	for cursor.Next(context.Background()) {
		var user DBUser
		if err := cursor.Decode(&user); err != nil {
			continue
		}

		go cleanUserSessionIdList(&user, &wg)
		wg.Add(1)
	}
	wg.Wait()

	return nil
}
