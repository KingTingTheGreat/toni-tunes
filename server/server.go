package server

// THIS FILE WILL MOST LIKELY NOT NEED CHANGES
// TO CREATE/EDIT/DELETE ROUTES GO TO /api/router/router.go
import (
	"net/http"
	"toni-tunes/middleware"
	"toni-tunes/router"
)

func NewServer() *http.Server {
	router := router.Router()
	// create middleware stack
	middlewareStack := middleware.Stack()

	server := http.Server{
		Addr:    ":8080",                 // run on port 8080
		Handler: middlewareStack(router), // use middleware
	}

	return &server
}
