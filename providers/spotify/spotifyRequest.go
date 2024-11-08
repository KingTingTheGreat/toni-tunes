package spotify

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"
)

// sends a request to the specified endpoint and returns the response bytes
func spotifyRequest(accessToken, refreshToken, endpoint string) ([]byte, string, error) {
	requestFunc := func(accessToken, endpoint string) ([]byte, error) {
		req, err := http.NewRequest("GET", endpoint, nil)
		if err != nil {
			return []byte{}, err
		}

		req.Header.Set("Authorization", "Bearer "+accessToken)

		client := &http.Client{}
		res, err := client.Do(req)
		if err != nil {
			return []byte{}, err
		}
		defer res.Body.Close()

		if res.StatusCode == http.StatusUnauthorized {
			return []byte{}, fmt.Errorf("unauthorized request")
		} else if res.StatusCode != http.StatusOK {
			return []byte{}, fmt.Errorf("unexpected status code: %d", res.StatusCode)
		}

		body, err := io.ReadAll(res.Body)
		if err != nil {
			return []byte{}, err
		}

		return body, nil
	}

	firstAttempt, err := requestFunc(accessToken, endpoint)
	if err == nil {
		return firstAttempt, "", nil
	}
	if err.Error() != "unauthorized request" {
		return []byte{}, "", err
	}

	newAccessToken, err := refreshAccessToken(refreshToken)
	if err != nil {
		return []byte{}, "", fmt.Errorf("could not refresh access")
	}

	secondAttempt, err := requestFunc(newAccessToken, endpoint)
	return secondAttempt, newAccessToken, nil
}

// Takes in RefreshToken and returns a new AccessToken
func refreshAccessToken(refreshToken string) (string, error) {
	data := url.Values{}
	data.Set("grant_type", "refresh_token")
	data.Set("refresh_token", refreshToken)

	req, err := http.NewRequest("POST", "https://accounts.spotify.com/api/token", strings.NewReader(data.Encode()))
	if err != nil {
		return "", err
	}

	req.SetBasicAuth(os.Getenv("SPOTIFY_CLIENT_ID"), os.Getenv("SPOTIFY_CLIENT_SECRET"))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer res.Body.Close()

	var tokenResponse TokenResponse
	err = json.NewDecoder(res.Body).Decode(&tokenResponse)
	if err != nil {
		return "", err
	}

	return tokenResponse.AccessToken, nil
}
