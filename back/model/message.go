package model

import (
	"github.com/octodrome/chess/go-rest-api-poc/database"
	"gorm.io/gorm"
)

type Message struct {
	gorm.Model
	GameID  uint
	From    uint
	Content string `gorm:"size:255;not null;" json:"content"`
}

func (message *Message) Save() (*Message, error) {
	err := database.Database.Create(&message).Error
	if err != nil {
		return &Message{}, err
	}
	return message, nil
}
