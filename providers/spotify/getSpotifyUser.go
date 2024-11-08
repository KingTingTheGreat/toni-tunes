package spotify

import (
	"encoding/json"
)

type SpotifyImage struct {
	Height int    `json:"height"`
	Width  int    `json:"width"`
	Url    string `json:"url"`
}

type SpotifyUser struct {
	DisplayName string         `json:"display_name"`
	Email       string         `json:"email"`
	Href        string         `json:"href"`
	SpotifyId   string         `json:"id"`
	Images      []SpotifyImage `json:"images"`
}

func GetSpotifyUser(accessToken, refreshToken string) (*SpotifyUser, string, error) {
	body, newAccessToken, err := spotifyRequest(accessToken, refreshToken, "https://api.spotify.com/v1/me")
	if err != nil {
		return nil, "", err
	}

	var spotifyUser SpotifyUser
	if err := json.Unmarshal(body, &spotifyUser); err != nil {
		return nil, "", err
	}

	return &spotifyUser, newAccessToken, nil
}
