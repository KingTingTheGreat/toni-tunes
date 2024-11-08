package db

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectDB() *mongo.Client {
	godotenv.Load(".env.local")
	bg := context.Background()
	ctxWT, cancel := context.WithTimeout(bg, 5000*time.Millisecond)
	defer cancel()

	client, err := mongo.Connect(ctxWT, options.Client().ApplyURI(os.Getenv("MONGO_URI")))
	if err != nil {
		log.Fatal(err)
	}

	// ping db to check connection
	err = client.Ping(ctxWT, nil)
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Connected to MongoDB")
	return client
}

var db *mongo.Client = ConnectDB()
var collectionCache = map[string]*mongo.Collection{}

func GetCollection(collectionName string) *mongo.Collection {
	env := os.Getenv("ENVIRONMENT")
	if env == "" {
		env = "dev"
	}

	collection, ok := collectionCache[collectionName]
	if ok {
		return collection
	}

	collection = db.Database(os.Getenv("DB_NAME") + env).Collection(collectionName)
	collectionCache[collectionName] = collection
	return collection
}
