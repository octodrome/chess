package main

import (
	"fmt"
	"net"
)

func main() {
	// connect to the socket server
	conn, err := net.Dial("tcp", ":8080")
	if err != nil {
		fmt.Println(err)
		return
	}

	// send some data to the server
	_, err = conn.Write([]byte("Hello, server!\n"))
	if err != nil {
		fmt.Println(err)
		return
	}

	// close the connection
	conn.Close()
}
