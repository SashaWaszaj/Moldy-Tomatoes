describe('home page', () => {
    beforeEach(() => {
      cy.visit('https://moldy-tomatoes.netlify.app/movie/993710')
    })
  
    it('allows users to review movies', () => {
      cy.get("h2", { timeout: 10000 }).should("contain", "Top Rated Movies")
    })
  })