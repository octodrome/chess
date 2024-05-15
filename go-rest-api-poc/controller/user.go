package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetUsers(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{"data": "all the users"})
}
