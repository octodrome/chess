package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/octodrome/chess/socket-server/model"
)

func SendMessageToAPI(gameID uint, msg model.Message) error {
	// Construct the API endpoint URL
	url := fmt.Sprintf("http://rest-server:8001/api/game/%d/messages", gameID)

	// Create the JSON payload
	payload := struct {
		GameID  uint   `json:"game_id"`
		FromID  uint   `json:"from_id"`
		ToID    uint   `json:"to_id"`
		Content string `json:"content"`
	}{
		GameID:  gameID,
		FromID:  msg.FromID,
		ToID:    msg.ToID,
		Content: msg.Content,
	}

	// Encode payload to JSON
	jsonData, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	// Create a new HTTP request
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return err
	}

	// Set headers, including the Authorization header
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+msg.Token)

	// Send the request using an HTTP client
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Check for a successful response
	if resp.StatusCode != http.StatusCreated {
		return fmt.Errorf("failed to create message: %s", resp.Status)
	}

	return nil
}
