package service

// import (
// 	"SCoPi-backend/internal/model"
// 	"SCoPi-backend/internal/repository"
// 	"errors"
// 	"time"

// 	"github.com/golang-jwt/jwt/v5"
// 	"golang.org/x/crypto/bcrypt"
// 	"gorm.io/gorm"
// )

// var jwtKey = []byte("your_secret_key_that_is_at_least_32_chars")

// type Claims struct {
// 	UserID uint   `json:"user_id"`
// 	Role   string `json:"role"`
// 	jwt.RegisteredClaims
// }

// // AuthService handles all business logic for authentication.
// type AuthService struct {
// 	DB *gorm.DB
// }

// // NewAuthService creates a new service with the given database connection.
// func NewAuthService(db *gorm.DB) *AuthService {
// 	return &AuthService{DB: db}
// }

// // HashPassword hashes a user's password using bcrypt.
// func HashPassword(password string) (string, error) {
// 	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
// 	return string(bytes), err
// }

// // CheckPasswordHash compares a hashed password with a plaintext password.
// func CheckPasswordHash(password, hash string) bool {
// 	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
// 	return err == nil
// }

// // GenerateJWT generates a JWT token for a user.
// func GenerateJWT(user *model.User) (string, error) {
// 	expirationTime := time.Now().Add(24 * time.Hour)
// 	claims := &Claims{
// 		UserID: user.ID,
// 		Role:   user.Role,
// 		RegisteredClaims: jwt.RegisteredClaims{
// 			ExpiresAt: jwt.NewNumericDate(expirationTime),
// 		},
// 	}
// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
// 	tokenString, err := token.SignedString(jwtKey)
// 	if err != nil {
// 		return "", err
// 	}
// 	return tokenString, nil
// }

// // RegisterUser handles the registration of a new user.
// func (s *AuthService) RegisterUser(email, password, role string) error {
// 	hashedPassword, err := HashPassword(password)
// 	if err != nil {
// 		return err
// 	}

// 	user := &model.User{
// 		Email:    email,
// 		Password: hashedPassword,
// 		Role:     role,
// 	}

// 	return repository.CreateUser(s.DB, user)
// }

// // LoginUser handles the login of a user.
// func (s *AuthService) LoginUser(email, password string) (string, error) {
// 	user, err := repository.FindUserByEmail(s.DB, email)
// 	if err != nil {
// 		if errors.Is(err, gorm.ErrRecordNotFound) {
// 			return "", errors.New("user not found")
// 		}
// 		return "", err
// 	}

// 	if !CheckPasswordHash(password, user.Password) {
// 		return "", errors.New("invalid password")
// 	}

// 	token, err := GenerateJWT(user)
// 	if err != nil {
// 		return "", err
// 	}

// 	return token, nil
// }

// // GetAllUsers fetches all users.
// func (s *AuthService) GetAllUsers() ([]*model.User, error) {
// 	return repository.GetAllUsers(s.DB)
// }

// // DeleteUser deletes a user.
// func (s *AuthService) DeleteUser(id uint) error {
// 	return repository.DeleteUser(s.DB, id)
// }

// // UpdateUserRole updates a user's role.
// func (s *AuthService) UpdateUserRole(id uint, role string) error {
// 	return repository.UpdateUserRole(s.DB, id, role)
// }
