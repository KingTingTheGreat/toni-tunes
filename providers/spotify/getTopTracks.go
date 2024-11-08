package spotify

import (
	"encoding/json"
)

type SpotifyArtist struct {
	Name string `json:"name"`
	Href string `json:"href"`
	Uri  string `json:"uri"`
}

type SpotifyAlbum struct {
	Name        string          `json:"name"`
	Href        string          `json:"href"`
	Uri         string          `json:"uri"`
	Artists     []SpotifyArtist `json:"artists"`
	ReleaseDate string          `json:"release_date"`
	TotalTracks int             `json:"total_tracks"`
	Images      []SpotifyImage  `json:"images"`
}

type SpotifyTrack struct {
	Name        string          `json:"name"`
	Album       SpotifyAlbum    `json:"album"`
	Artists     []SpotifyArtist `json:"artists"`
	Uri         string          `json:"uri"`
	Href        string          `json:"href"`
	TrackNumber int             `json:"track_number"`
	Popularity  int             `json:"popularity"`
}

type SpotifyTopTracksResponse struct {
	Items []SpotifyTrack `json:"items"`
	Total int            `json:"total"`
	Limit int            `json:"limit"`
}

func GetTopTracks(accessToken, refreshToken string) (*SpotifyTopTracksResponse, string, error) {
	body, newAccessToken, err := spotifyRequest(accessToken, refreshToken, "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=1")
	if err != nil {
		return nil, "", err
	}

	var topTracksResponse SpotifyTopTracksResponse
	if err := json.Unmarshal(body, &topTracksResponse); err != nil {
		return nil, "", err
	}

	return &topTracksResponse, newAccessToken, nil
}
