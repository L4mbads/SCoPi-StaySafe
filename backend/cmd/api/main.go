package main

import (
	"SCoPi-backend/internal/handler"
	"SCoPi-backend/internal/model"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// Load environment variables from .env file
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, assuming environment variables are set")
	}

	dbHost := os.Getenv("DB_HOST")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbPort := os.Getenv("DB_PORT")

	dsn := "host=" + dbHost + " user=" + dbUser + " password=" + dbPassword + " dbname=" + dbName + " port=" + dbPort + " sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Auto-migrate the User model
	db.AutoMigrate(&model.User{})
	log.Println("Database migration complete.")

	r := gin.Default()

	authHandler := handler.NewAuthHandler(db)

	api := r.Group("/api")
	{
		// Public routes
		api.POST("/register", authHandler.Register)
		api.POST("/login", authHandler.Login)

		// Admin routes (e.g., for managing users)
		admin := api.Group("/admin")
		// In a real app, you would add middleware here to check for 'AdminTeam' role
		{
			admin.GET("/users", authHandler.GetUsers)
			admin.DELETE("/users/:id", authHandler.DeleteUser)
			admin.PUT("/users/:id/role", authHandler.UpdateUserRole)
		}
	}

	r.Run(":8080")
}
