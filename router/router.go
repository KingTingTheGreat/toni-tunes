package router

import (
	"net/http"
	"toni-tunes/handlers"
)

// declare api routes
func Router() *http.ServeMux {
	router := http.NewServeMux()

	router.HandleFunc("GET /api/health", handlers.Health)

	return router
}
