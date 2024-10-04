package controller_test

import (
	"errors"
	"net/http"
	"net/http/httptest"

	"github.com/gin-gonic/gin"
	"github.com/octodrome/chess/go-rest-api-poc/controller"
	"github.com/octodrome/chess/go-rest-api-poc/model"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

func GetTestGinContext() (*gin.Context, *httptest.ResponseRecorder) {
	gin.SetMode(gin.TestMode)

	w := httptest.NewRecorder()
	ctx, _ := gin.CreateTestContext(w)
	ctx.Request = &http.Request{Header: make(http.Header)}

	return ctx, w
}

type mockUserRepo struct{}

func (m *mockUserRepo) FindAllUsers() ([]model.User, error) {
	return []model.User{
		{
			Email:    "test.user@gmail.com",
			Password: "b4idkGfI8",
		},
	}, nil
}

func (m *mockUserRepo) FindUserById(id string) (model.User, error) {
	return model.User{
		Email:    "test.user@gmail.com",
		Password: "b4idkGfI8",
	}, nil
}

type mockErrorUserRepo struct{}

func (m *mockErrorUserRepo) FindAllUsers() ([]model.User, error) {
	return nil, errors.New("error fetching users")
}

func (m *mockErrorUserRepo) FindUserById(id string) (model.User, error) {
	return model.User{}, errors.New("user not found")
}

var _ = Describe("user", func() {
	Describe("GetAllUsers()", func() {
		var (
			ctx *gin.Context
			w   *httptest.ResponseRecorder
		)

		BeforeEach(func() {
			ctx, w = GetTestGinContext()
		})

		Context("FindAllUsers() returns an error", func() {
			It("should return a 400 bad request and an error", func() {
				mockRepo := &mockErrorUserRepo{}
				controller.GetAllUsers(ctx, mockRepo)

				Expect(w.Code).To(Equal(http.StatusBadRequest))
				Expect(w.Body.String()).To(ContainSubstring("error fetching users"))
			})
		})

		Context("FindAllUsers() returns a list of users", func() {
			It("should return a 200 and a list of users", func() {
				mockRepo := &mockUserRepo{}
				controller.GetAllUsers(ctx, mockRepo)

				Expect(w.Code).To(Equal(http.StatusOK))
				Expect(w.Body.String()).To(ContainSubstring("test.user@gmail.com"))
			})
		})
	})

	Describe("GetUserById()", func() {
		var (
			ctx *gin.Context
			w   *httptest.ResponseRecorder
		)

		BeforeEach(func() {
			ctx, w = GetTestGinContext()
		})

		Context("When user exists", func() {
			BeforeEach(func() {
				repo := &mockUserRepo{}
				ctx.Params = gin.Params{gin.Param{Key: "id", Value: "1"}}
				controller.GetUserById(ctx, repo)
			})

			It("should return status 200 OK and the user data", func() {
				Expect(w.Code).To(Equal(http.StatusOK))
				Expect(w.Body.String()).To(ContainSubstring("test.user@gmail.com"))
			})
		})

		Context("When user is not found", func() {
			BeforeEach(func() {
				repo := &mockErrorUserRepo{}
				ctx.Params = gin.Params{gin.Param{Key: "id", Value: "1"}}
				controller.GetUserById(ctx, repo)
			})

			It("should return status 400 Bad Request with an error message", func() {
				Expect(w.Code).To(Equal(http.StatusBadRequest))
				Expect(w.Body.String()).To(ContainSubstring("user not found"))
			})
		})
	})
})
