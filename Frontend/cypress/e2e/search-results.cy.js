//TC-MT-103 Movie Search: Verify that the search functionality returns relevant results
describe('Search results', () => {
    beforeEach(() => {
      cy.visit('https://moldy-tomatoes.netlify.app/')
    })
  
      it('allows users to search movies by keywords', () => {
        cy.get('.search-input').type("dune")
        cy.get('.search-button').click()
        cy.get('h2').should("contain", `Search Results for "dune"`)
        cy.get(':nth-child(1) > :nth-child(2) > .movie-title').should("contain", "Dune")
        cy.get(':nth-child(2) > :nth-child(2) > .movie-title').should("contain", "Dune")
        cy.get(':nth-child(3) > :nth-child(2) > .movie-title').should("contain", "Dune")
        })  
})