package handler

// THIS IS THE VERCEL ENTRY POINT FOR GOLANG
// THIS FILE SHOULD NOT NEED TO BE EDITED
import (
	"net/http"
	"toni-tunes/server"
)

// Vercel entrypoint
func HandlerFunc(w http.ResponseWriter, r *http.Request) {
	server := server.NewServer()
	server.Handler.ServeHTTP(w, r)
}
