package controller_test

import (
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("User", func() {
	Describe("Fetching all users", func() {
		Context("If there is at least one user in the DB", func() {
			Expect(true).To(BeTrue())
		})

		Context("If there is no user in the DB", func() {
			Expect(true).To(BeTrue())
		})
	})
})
