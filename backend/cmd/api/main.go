package main

import (
	"SCoPi-backend/internal/ai"
	"SCoPi-backend/internal/database"
	"SCoPi-backend/internal/handler"
	"SCoPi-backend/internal/route"
	"log"
	"time"

	"github.com/gin-contrib/cors"
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
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	route.RegisterRoutes(r, authHandler, userHandler)
	r.Run(":8080")
}
