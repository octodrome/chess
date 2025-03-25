describe('Signup Test', () => {
    it('should sign up the user', () => {
        cy.visit('/')
        cy.wait(500) // maybe for the pinia store to be initialized?
        cy.get('[data-cy="app_header_open_left"]').click()
        cy.get('[data-cy="app_drawer_left_signup_button"]').click()
        cy.get('[data-cy="form_signup_email_field"]').type('test@test.com')
        cy.get('[data-cy="form_signup_password_field"]').type('12345678')
        cy.get('[data-cy="form_signup_confirm_button"]').click()
        cy.get('[data-cy="app_drawer_left_account_button"]').click()
        cy.get('[data-cy="form_account_email_field"]')
            .find('input')
            .should('have.value', 'test@test.com')
    })
})
