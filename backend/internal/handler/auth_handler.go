package handler

// import (
// 	"SCoPi-backend/internal/service"
// 	"net/http"
// 	"strconv"

// 	"github.com/gin-gonic/gin"
// 	"gorm.io/gorm"
// )

// // AuthHandler handles HTTP requests related to authentication and user management.
// type AuthHandler struct {
// 	AuthService *service.AuthService
// }

// // NewAuthHandler creates a new handler with the given service.
// func NewAuthHandler(db *gorm.DB) *AuthHandler {
// 	return &AuthHandler{
// 		AuthService: service.NewAuthService(db),
// 	}
// }

// // RegisterInput struct for user registration.
// type RegisterInput struct {
// 	Email    string `json:"email" binding:"required"`
// 	Password string `json:"password" binding:"required"`
// 	Role     string `json:"role" binding:"required,oneof=AdminTeam InternalTeam LegalTeam ExecutiveTeam"`
// }

// // Register handles the user registration request.
// func (h *AuthHandler) Register(c *gin.Context) {
// 	var input RegisterInput
// 	if err := c.ShouldBindJSON(&input); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if err := h.AuthService.RegisterUser(input.Email, input.Password, input.Role); err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register user"})
// 		return
// 	}

// 	c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
// }

// // LoginInput struct for user login.
// type LoginInput struct {
// 	Email    string `json:"email" binding:"required"`
// 	Password string `json:"password" binding:"required"`
// }

// // Login handles the user login request.
// func (h *AuthHandler) Login(c *gin.Context) {
// 	var input LoginInput
// 	if err := c.ShouldBindJSON(&input); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	token, err := h.AuthService.LoginUser(input.Email, input.Password)
// 	if err != nil {
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.SetCookie("token", token, 3600*24, "/", "localhost", false, true) // httpOnly cookie
// 	c.JSON(http.StatusOK, gin.H{"message": "Logged in successfully"})
// }

// // GetUsers fetches all users.
// func (h *AuthHandler) GetUsers(c *gin.Context) {
// 	users, err := h.AuthService.GetAllUsers()
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users"})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"users": users})
// }

// // DeleteUser deletes a user by ID.
// func (h *AuthHandler) DeleteUser(c *gin.Context) {
// 	idStr := c.Param("id")
// 	id, err := strconv.ParseUint(idStr, 10, 64)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
// 		return
// 	}
// 	if err := h.AuthService.DeleteUser(uint(id)); err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
// }

// // UpdateUserRoleInput struct for updating user role.
// type UpdateUserRoleInput struct {
// 	Role string `json:"role" binding:"required,oneof=AdminTeam InternalTeam LegalTeam ExecutiveTeam"`
// }

// // UpdateUserRole updates a user's role.
// func (h *AuthHandler) UpdateUserRole(c *gin.Context) {
// 	idStr := c.Param("id")
// 	id, err := strconv.ParseUint(idStr, 10, 64)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
// 		return
// 	}

// 	var input UpdateUserRoleInput
// 	if err := c.ShouldBindJSON(&input); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if err := h.AuthService.UpdateUserRole(uint(id), input.Role); err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user role"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "User role updated successfully"})
// }
