package spotify

import (
	"time"
)

const REFRESH_PERIOD = 24 * time.Hour

type similarTrack struct {
	Track     string
	SimilarTo string
	TrackPop  int
}

func GetToniScore(accessToken, refreshToken string) (float32, string, error) {
	topTracksRes, newAccessToken, err := GetTopTracks(accessToken, refreshToken)
	if err != nil {
		return 0, "", err
	}

	if topTracksRes.Total == 0 {
		return 0, newAccessToken, nil
	}

	total := 0
	count := 0
	for _, track := range topTracksRes.Items {
		total += 100 - track.Popularity
		count += 100
		// fmt.Println("lalala", track.Name)
	}


	log.Println("total", total)
	log.Println("length", len(topTracksRes.Items))

	score := float32(total) / float32(len(topTracksRes.Items))

	// truncate to hundredths
	return float32(int(score*100)) / 100, newAccessToken, nil
}

// GetRecs fetches track recommendations for the user's top tracks
func GetRecs(accessToken, refreshToken string) ([]similarTrack, string, error) {
	var similarTracks []similarTrack

	topTracksRes, newAccessToken, err := GetTopTracks(accessToken, refreshToken)
	if err != nil {
		return similarTracks, "", err
	}

	if topTracksRes.Total == 0 {
		return similarTracks, newAccessToken, nil
	}

	for i, track := range topTracksRes.Items {
		if i < 5 { // Limit to first 5 tracks
			parts := strings.Split(track.Uri, ":")
			spotifyId := parts[len(parts)-1]

			recTrack, _, err := GetRecommendation(accessToken, refreshToken, spotifyId)
			if err != nil {
				continue
			}
			fmt.Println("the recommended track was", recTrack)
			similarTracks = append(similarTracks, similarTrack{
				Track:     recTrack.Name,
				SimilarTo: track.Name,
				TrackPop:  recTrack.Popularity,
			})
		}
	}

    fmt.Println("Similar tracks:", similarTracks)
	return similarTracks, newAccessToken, nil
}
