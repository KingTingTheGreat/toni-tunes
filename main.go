package main

import (
	"log"
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
}
