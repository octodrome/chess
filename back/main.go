package main

import (
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/octodrome/chess/go-rest-api-poc/controller"
	"github.com/octodrome/chess/go-rest-api-poc/database"
	"github.com/octodrome/chess/go-rest-api-poc/middleware"
	"github.com/octodrome/chess/go-rest-api-poc/model"
)

func main() {
	loadDatabase()
	serveApplication()
}

func loadDatabase() {
	database.Connect()
	database.Database.AutoMigrate(&model.User{})
	database.Database.AutoMigrate(&model.Game{})
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		frontUrl := os.Getenv("FRONT_URL")
		c.Writer.Header().Set("Access-Control-Allow-Origin", frontUrl)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func serveApplication() {
	router := gin.Default()
	router.Use(CORSMiddleware())

	publicRoutes := router.Group("/auth")
	publicRoutes.POST("/register", controller.Register)
	publicRoutes.POST("/login", controller.Login)

	protectedRoutes := router.Group("/api")
	protectedRoutes.Use(middleware.JWTAuthMiddleware())
	userRepo := model.NewUserRepository()
	protectedRoutes.GET("/user", func(c *gin.Context) {
		controller.GetAllUsers(c, userRepo)
	})
	protectedRoutes.GET("/user/:id", func(c *gin.Context) {
		controller.GetUserById(c, userRepo)
	})
	protectedRoutes.POST("/game", controller.AddGame)
	protectedRoutes.GET("/game", controller.GetAllUserGames)
	protectedRoutes.GET("/game/:id", controller.GetGameById)
	protectedRoutes.DELETE("/game/:id", controller.DeleteGame)
	protectedRoutes.PUT("/game/:id", controller.PutGame)

	router.Run(":8001")
	fmt.Println("Server running on port 8001")
}
