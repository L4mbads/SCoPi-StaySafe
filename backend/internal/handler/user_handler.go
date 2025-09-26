package handler

import (
	"SCoPi-backend/internal/model"
	"SCoPi-backend/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type UserHandler struct {
	UserService *service.UserService
}

func NewUserHandler(db *gorm.DB) *UserHandler {
	return &UserHandler{
		UserService: service.NewUserService(db),
	}
}

func (uh *UserHandler) CreateUser(c *gin.Context) {
	var body model.RegisterInput
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
			"data":    nil,
		})
		return
	}

	result, err := uh.UserService.CreateUser(body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
			"data":    nil,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": gin.H{
			"id":    result.ID,
			"name":  result.Name,
			"email": result.Email,
			"role":  result.Role,
		},
		"message": "Successfully created User",
		"status":  "success",
	})
}
