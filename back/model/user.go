package model

import (
	"html"
	"strings"

	"github.com/octodrome/chess/go-rest-api-poc/database"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email          string `gorm:"size:255;not null;unique" json:"email"`
	Password       string `gorm:"size:255;not null;" json:"-"`
	GamesAsCreator []Game `gorm:"foreignKey:CreatorID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"games_as_creator"`
	GamesAsGuest   []Game `gorm:"foreignKey:GuestID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL" json:"games_as_guest"`
	Pseudo         string `gorm:"size:255" json:"pseudo"`
	About          string `gorm:"size:255" json:"about"`
}

type UserRepository interface {
	FindUserById(id string) (User, error)
	FindAllUsers() ([]User, error)
	FindUsersExcept(query uint) ([]User, error)
}

type userRepoImpl struct{}

func NewUserRepository() UserRepository {
	return &userRepoImpl{}
}

func (user *User) Save() (*User, error) {
	err := database.Database.Create(&user).Error
	if err != nil {
		return &User{}, err
	}
	return user, nil
}

func (user *User) BeforeSave(*gorm.DB) error {
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(passwordHash)
	user.Email = html.EscapeString(strings.TrimSpace(user.Email))
	return nil
}

func (user *User) ValidatePassword(password string) error {
	return bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
}

func FindUserByEmail(email string) (User, error) {
	var user User
	err := database.Database.Where("email=?", email).Find(&user).Error
	if err != nil {
		return User{}, err
	}
	return user, nil
}

func (r *userRepoImpl) FindUserById(id string) (User, error) {
	var user User
	err := database.Database.Preload("GamesAsCreator").Where("ID=?", id).Find(&user).Error
	if err != nil {
		return User{}, err
	}
	return user, nil
}

func (r *userRepoImpl) FindAllUsers() ([]User, error) {
	var userList []User
	err := database.Database.Find(&userList).Error
	if err != nil {
		return []User{}, err
	}
	return userList, nil
}

func (r *userRepoImpl) FindUsersExcept(query uint) ([]User, error) {
	var userList []User
	err := database.Database.Where("id <> ?", query).Find(&userList).Error
	if err != nil {
		return []User{}, err
	}
	return userList, nil
}

type UpdateUserInput struct {
	Pseudo string `json:"pseudo"`
	About  string `json:"about"`
}

func UpdateUser(id string, input UpdateUserInput) (User, error) {
	var updatedUser User
	err := database.Database.Where("ID=?", id).First(&updatedUser).Error
	if err != nil {
		return User{}, err
	}
	database.Database.Model(&updatedUser).Updates(input)
	return updatedUser, nil
}
