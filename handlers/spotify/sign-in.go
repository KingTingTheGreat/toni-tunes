package spotify_handlers

import (
	"fmt"
	"net/http"
	"net/url"
	"os"
)

func SpotifySignInRedirect(w http.ResponseWriter, r *http.Request) {
	params := url.Values{}
	params.Set("client_id", os.Getenv("SPOTIFY_CLIENT_ID"))
	params.Set("response_type", "code")
	params.Set("redirect_uri", os.Getenv("SPOTIFY_REDIRECT_URI"))
	params.Set("scope", "user-top-read user-read-email")

	url := fmt.Sprintf("%s?%s", "https://accounts.spotify.com/authorize", params.Encode())

	http.Redirect(w, r, url, http.StatusSeeOther)
}
