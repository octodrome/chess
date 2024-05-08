package main

import (
	"encoding/json"
	"syscall/js"
)

func wrapper(_ js.Value, args []js.Value) interface{} {
	var fenString string = args[0].String()
	// @TODO error if multiple args
	// @TODO error if invalid fen string

	game := GenerateGame(fenString)
	jsonGame, err := json.Marshal(game)

	if err != nil {
		// @TODO return JSON error
		return map[string]interface{}{
			"error": "error from chess lib",
		}
	}

	return string(jsonGame)
}

func main() {
	c := make(chan int)

	js.Global().Set("generateGame", js.FuncOf(wrapper))

	<-c
}
