describe('Login Functionality', () => {
  it('should login with valid credentials', () => {
    cy.visit('http://localhost:5173/'); // Assuming your app runs on this port
  
    // Enter valid ID and password (target input field directly)
    cy.get('.inside-box').type('valid_id');
    cy.get('.inside-password').type('valid_password');
  
    // Click login button
    cy.get('#login-button').click();
  
    // Verify successful login message
    cy.get('.error-message').should('not.exist'); // Expect no error message on success
    // You can add an assertion for a separate success message element here (optional)
  
    // Additional assertion - Check URL after successful login (optional)
    // cy.url().should('include', '/'); // Assuming successful login redirects to home page
  });

  it('should show error message for empty fields', () => {
    cy.visit('http://localhost:5173/');

    // Click login button without entering anything
    cy.get('#login-button').click();

    // Verify error message for empty fields
    cy.get('.error-message').should('contain', 'Please fill in both ID Number and Password fields.');
  });

  it('should show error message for invalid credentials', () => {
    cy.visit('http://localhost:5173/');

    // Enter invalid ID and password
    cy.get('.inside-box').type('invalid_id');
    cy.get('.inside-password').type('wrong_password');

    // Click login button
    cy.get('#login-button').click();

    // Verify error message for invalid credentials
    cy.get('.error-message').should('contain', 'Invalid ID Number or Password.');
  });
});


describe('Navigation Bar', () => {
  it('should navigate to different sections on click', () => {
    cy.visit('http://localhost:5173/');

    // Click on "Overview" menu item
    cy.get('.navbar-text').contains('Overview').click();

    // Verify URL after clicking Overview (optional)
    // cy.url().should('include', '/Admin'); // Assuming Overview redirects to Admin page

    // Click on "Feedback" menu item
    cy.get('.navbar-text').contains('Feedback').click();

    // Verify URL after clicking Feedback (optional)
    // cy.url().should('include', '/Equipments'); // Assuming Feedback redirects to Equipments page

    // You can repeat this for other menu items
  });
});


describe('Signup Button', () => {
  it('should navigate to Signup page on click', () => {
    cy.visit('http://localhost:5173/');

    // Click on Signup button
    cy.get('#Signup-button').click();

    // Verify URL after clicking Signup (optional)
    cy.url().should('include', '/Login'); // Assuming Signup redirects to Login page
  });
});
