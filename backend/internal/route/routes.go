package route

import (
	"SCoPi-backend/internal/handler"
	"SCoPi-backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(
	r *gin.Engine,
	authHandler *handler.AuthHandler,
	userHandler *handler.UserHandler,
	contractRequestHandler *handler.ContractRequestHandler) {

	r.RemoveExtraSlash = true
	api := r.Group("/api")
	{
		registerAuthRoutes(api, authHandler)
		registerUserRoutes(api, userHandler)
		registerContractRequestHandler(api, contractRequestHandler)
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
		users.GET("/", userHandler.GetAllUsers)
		users.GET("/:id", userHandler.GetUserByID)
		users.POST("/", userHandler.CreateUser)
		users.PUT("/:id", userHandler.UpdateUser)
		users.DELETE("/:id", userHandler.DeleteUser)
	}
}

func registerContractRequestHandler(api *gin.RouterGroup, contractRequestHandler *handler.ContractRequestHandler) {
	conreq := api.Group("/contract_request")
	conreq.Use(middleware.RequireAuth)
	{
		conreq.GET("/", contractRequestHandler.GetAllContractRequests)
		conreq.GET("/self", contractRequestHandler.GetMyContractRequests)
		conreq.POST("/", contractRequestHandler.CreateContractRequest)
	}
}
