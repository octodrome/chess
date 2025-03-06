package main

import (
	"fmt"
	"os"
	"strings"

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
	database.Database.AutoMigrate(&model.Game{}, &model.User{}, &model.Message{})
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		allowedOrigins := strings.Split(os.Getenv("FRONT_URL"), ",")

		origin := c.Request.Header.Get("Origin")
		for _, allowed := range allowedOrigins {
			if origin == allowed {
				c.Writer.Header().Set("Access-Control-Allow-Origin", allowed)
				break
			}
		}
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

	api := router.Group("/api")
	publicRoutes := api.Group("/auth")
	publicRoutes.POST("/register", controller.Register)
	publicRoutes.POST("/login", controller.Login)
	protectedRoutes := api.Group("/")
	protectedRoutes.Use(middleware.JWTAuthMiddleware())
	userRepo := model.NewUserRepository()
	protectedRoutes.GET("/user", func(c *gin.Context) {
		controller.GetAllUsers(c, userRepo)
	})
	protectedRoutes.GET("/user/:id", func(c *gin.Context) {
		controller.GetUserById(c, userRepo)
	})
	protectedRoutes.PUT("/user/:id", controller.PutUser)
	protectedRoutes.POST("/game", controller.AddGame)
	protectedRoutes.GET("/game", controller.GetAllUserGames)
	protectedRoutes.GET("/game/:id", controller.GetGameById)
	protectedRoutes.DELETE("/game/:id", controller.DeleteGame)
	protectedRoutes.PUT("/game/:id", controller.PutGame)
	protectedRoutes.GET("/game/:id/messages", controller.GetGameMessages)
	protectedRoutes.POST("/game/:id/messages", controller.AddGameMessage)

	router.Run(":8001")
	fmt.Println("Server running on port 8001")
}
