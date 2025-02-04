import '../support/commands';

describe('home page', () => {
  beforeEach(() => {
    cy.visit('https://moldy-tomatoes.netlify.app/')
  })

  it('the h2 contains the correct text', () => {
    cy.get("h2", { timeout: 10000 }).should("contain", "Top Rated Movies")
  })
})
