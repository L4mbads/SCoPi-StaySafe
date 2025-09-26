package service

import (
	"SCoPi-backend/internal/model"
	"SCoPi-backend/internal/repository"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthService struct {
	UserRepository *repository.UserRepository
}

func NewAuthService(db *gorm.DB) *AuthService {
	return &AuthService{
		UserRepository: repository.NewUserRepository(db),
	}
}

func (as *AuthService) LoginUser(input model.LoginInput) (string, error) {
	user, err := as.UserRepository.FindByEmail(input.Email)
	if err != nil {
		return "", err
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password))
	if err != nil {
		return "", err
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":  user.ID,
		"role": user.Role,
		"exp":  time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("TOKEN_SECRET")))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
