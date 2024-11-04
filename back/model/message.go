package model

import (
	"github.com/octodrome/chess/go-rest-api-poc/database"
	"gorm.io/gorm"
)

type Message struct {
	gorm.Model
	GameID uint `json:"game_id"`
	// Game    Game   `gorm:"foreignKey:GameID" json:"game"`
	FromID  uint   `json:"from_id"`
	ToID    uint   `json:"to_id"`
	Content string `gorm:"size:255;not null;" json:"content"`
}

func (message *Message) Save() (*Message, error) {
	err := database.Database.Create(&message).Error
	if err != nil {
		return &Message{}, err
	}
	return message, nil
}

func FindMessagesByGameId(gameId string) ([]Message, error) {
	var messageList []Message
	err := database.Database.Where("game_id=?", gameId).Find(&messageList).Error
	if err != nil {
		return []Message{}, err
	}
	return messageList, nil
}
