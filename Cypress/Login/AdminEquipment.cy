describe('Equipments component', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5173/Request'); // Assuming Equipments is the path for this component
    });
  
    describe('Navigation Links', () => {
      it('should navigate to Home page on clicking Home link', () => {
        cy.get('.ticket-navbar').contains('Home').click();
        cy.url().should('include', '/'); // Assuming the home page URL ends with '/'
      });
  
      it('should navigate to Overview page on clicking Overview link', () => {
        cy.get('.ticket-navbar').contains('Overview').click();
        cy.url().should('include', 'http://127.0.0.1:5173/Admin'); // Assuming Overview redirects to Admin page
      });
  
      // Add similar tests for remaining navigation links (Contact etc.)
    });
  
    describe('MultiSelect', () => {
      it('should allow selecting an equipment', () => {
        cy.get('.multiselect-custom').select('Audio Cord');
        cy.get('.multiselect-custom').should('contain', 'Audio Cord');
      });
  
      it('should allow deselecting an equipment', () => {
        cy.get('.multiselect-custom').select('Audio Cord');
        cy.get('.multiselect-custom').select('Audio Cord'); // Deselect by re-selecting
        cy.get('.multiselect-custom').should('not.contain', 'Audio Cord');
      });
    });
  
    describe('Feedback Input', () => {
      it('should allow entering feedback text', () => {
        cy.get('.feedback-purpose-box textarea').type('This is a sample feedback');
        cy.get('.feedback-purpose-box textarea').should('have.value', 'This is a sample feedback');
      });
    });
  
    describe('Submit Button', () => {
      it('should trigger a submit action on clicking', () => {
        // Ideally, select an equipment and enter feedback (from previous test cases)
        cy.get('.feedback-submit-button button').click();
        // Assert on some UI element that appears after submit (success message etc.)
        // For example: cy.get('.success-message').should('be.visible');
      });
    });
  
    describe('Initial State', () => {
      it('should have no equipment selected initially', () => {
        cy.get('.multiselect-custom').should('have.value', null);
      });
  
      it('should have an empty feedback text area initially', () => {
        cy.get('.feedback-purpose-box textarea').should('have.value', '');
      });
    });
  });
  
