package main

import (
	"SCoPi-backend/internal/ai"
	"SCoPi-backend/internal/database"
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

	r.Run(":8080")
}
