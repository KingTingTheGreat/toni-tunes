package spotify

import (
	"fmt"
	"time"
)

const REFRESH_PERIOD = 24 * time.Hour

type DbTrack struct {
	Name        string          `json:"name"`
	Artists  	[]SpotifyArtist	`json:"artists"`
	Href        string          `json:"href"`
	ID          string          `json:"id"`
	AlbumImage  string  		`json:"url"`
}

func GetToniScore(accessToken, refreshToken string) (float32, []DbTrack, string, error) {
	topTracksRes, newAccessToken, err := GetTopTracks(accessToken, refreshToken)
	if err != nil {
		return 0, []DbTrack{}, "", err
	}

	if topTracksRes.Total == 0 {
		return 0, []DbTrack{}, "", err
	}

	total := 0
	var similarTracks []DbTrack

	for i, track := range topTracksRes.Items {
		total += 100 - track.Popularity
		if i < 5 { // Limit recommendations to first 5 tracks
			recTrack, _, err := GetRecommendation(accessToken, refreshToken, track)
			if err != nil {
				continue
			}
			fmt.Println("the recommended track for", track.Name, "is", recTrack.Name)
			similarTracks = append(similarTracks, DbTrack{recTrack.Name, recTrack.Artists, recTrack.Href, recTrack.ID, recTrack.Album.Images[0].Url})
		}
	}
	fmt.Println("Similar tracks:", similarTracks)

	// log.Println("total", total)
	// log.Println("length", len(topTracksRes.Items))

	score := float32(total) / float32(len(topTracksRes.Items))

	// truncate to hundredths
	return float32(int(score*100)) / 100, similarTracks, newAccessToken, nil
}
