package cookies

import (
	"net/http"
	"os"
	"time"
)

const COOKIE_LIFETIME = 7 * 24 * time.Hour
const SESSION_ID_COOKIE_NAME = "toni-tunes-session-id"

func SetSessionId(w http.ResponseWriter, sessionId string) {
	var secure bool
	if os.Getenv("ENVIRONMENT") == "dev" {
		secure = false
	} else {
		secure = true
	}
	cookie := http.Cookie{
		Name:     SESSION_ID_COOKIE_NAME,
		Value:    sessionId,
		Secure:   secure,
		HttpOnly: true,
		Path:     "/",
		Expires:  time.Now().Add(COOKIE_LIFETIME),
		SameSite: http.SameSiteStrictMode,
	}

	http.SetCookie(w, &cookie)
}

func GetSessionId(r *http.Request) string {
	cookie, err := r.Cookie(SESSION_ID_COOKIE_NAME)
	if err != nil {
		return ""
	}

	return cookie.Value
}

func RemoveSessionId(w http.ResponseWriter) {
	SetSessionId(w, "")
}
