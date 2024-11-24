package main

import (
	"log"
	// "toni-tunes/db"
	// "toni-tunes/db/user_collection"
	"toni-tunes/domain"
	"toni-tunes/server"

	"github.com/joho/godotenv"
)

// entrypoint for local development
func main() {
	godotenv.Load(".env.local")

	domain.DOMAIN = "http://localhost:3000"

	server := server.NewServer()
	log.Println("Server running at http://localhost:8080")
	server.ListenAndServe()

	// err := user_collection.RemoveExpired()
	// if err != nil {
	// 	log.Println(err.Error())
	// } else {
	// log.Println("success")
	// }
}
