package handlers

import (
	"encoding/json"
	"net/http"
	"toni-tunes/db/user_collection"
)

type LeaderboardUser struct {
	Id       string  `json:"id"`
	Username string  `json:"username"`
	Score    float32 `json:"score"`
}

func Leaderboard(w http.ResponseWriter, r *http.Request) {
	dbUsers, err := user_collection.AllUsers()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong. please try again."))
		return
	}

	topUsers := []LeaderboardUser{}
	for _, dbUser := range *dbUsers {
		topUsers = append(topUsers, LeaderboardUser{
			Id:       dbUser.Id.Hex(),
			Username: dbUser.Username,
			Score:    dbUser.LatestScore,
		})
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(topUsers)
}
