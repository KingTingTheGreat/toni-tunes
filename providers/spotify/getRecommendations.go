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

func GetRecommendation(accessToken, refreshToken string, spotifyId string) (*SpotifyTrack, string, error) {
	// Fetch recommendation from Spotify API
	body, newAccessToken, err := spotifyRequest(accessToken, refreshToken, "https://api.spotify.com/v1/recommendation?limit=1&seed_tracks="+spotifyId+"&target_popularity=40")
	fmt.Print("raw body", string(body))
	// fmt.Print(" ")
	if err != nil {
		return nil, "", err
	}

	// Parse the response into SpotifyRecTrack structure
	var recommendation SpotifyRecTrack
	if err := json.Unmarshal(body, &recommendation); err != nil {
		fmt.Printf("Failed to unmarshal JSON: %v", err)
		return nil, "", err
	}

	fmt.Printf("Fetched Recommendation: %+v", recommendation)

	// Ensure there is at least one track in the response
	if len(recommendation.Tracks) == 0 {
		// log.Println("No recommendation for you, you are indie enouguh")
		return nil, newAccessToken, nil
	}

	// Extract the first track
	firstTrack := recommendation.Tracks[0]
	// log.Printf("Selected Track: %+v", firstTrack)

	return &firstTrack, newAccessToken, nil
}
