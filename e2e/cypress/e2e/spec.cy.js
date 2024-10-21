describe('Homepage Test', () => {
    it('should load the homepage', () => {
        cy.visit('/')
        cy.contains('Made with')
    })
})
