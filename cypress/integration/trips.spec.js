describe("Trips", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/login");
    cy.get("#username").type("ask");
    cy.get("#password").type("qwerty");
    cy.get("button").contains("Login").click();
  });
  it("should have a trip", () => {
    cy.get("a").should("contain", "Trip 0");
  });

	it('should display trip after being added', () => {
		cy.get('#name').type('cypress test trip').should('have.value', 'cypress test trip')
		cy.get('#country').type('cypress test country').should('have.value', 'cypress test country')
		cy.get('#length').should('have.value', 1)

		cy.get('input[type="submit"]').click()

		cy.get('a').should('contain', 'cypress test trip')
	})
});
