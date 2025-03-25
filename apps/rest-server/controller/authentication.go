package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/octodrome/chess/rest-server/helper"
	"github.com/octodrome/chess/rest-server/model"
)

func Register(context *gin.Context) {
	var input model.AuthenticationInput

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := model.User{
		Email:    input.Email,
		Password: input.Password,
	}

	savedUser, err := user.Save()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"user": savedUser})
}

func Login(context *gin.Context) {
	var input model.AuthenticationInput

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := model.FindUserByEmail(input.Email)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = user.ValidatePassword(input.Password)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	jwt, err := helper.GenerateJWT(user)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"token": jwt, "user": user})
}
