package handlers

import (
	"net/http"
	"toni-tunes/cookies"
	"toni-tunes/db"
	"toni-tunes/domain"
)

func SignOut(w http.ResponseWriter, r *http.Request) {
	sessionId := cookies.GetSessionId(r)
	if sessionId == "" {
		http.Redirect(w, r, domain.DOMAIN, http.StatusSeeOther)
	}

	db.RemoveSessionId(sessionId)
	cookies.RemoveSessionId(w)

	http.Redirect(w, r, domain.DOMAIN, http.StatusSeeOther)
}
