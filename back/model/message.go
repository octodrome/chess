package model

import (
	"database/sql"
	"time"

	"github.com/octodrome/chess/go-rest-api-poc/database"
)

type Message struct {
	ID        uint         `gorm:"primarykey" json:"id"`
	CreatedAt time.Time    `json:"created_at"`
	UpdatedAt time.Time    `json:"updated_at"`
	DeletedAt sql.NullTime `gorm:"index" json:"deleted_at"`
	GameID    uint         `json:"game_id"`
	FromID    uint         `json:"from_id"`
	ToID      uint         `json:"to_id"`
	Content   string       `gorm:"size:255;not null;" json:"content"`
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
