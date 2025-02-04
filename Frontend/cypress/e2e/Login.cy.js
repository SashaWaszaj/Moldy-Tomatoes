describe('Login', () => {
    beforeEach(() => {
      cy.visit('https://moldy-tomatoes.netlify.app/')
    })
      it('allows users to review movies', () => {
        cy.get('.button-login').click()
        cy.location("pathname").should("equal", "/login")
        cy.get('#username').type("SashaWF")
        cy.get('#password').type("!8pcH4Mv4XK4hGt")
        cy.get('.login-button').click()
        })  
})