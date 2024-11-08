package middleware

import "net/http"

// function to chain middleware
func CreateStack(xs ...func(http.Handler) http.Handler) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		for i := len(xs) - 1; i >= 0; i-- {
			x := xs[i]
			next = x(next)
		}
		return next
	}
}

// create chain of middleware
func Stack() func(http.Handler) http.Handler {
	return CreateStack(
		Logger,
		// UserInfo,
		// Auth,
	)
}
