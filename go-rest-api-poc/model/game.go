package model

import (
	"github.com/octodrome/chess/go-rest-api-poc/database"
	"gorm.io/gorm"
)

type Game struct {
	gorm.Model
	UserID uint
	// GuestID     uint
	// HasToPlayID uint
	Moves string `gorm:"size:255;not null;" json:"moves"`
}

func (game *Game) Save() (*Game, error) {
	err := database.Database.Create(&game).Error
	if err != nil {
		return &Game{}, err
	}
	return game, nil
}
