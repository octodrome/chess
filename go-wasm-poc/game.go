package main

import (
	"strconv"
	"strings"
)

// @TODO format JSON fields snake_case ?
type Game struct {
	State State
	Scan  Scan
}

type State struct {
	FenBoard           string
	HasToPlay          string
	AvailableCastlings string
	EnPassantTarget    string
	HalfMoveClock      int
	FullMoveClock      int
}

type Scan struct {
	LegalMoves []string
	KingState  KingState
}

type KingState struct {
	IsChecked    bool
	IsCheckMated bool
	IsDraw       bool
}

func GenerateGame(fenString string) Game {
	fenList := strings.Split(fenString, " ")
	// @TODO don't ignore errors
	halfMoveClock, _ := strconv.Atoi(fenList[4])
	fullMoveClock, _ := strconv.Atoi(fenList[5])

	return Game{
		State: State{
			FenBoard:           fenList[0],
			HasToPlay:          fenList[1],
			AvailableCastlings: fenList[2],
			EnPassantTarget:    fenList[3],
			HalfMoveClock:      halfMoveClock,
			FullMoveClock:      fullMoveClock,
		},

		Scan: Scan{
			LegalMoves: []string{"e2e4", "e2e3"},
			KingState: KingState{
				IsChecked:    false,
				IsCheckMated: false,
				IsDraw:       false,
			},
		},
	}
}
