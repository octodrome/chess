package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/octodrome/chess/rest-server/model"
)

func AddGameMessage(context *gin.Context) {
	var input model.Message
	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	savedEntry, err := input.Save()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"data": savedEntry})
}

func GetGameMessages(context *gin.Context) {
	messages, err := model.FindMessagesByGameId(context.Param("id"))

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"data": messages})
}
