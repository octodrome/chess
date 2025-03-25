package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/octodrome/chess/go-rest-api-poc/helper"
)

func JWTAuthMiddleware() gin.HandlerFunc {
	return func(context *gin.Context) {
		err := helper.ValidateJWT(context)
		if err != nil {
			context.JSON(http.StatusUnauthorized, gin.H{"error": "Authentication required"})
			context.Abort()
			return
		}
		context.Next()
	}
}
