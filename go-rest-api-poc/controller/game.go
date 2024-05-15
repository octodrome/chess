package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetGames(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{"data": "all the games"})
}
