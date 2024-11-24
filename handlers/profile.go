package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
	"toni-tunes/db/user_collection"
	"toni-tunes/providers/spotify"
)

type ToniTunesProfile struct {
	Id           string    `json:"id"`
	Username     string    `json:"username"`
	ScoreHistory []float32 `json:"scoreHistory"`
	Image        string    `json:"image"`
}

func Profile(w http.ResponseWriter, r *http.Request) {
	log.Println("profile handler")
	ctx := r.Context()

	var user user_collection.DBUser
	user, ok := ctx.Value("user").(user_collection.DBUser)
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
		log.Println("getting newest score")
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("something went wrong, please try again"))
			return
		}
		err = user_collection.AppendScore(user.Id, score, newAccessToken)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("something went wrong, please try again"))
			return
		}
		user.ScoreHistory = append(user.ScoreHistory, score)
	} else {
		log.Println("not getting new score", lastUpdated)
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
		Image:        user.Image,
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(profile)
}
