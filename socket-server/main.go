package main

import (
	"log"
	"net/http"

	socketio "github.com/googollee/go-socket.io"
	"github.com/rs/cors"
)

func main() {
	// Create a new Socket.IO server
	server := socketio.NewServer(nil)

	// Handle connection
	server.OnConnect("/", func(s socketio.Conn) error {
		s.SetContext("")
		log.Printf("New client connected: %s\n", s.ID())
		return nil
	})

	// Handle disconnection
	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		log.Printf("Client disconnected: %s, Reason: %s\n", s.ID(), reason)
	})

	// Handle "message" event
	server.OnEvent("/", "message", func(s socketio.Conn, msg map[string]interface{}) {
		log.Printf("Message from %s: %v\n", s.ID(), msg)
		s.Emit("message", msg) // Emit message back to client
	})

	// Handle "joinGame" event
	server.OnEvent("/", "joinGame", func(s socketio.Conn, params map[string]interface{}) {
		log.Printf("User joined game: %v\n", params)
		s.Emit("joinGame", params) // Emit game join event
	})

	// Handle "leaveGame" event
	server.OnEvent("/", "leaveGame", func(s socketio.Conn, params map[string]interface{}) {
		log.Printf("User left game: %v\n", params)
		s.Emit("leaveGame", params) // Emit game leave event
	})

	// Start server
	go server.Serve()
	defer server.Close()

	// Apply CORS middleware
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"}, // Frontend origin
		AllowCredentials: true,
	})
	// Use CORS handler
	http.Handle("/socket.io/", corsHandler.Handler(server))

	log.Println("Socket.IO server started at http://localhost:5000...")
	log.Fatal(http.ListenAndServe(":5000", nil))
}
