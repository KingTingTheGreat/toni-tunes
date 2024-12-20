package spotify

import (
	"log"
	"time"
)

const REFRESH_PERIOD = 24 * time.Hour

func GetToniScore(accessToken, refreshToken string) (float32, string, error) {
	topTracksRes, newAccessToken, err := GetTopTracks(accessToken, refreshToken)
	if err != nil {
		return 0, "", err
	}

	if topTracksRes.Total == 0 {
		return 0, newAccessToken, nil
	}

	total := 0
	for _, track := range topTracksRes.Items {
		total += 100 - track.Popularity
	}

	log.Println("total", total)
	log.Println("length", len(topTracksRes.Items))

	score := float32(total) / float32(len(topTracksRes.Items))

	// truncate to hundreths
	return float32(int(score*100)) / 100, newAccessToken, nil
}
