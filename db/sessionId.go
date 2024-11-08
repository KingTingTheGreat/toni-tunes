package db

import (
	"crypto/rand"
	"encoding/base64"
)

func genSessionId() (string, error) {
	newSessionId := func() (string, error) {
		const length int = 128
		// create byte slice of length 128
		bytes := make([]byte, length)

		// read random bytes from crypto/rand
		_, err := rand.Read(bytes)
		if err != nil {
			return "", err
		}

		// encode bytes to a base64 string
		return base64.RawURLEncoding.EncodeToString(bytes)[:length], nil
	}

	// create new session id
	sessionId, err := newSessionId()
	if err != nil {
		return "", err
	}
	// ensure unique session id
	for {
		_, err := GetUserBySessionId(sessionId)
		if err != nil {
			break
		}
		sessionId, err = newSessionId()
		if err != nil {
			return "", err
		}
	}
	return sessionId, nil
}
