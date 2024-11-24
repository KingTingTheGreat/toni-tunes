package handlers

import (
	"net/http"
	"toni-tunes/cookies"
	"toni-tunes/db/user_collection"
	"toni-tunes/domain"
)

func SignOut(w http.ResponseWriter, r *http.Request) {
	sessionId := cookies.GetSessionId(r)
	if sessionId == "" {
		http.Redirect(w, r, domain.DOMAIN, http.StatusSeeOther)
	}

	user_collection.RemoveSessionId(sessionId)
	cookies.RemoveSessionId(w)

	go user_collection.RemoveExpired()

	http.Redirect(w, r, domain.DOMAIN, http.StatusSeeOther)
}
