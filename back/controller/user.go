package controller

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/octodrome/chess/go-rest-api-poc/model"
)

func GetAllUsers(context *gin.Context, repo model.UserRepository) {
	var users []model.User
	exceptQuery := context.Query("except")

	if exceptQuery != "" {
		query, err := strconv.ParseUint(exceptQuery, 10, 0)
		if err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		users, err = repo.FindUsersExcept(uint(query))
		if err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	} else {
		var err error
		users, err = repo.FindAllUsers()
		if err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}

	context.JSON(http.StatusOK, gin.H{"data": users})
}

func GetUserById(context *gin.Context, repo model.UserRepository) {
	user, err := repo.FindUserById(context.Param("id"))
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	context.JSON(http.StatusOK, gin.H{"data": user})
}
