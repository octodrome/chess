package model

type Message struct {
	Token   string `json:"token"`
	FromID  uint   `json:"from_id"`
	ToID    uint   `json:"to_id"`
	GameID  uint   `json:"game_id"`
	Content string `json:"content"`
}
