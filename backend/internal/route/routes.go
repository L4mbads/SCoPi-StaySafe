package route

import (
	"SCoPi-backend/internal/handler"
	"SCoPi-backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(
	r *gin.Engine,
	authHandler *handler.AuthHandler,
	userHandler *handler.UserHandler) {
	api := r.Group("/api")
	{
		registerAuthRoutes(api, authHandler)
		registerUserRoutes(api, userHandler)
	}
}

func registerAuthRoutes(api *gin.RouterGroup, authHandler *handler.AuthHandler) {
	auth := api.Group("/auth")
	{
		auth.POST("/login", authHandler.LoginUser)
	}
}

func registerUserRoutes(api *gin.RouterGroup, userHandler *handler.UserHandler) {
	users := api.Group("/users")
	users.Use(middleware.RequireAuth)
	{
		users.POST("/", userHandler.CreateUser)
	}
}
