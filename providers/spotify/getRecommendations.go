package spotify

import (
	"encoding/json"
	"fmt"
)

type SpotifyRecTrack struct {
	Tracks []SpotifyTrack `json:"tracks"`
	Seeds  []Seed  `json:"seeds"`
}
type Seed struct {
	InitialPoolSize     int    `json:"initialPoolSize"`
	AfterFilteringSize  int    `json:"afterFilteringSize"`
	AfterRelinkingSize  int    `json:"afterRelinkingSize"`
	ID                  string `json:"id"`
	Type                string `json:"type"`
	Href                string `json:"href"`
}

func GetRecommendation(accessToken, refreshToken string, track SpotifyTrack) (*SpotifyTrack, string, error) {
	body, newAccessToken, err := spotifyRequest(accessToken, refreshToken, "https://api.spotify.com/v1/recommendations?limit=1&seed_tracks=" + track.ID + "&max_popularity=" + fmt.Sprintf("%d", max(track.Popularity - 1, 1)))

	if err != nil {
		return nil, "", err
	}

	var recommendation SpotifyRecTrack
	if err := json.Unmarshal(body, &recommendation); err != nil {
		fmt.Printf("Failed to unmarshal JSON: %v", err)
		return nil, "", err
	}

	if len(recommendation.Tracks) == 0 {
		// fmt.Println("No recommendation, indie enough")
		return nil, newAccessToken, nil
	}

	// Need first track of all recommendations
	firstTrack := recommendation.Tracks[0]

	return &firstTrack, newAccessToken, nil
}
