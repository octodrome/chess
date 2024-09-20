package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/octodrome/chess/go-rest-api-poc/model"
)

func GetAllUsers(context *gin.Context) {
	users, err := model.FindAllUsers()
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	context.JSON(http.StatusOK, gin.H{"data": users})
}

func GetUserById(context *gin.Context) {
	user, err := model.FindUserById(context.Param("id"))
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	context.JSON(http.StatusOK, gin.H{"data": user})
}
