package handlers

import (
	"encoding/json"
	"net/http"
	"time"
	"toni-tunes/db"
	"toni-tunes/providers/spotify"
)

type ToniTunesProfile struct {
	Id           string    `json:"id"`
	Username     string    `json:"username"`
	ScoreHistory []float32 `json:"scoreHistory"`
}

func Profile(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var user db.DBUser
	user, ok := ctx.Value("user").(db.DBUser)
	if !ok {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("you are not signed in"))
		return
	}

	var lastUpdated time.Time
	err := lastUpdated.UnmarshalText([]byte(user.LastUpdated))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong, please try again"))
		return
	}
	if lastUpdated.Add(spotify.REFRESH_PERIOD).Before(time.Now()) {
		score, newAccessToken, err := spotify.GetToniScore(user.AccessToken, user.RefreshToken)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("something went wrong, please try again"))
			return
		}
		err = db.AppendScore(user.Id, score, newAccessToken)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("something went wrong, please try again"))
			return
		}
		user.ScoreHistory = append(user.ScoreHistory, score)
	}

	// only send the 10 most recent scores
	var history []float32
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
