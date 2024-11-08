package model

import (
	"database/sql"
	"time"

	"github.com/octodrome/chess/go-rest-api-poc/database"
)

type Game struct {
	ID                    uint         `gorm:"primarykey" json:"id"`
	CreatedAt             time.Time    `json:"created_at"`
	UpdatedAt             time.Time    `json:"updated_at"`
	DeletedAt             sql.NullTime `gorm:"index" json:"deleted_at"`
	CreatorID             uint         `json:"creator_id"`
	Creator               User         `gorm:"foreignKey:CreatorID" json:"creator"`
	CreatorCapturedPieces string       `json:"creator_captured_pieces"`
	CreatorColor          string       `json:"creator_color"`
	GuestID               uint         `json:"guest_id"`
	Guest                 User         `gorm:"foreignKey:GuestID" json:"guest"`
	GuestCapturedPieces   string       `json:"guest_captured_pieces"`
	HasToPlayID           uint         `json:"has_to_play_id"`
	Moves                 string       `gorm:"size:255;not null;" json:"moves"`
	Messages              []Message    `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"messages"`
	Fen                   string       `json:"fen"`
}

func (game *Game) Save() (*Game, error) {
	err := database.Database.Create(&game).Error
	if err != nil {
		return &Game{}, err
	}

	err = database.Database.Preload("Creator").Preload("Guest").Preload("Messages").First(&game, game.ID).Error
	if err != nil {
		return &Game{}, err
	}
	return game, nil
}

func FindGameById(id string) (Game, error) {
	var game Game
	err := database.Database.Preload("Creator").Preload("Guest").Preload("Messages").Where("ID=?", id).Find(&game).Error
	if err != nil {
		return Game{}, err
	}
	return game, nil
}

func FindGameByUserId(userId string) ([]Game, error) {
	var gameList []Game
	err := database.Database.Preload("Creator").Preload("Guest").Where("creator_id=?", userId).Or("guest_id=?", userId).Find(&gameList).Error
	if err != nil {
		return []Game{}, err
	}
	return gameList, nil
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
