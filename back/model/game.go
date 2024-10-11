package model

import (
	"github.com/octodrome/chess/go-rest-api-poc/database"
	"gorm.io/gorm"
)

type Game struct {
	gorm.Model
	CreatorID   uint   `json:"creator_id"`
	Creator     User   `gorm:"foreignKey:CreatorID" json:"creator"`
	GuestID     uint   `json:"guest_id"`
	Guest       User   `gorm:"foreignKey:GuestID" json:"guest"`
	HasToPlayID uint   `json:"has_to_play_id"`
	Moves       string `gorm:"size:255;not null;" json:"moves"`
	// Messages    []Message `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
}

func (game *Game) Save() (*Game, error) {
	err := database.Database.Create(&game).Error
	if err != nil {
		return &Game{}, err
	}

	err = database.Database.Preload("Creator").Preload("Guest").First(&game, game.ID).Error
	if err != nil {
		return &Game{}, err
	}
	return game, nil
}

func FindGameById(id string) (Game, error) {
	var game Game
	err := database.Database.Where("ID=?", id).Find(&game).Error
	if err != nil {
		return Game{}, err
	}
	return game, nil
}

// @TODO also remove game reference from users
func RemoveGame(id string) (Game, error) {
	var deletedGame Game
	err := database.Database.Delete(&deletedGame, id).Error
	if err != nil {
		return Game{}, err
	}
	return deletedGame, nil
}

type UpdateGameInput struct {
	Moves string `json:"moves"`
}

func UpdateGame(id string, input UpdateGameInput) (Game, error) {
	var updatedGame Game
	err := database.Database.Where("ID=?", id).First(&updatedGame).Error
	if err != nil {
		return Game{}, err
	}
	database.Database.Model(&updatedGame).Updates(input)
	return updatedGame, nil
}
