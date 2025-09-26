package main

import (
	"SCoPi-backend/internal/ai"
	"SCoPi-backend/internal/database"
	"SCoPi-backend/internal/handler"
	"SCoPi-backend/internal/route"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, assuming environment variables are set")
	}

	r := gin.Default()

	database.ConnectDB()
	ai.ConnectAI()

	authHandler := handler.NewAuthHandler(database.DB)
	userHandler := handler.NewUserHandler(database.DB)

	userHandler.UserService.CreateDefaultAdmin()
	route.RegisterRoutes(r, authHandler, userHandler)

	r.Run(":8080")
}
