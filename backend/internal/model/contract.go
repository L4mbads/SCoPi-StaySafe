package model

// Contract struct represents a contract in the database.
type Contract struct {
	ID       uint
	Title    string
	Status   string
	Filepath string
	UserID   uint
}
