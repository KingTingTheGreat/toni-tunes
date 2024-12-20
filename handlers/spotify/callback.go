package spotify_handlers

import (
	"net/http"
	"toni-tunes/db/user_collection"
	"toni-tunes/providers"
	"toni-tunes/providers/spotify"
)

func SpotifyCallback(w http.ResponseWriter, r *http.Request) {
	code := r.URL.Query().Get("code")
	if code == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("no authorization code"))
		return
	}

	accessToken, refreshToken, err := spotify.ExchangeSpotifyCode(code)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong. please try again."))
		return
	}

	spotifyUser, newAccessToken, err := spotify.GetSpotifyUser(accessToken, refreshToken)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong. please try again."))
		return
	}
	if newAccessToken != "" {
		accessToken = newAccessToken
	}

	dbUser := user_collection.DBUser{
		ProviderId:   spotifyUser.SpotifyId,
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		Provider:     providers.SPOTIFY,
		Username:     spotifyUser.DisplayName,
		Email:        spotifyUser.Email,
		Image:        spotifyUser.Images[0].Url,
	}

	sessionId, err := user_collection.GetSessionId(&dbUser)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("something went wrong. please try again."))
		return
	}

	// cookies.SetSessionId(w, sessionId)
	// http.Redirect(w, r, domain.DOMAIN+"/profile", http.StatusSeeOther)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(sessionId))
}
