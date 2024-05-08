package main

import (
	"fmt"
	"syscall/js"
)

func add(this js.Value, inputs []js.Value) interface{} {
	return inputs[0].Float() + inputs[1].Float()
}

func provideGame(_ js.Value, args []js.Value) interface{} {
	game := ReturnGame()

	// @TODO find how to simply return json instead of rebuilding the whole thing like below...
	// jsonGame, err := json.Marshal(game)
	// if err != nil {
	// 	return map[string]interface{}{
	// 		"error": "error from chess lib",
	// 	}
	// }

	return map[string]interface{}{
		"state": map[string]interface{}{
			"fenBoard":           game.state.fenBoard,
			"hasToPlay":          game.state.hasToPlay,
			"availableCastlings": game.state.availableCastlings,
			"enPassantTarget":    game.state.enPassantTarget,
			"halfMoveClock":      game.state.halfMoveClock,
			"fullMoveClock":      game.state.fullMoveClock,
		},
		"scan": map[string]interface{}{
			// @TODO for some reason it is not possible to pass the slice of strings game.scan.legalMoves
			"legalMoves": []interface{}{"est", "test"},
			"kingState": map[string]interface{}{
				"isChecked":    game.scan.kingState.isChecked,
				"isCheckMated": game.scan.kingState.isCheckMated,
				"isDraw":       game.scan.kingState.isDraw,
			},
		},
	}
}

func main() {
	c := make(chan int)
	js.Global().Set("add", js.FuncOf(add))
	js.Global().Set("provideGame", js.FuncOf(provideGame))

	fmt.Println("Hello from wasm")

	<-c
}
