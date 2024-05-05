describe('Teacher Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/teacher'); // Visit the Teacher component
    });
  
    it('should navigate to Home on clicking the first menu item', () => {
      cy.get('.navbar-text').first().click();
  
      cy.location().should((loc) => {
        expect(loc.pathname).to.equal('/');
      });
    });
  
    it('should navigate to Equipments on clicking the fourth menu item', () => {
      cy.get('.navbar-text').eq(3).click();
  
      cy.location().should((loc) => {
        expect(loc.pathname).to.equal('http://localhost:5173/teacher/Equipments');
      });
    });
  
    it('should navigate to Login on clicking the Login button', () => {
      cy.get('#login-button').click();
  
      cy.location().should((loc) => {
        expect(loc.pathname).to.equal('http://localhost:5173/');
      });
    });
  
    it('should update the state value on typing in the ID Number input', () => {
      const expectedValue = 'test123';
  
      cy.get('.inside-box').type(expectedValue);
  
      cy.get('.inside-box').should('have.value', expectedValue);
    });
  
    it('should update the state value on typing in the Password input', () => {
      const expectedValue = 'password123';
  
      cy.get('.inside-password').type(expectedValue);
  
      // Password value is masked, verify indirectly
      cy.get('.inside-password').should('have.attr', 'value').and('not.be.empty');
    });
  
    it('should render both Login and Signup buttons', () => {
      cy.get('#login-button').should('be.visible');
      cy.get('#Signup-button').should('be.visible');
    });
  });
  