package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/octodrome/chess/go-rest-api-poc/controller"
	"github.com/octodrome/chess/go-rest-api-poc/database"
	"github.com/octodrome/chess/go-rest-api-poc/model"
)

func main() {
	loadEnv()
	loadDatabase()
	serveApplication()
}

func loadDatabase() {
	database.Connect()
	database.Database.AutoMigrate(&model.User{})
	database.Database.AutoMigrate(&model.Game{})
}

func loadEnv() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func serveApplication() {
	router := gin.Default()

	apiRoutes := router.Group("/api")
	apiRoutes.GET("/user", controller.GetUsers)
	apiRoutes.GET("/game", controller.GetGames)
	router.Run(":8000")
	fmt.Println("Server running on port 8000")
}
