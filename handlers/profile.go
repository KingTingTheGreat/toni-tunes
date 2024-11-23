package handlers

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"os"
	"time"
	"toni-tunes/db"
	"toni-tunes/providers/spotify"
)

func randomHistory() []float32 {
	history := []float32{}
	for {
		history = append(history, rand.Float32()*100)
		if rand.Intn(1000) < 150 {
			break
		}
	}

	return history
}

type ToniTunesProfile struct {
	Id           string    `json:"id"`
	Username     string    `json:"username"`
	ScoreHistory []float32 `json:"scoreHistory"`
}

func Profile(w http.ResponseWriter, r *http.Request) {
	log.Println("profile handler")
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
	if lastUpdated.Add(spotify.REFRESH_PERIOD).Before(time.Now()) || os.Getenv("ENVIRONMENT") == "dev" {
		score, recommendations, newAccessToken, err := spotify.GetToniScore(user.AccessToken, user.RefreshToken)
		log.Println("getting newest score")
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("something went wrong, please try again"))
			return
		}
		err = db.AppendScore(user.Id, score, recommendations, newAccessToken)
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
	}

	// profile := ToniTunesProfile{
	// 	Id:           "0",
	// 	Username:     "username",
	// 	ScoreHistory: randomHistory(),
	// }

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(profile)
}
