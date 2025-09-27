package handler

import (
	"SCoPi-backend/internal/model"
	"SCoPi-backend/internal/service"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type AuthHandler struct {
	AuthService *service.AuthService
}

func NewAuthHandler(db *gorm.DB) *AuthHandler {
	return &AuthHandler{
		AuthService: service.NewAuthService(db),
	}
}

func (ah AuthHandler) LoginUser(c *gin.Context) {
	var input model.LoginInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{
				"message": err.Error(),
				"data":    nil,
			})
		return
	}

	user, token, err := ah.AuthService.LoginUser(input)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Email atau password salah.",
			"data":    nil,
		})
		return
	}

	// c.SetSameSite(http.SameSiteLaxMode)
	fmt.Println(token)
	// c.SetCookie("Authorization", token, 3600, "/", "", false, true)
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", token, 3600*24, "", "", true, true)
	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"data":    user,
	})
}
