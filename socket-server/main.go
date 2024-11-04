package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/octodrome/chess/socket-server/model"
	"github.com/octodrome/chess/socket-server/services"
)

type JoinGameParams struct {
	UserID string `json:"userId"`
	GameID string `json:"gameId"`
}

// Upgrader to upgrade HTTP requests to WebSocket connections.
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true // Accept connections from any origin for simplicity
	},
}

// Map to keep track of connections per game ID.
var gameConnections = make(map[string][]*websocket.Conn)

func handleConnections(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Error upgrading connection: %v\n", err)
		return
	}
	defer ws.Close()

	// Main loop to listen for events.
	for {
		var incoming map[string]interface{}
		err := ws.ReadJSON(&incoming)
		if err != nil {
			log.Printf("Error reading JSON: %v\n", err)
			break
		}

		event, ok := incoming["event"].(string)
		if !ok {
			log.Println("Invalid event type")
			continue
		}

		switch event {
		case "joinGame":
			var params JoinGameParams
			if err := mapToStruct(incoming["data"], &params); err == nil {
				joinGame(ws, params)
			}
		case "leaveGame":
			var params JoinGameParams
			if err := mapToStruct(incoming["data"], &params); err == nil {
				leaveGame(ws, params)
			}
		case "message":
			var msg model.Message
			if err := mapToStruct(incoming["data"], &msg); err == nil {
				gameID := msg.GameID
				log.Printf("Successfully mapped message: %+v", msg) // Log the mapped message

				if err := services.SendMessageToAPI(gameID, msg); err != nil {
					log.Printf("Error sending message to API: %v", err)
				} else {
					broadcastMessage(msg)
				}
			} else {
				log.Printf("Error mapping incoming data to Message struct: %v", err)
				log.Printf("Incoming data for message: %+v", incoming["data"]) // Log the raw incoming data for inspection
			}
		}
	}
}

func joinGame(conn *websocket.Conn, params JoinGameParams) {
	gameConnections[params.GameID] = append(gameConnections[params.GameID], conn)
	log.Printf("User %s joined game %s\n", params.UserID, params.GameID)
}

func leaveGame(conn *websocket.Conn, params JoinGameParams) {
	connections := gameConnections[params.GameID]
	for i, c := range connections {
		if c == conn {
			gameConnections[params.GameID] = append(connections[:i], connections[i+1:]...)
			break
		}
	}
	log.Printf("User %s left game %s\n", params.UserID, params.GameID)
}

func broadcastMessage(msg model.Message) {
	for _, connections := range gameConnections {
		for _, conn := range connections {
			if err := conn.WriteJSON(map[string]interface{}{
				"event": "message",
				"data":  msg,
			}); err != nil {
				log.Printf("Error broadcasting message: %v\n", err)
			}
		}
	}
}

// Helper function to map generic JSON to struct
func mapToStruct(data interface{}, v interface{}) error {
	byteData, _ := json.Marshal(data)
	return json.Unmarshal(byteData, v)
}

func main() {
	http.HandleFunc("/ws", handleConnections)

	log.Println("Server started on :5000")
	err := http.ListenAndServe(":5000", nil)
	if err != nil {
		log.Fatalf("Server error: %v\n", err)
	}
}
