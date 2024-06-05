package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/octodrome/chess/go-rest-api-poc/controller"
	"github.com/octodrome/chess/go-rest-api-poc/database"
	"github.com/octodrome/chess/go-rest-api-poc/middleware"
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

	publicRoutes := router.Group("/auth")
	publicRoutes.POST("/register", controller.Register)
	publicRoutes.POST("/login", controller.Login)

	protectedRoutes := router.Group("/api")
	protectedRoutes.Use(middleware.JWTAuthMiddleware())
	protectedRoutes.GET("/user", controller.GetAllUsers)
	protectedRoutes.GET("/user/:id", controller.GetUserById)
	protectedRoutes.POST("/game", controller.AddGame)
	protectedRoutes.GET("/game", controller.GetAllUserGames)
	protectedRoutes.GET("/game/:id", controller.GetGameById)
	protectedRoutes.DELETE("/game/:id", controller.DeleteGame)

	router.Run(":8001")
	fmt.Println("Server running on port 8001")
}
