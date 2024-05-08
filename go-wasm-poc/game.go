package main

type Game struct {
	state State
	scan  Scan
}

type State struct {
	fenBoard           string
	hasToPlay          rune
	availableCastlings string
	enPassantTarget    string
	halfMoveClock      int
	fullMoveClock      int
}

type Scan struct {
	legalMoves []string
	kingState  KingState
}

type KingState struct {
	isChecked    bool
	isCheckMated bool
	isDraw       bool
}

func ReturnGame() Game {
	return Game{
		state: State{
			fenBoard:           "asdflkjasfd",
			hasToPlay:          'w',
			availableCastlings: "asdf",
			enPassantTarget:    "dasf",
			halfMoveClock:      2,
			fullMoveClock:      2,
		},

		scan: Scan{
			legalMoves: []string{"e2e4", "e2e3"},
			kingState: KingState{
				isChecked:    false,
				isCheckMated: false,
				isDraw:       false,
			},
		},
	}
}
