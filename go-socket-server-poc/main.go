package main

import (
	"fmt"
	"net"
)

// @TODO to go further with chat rooms https://www.youtube.com/watch?v=Sphme0BqJiY

func main() {
	fmt.Println("Hello from socket server")
	// listen for incoming connections on port :8080
	ln, err := net.Listen("tcp", ":8080")

	if err != nil {
		fmt.Println(err)
	}

	// accept incoming connections and handle them
	for {
		conn, err := ln.Accept()
		if err != nil {
			fmt.Println(err)
		}

		// accept the current connection in a new go routine
		go handleConnection(conn)
	}
}

func handleConnection(conn net.Conn) {
	// close the connection at the end
	defer conn.Close()

	// read incoming data
	buf := make([]byte, 1024)
	_, err := conn.Read(buf)
	if err != nil {
		fmt.Println(err)
		return
	}

	// Print the incoming data
	fmt.Printf("Connection: %s\n", conn.RemoteAddr().Network())
	fmt.Printf("Received: %s", buf)

}
