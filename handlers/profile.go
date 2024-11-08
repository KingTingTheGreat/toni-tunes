package handlers

import (
	"encoding/json"
	"net/http"
	"toni-tunes/db"
)

type ToniTunesProfile struct {
	Id           string `json:"id"`
	Username     string `json:"username"`
	ScoreHistory []int  `json:"scoreHistory"`
}

func Profile(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var user db.DBUser
	user, ok := ctx.Value("user").(db.DBUser)
	if !ok {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again."))
		return
	}

	// only send the 10 most recent scores
	var history []int
	if len(user.ScoreHistory) <= 10 {
		history = user.ScoreHistory
	} else {
		history = user.ScoreHistory[len(user.ScoreHistory)-10:]
	}

	profile := ToniTunesProfile{
		Id:           user.Id.Hex(),
		Username:     user.Username,
		ScoreHistory: history,
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(profile)
}
