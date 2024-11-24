package middleware

import (
	"log"
	"net/http"
	"time"
)

// middleware for logging out requests and their response times
func Logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Println(r.Method, r.URL.Path, start.Format("01/02/2006 03:04:05.000 PM"), time.Since(start))
	})
}
