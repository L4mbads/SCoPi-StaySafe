package handler

import (
	"SCoPi-backend/internal/model"
	"SCoPi-backend/internal/service"
	"net/http"
	"strconv"

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

func (h *UserHandler) GetUserByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid user ID",
			"data":    nil,
		})
		return
	}

	user, err := h.UserService.GetUserByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": err.Error(),
			"data":    nil,
		})
		return
	}

	c.JSON(http.StatusOK, user)
}

func (h *UserHandler) GetAllUsers(c *gin.Context) {
	users, err := h.UserService.GetAllUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to fetch users.",
			"data":    nil,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{"users": users})
}

func (h *UserHandler) UpdateUser(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid user ID",
			"data":    nil,
		})
		return
	}

	var input model.UpdateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
			"data":    nil,
		})
		return
	}

	if err := h.UserService.UpdateUser(uint(id), input.Name, input.Email, input.Role); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
			"data":    nil,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User updated successfully"})
}

// DeleteUser handles deleting a user.
func (h *UserHandler) DeleteUser(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid user ID",
			"data":    nil,
		})
		return
	}

	if err := h.UserService.DeleteUser(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to delete user",
			"data":    nil,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}
