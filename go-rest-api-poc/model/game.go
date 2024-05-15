package model

import "gorm.io/gorm"

type Game struct {
	gorm.Model
	UserID      uint
	GuestID     string
	HasToPlayID string
	Moves       string
}
