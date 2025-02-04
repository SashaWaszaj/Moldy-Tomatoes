describe('Movie Form', () => {
    beforeEach(() => {
      cy.visit('https://moldy-tomatoes.netlify.app/')
    })
  
    context("reviews section and form", () => {
      it('allows users to review movies', () => {
        cy.get('[href="/movie/993710"] > .carousel-image').click()
        cy.location("pathname").should("equal", "/movie/993710")
        cy.get('.add-review-link').click()
        cy.get('#author').type("Adam")
        cy.get('#content').type("Loved it!")
        cy.get('#rating').select("10")
        cy.get('.submit-review-button').click()
        cy.get(':nth-child(5) > :nth-child(1) > strong').should("contain", "Adam")
        cy.get(':nth-child(5) > :nth-child(2)').should("contain", "Loved it!")
        })  
    })
})