describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login");
    // cy.contains("Login").click();

    // cy.url().should("include", "/login");

    cy.get("#username").type("hello").should("have.value", "hello");
    cy.get("#password")
      .type("hello")
      .should("have.value", "hello")
      .should("have.attr", "type", "password");
  });

  it("login in with correct credentials", () => {
    cy.intercept("POST", "/login", {
      statusCode: 200,
      body: {
        username: "hello",
        email: "test@user.com",
        token: "1",
      },
    });

    cy.intercept("GET", "/trips", {
      statusCode: 200,
      body: [
        { id: 1, name: "Test Trip", country: "Test Country", length: 1 },
        { id: 2, name: "Test Trip 2", country: "Test Country", length: 1 },
        { id: 3, name: "Test Trip 3", country: "Test Country", length: 1 },
      ],
    });
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/dashboard");
    cy.get("h1").should("contain", "Dashboard");
    cy.get("h6").should("contain", "hello");
  });

  it("should show an error when logged in with wrong credentials", () => {
    cy.intercept("POST", "/login", {
      statusCode: 400,
      body: {
        error: "Invalid username or password",
      },
    });
    cy.get("button").contains("Login").click();
    cy.get("h1").should("contain", "Invalid username or password");
  });
});
