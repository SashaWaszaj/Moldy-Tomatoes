//TC-MT-101 New Review Form: Successful review creation with valid inputs
describe('Movie Form', () => {
    beforeEach(() => {
      cy.visit('https://moldy-tomatoes.netlify.app/')
    })
  
    context("reviews section and form", () => {
      it('allows users to review movies', () => {
        cy.get('[href="/movie/993710"] > .carousel-image').click()
        cy.location("pathname").should("equal", "/movie/993710")
        cy.get('.add-review-link').click()//1. Open the web application and navigate to <web_url>/review/form/:movie_id.
        cy.get('#author').type("Adam")//2. Locate the Name input field and enter a valid Name (e.g., Adam).
        cy.get('#content').type("Meh")// 3. Locate the Review input field and enter a valid review (e.g., Meh).
        cy.get('#rating').select("5")// 4. Locate the Rating input field and enter a valid rating number (e.g., 5).
        cy.get('.submit-review-button').click() //5. Click on the Submit Review button.
        cy.get(':nth-child(5) > :nth-child(1) > strong').should("contain", "Adam") // E.R Upon clicking the Add Product button, the application processes the request and redirects or displays the new review on its respective reviews list.
        cy.get(':nth-child(5) > :nth-child(2)').should("contain", "Loved it!")
        })  
    })
})