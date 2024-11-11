package middleware

import (
	"context"
	"log"
	"net/http"
	"toni-tunes/cookies"
	"toni-tunes/db"
)

func UserInfo(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// get user from db
		sessionId := cookies.GetSessionId(r)
		if sessionId == "" {
			sessionId = r.URL.Query().Get("sessionId")
			if sessionId == "" {
				log.Println("no session id", cookies.GetSessionId(r), r.URL.Query().Get("sessionId"))
				next.ServeHTTP(w, r)
				return
			}
		}

		user, err := db.GetUserBySessionId(sessionId)
		if err != nil {
			if err.Error() == "redirect" {
				log.Println("expired sessionId")
			}
			log.Println("invalid session id")
			next.ServeHTTP(w, r)
			return
		}

		log.Println("got user")
		ctx := context.WithValue(r.Context(), "user", *user)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
