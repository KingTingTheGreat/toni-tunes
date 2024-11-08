package router

import (
	"net/http"
	"toni-tunes/handlers"
	spotify_handlers "toni-tunes/handlers/spotify"
)

// declare api routes
func Router() *http.ServeMux {
	router := http.NewServeMux()

	router.HandleFunc("GET /api/health", handlers.Health)

	router.HandleFunc("GET /api/sign-in/spotify", spotify_handlers.SpotifySignInRedirect)
	router.HandleFunc("GET /api/callback/spotify", spotify_handlers.SpotifyCallback)

	router.HandleFunc("GET /api/profile", handlers.Profile)

	return router
}
