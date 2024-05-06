describe('Ticket component', () => {
  beforeEach(() => {
    // Assuming the Ticket component is accessible at http://localhost:5173/Ticket
    cy.visit('http://localhost:5173/Ticket');
  });

  it('should display Thank You message', () => {
    cy.get('.thanks h1').should('contain.text', 'Thank you');
  });

  it('should display borrower name from query params', () => {
    const borrowerName = 'John Doe';
    cy.visit('http://localhost:5173/Ticket?borrowerName=' + borrowerName);
    cy.get('.borrowernamebox input').should('have.value', borrowerName);
  });

  it('should display equipment and room information from query params', () => {
    const equipment = 'Projector';
    const room = 'Room 101';
    cy.visit('http://localhost:5173/Ticket?selectedEquipment=' + equipment + '&selectedRoom=' + room);
    cy.get('.equipmentticketbox input').should('have.value', equipment);
    cy.get('.borrowercoursebox input').should('have.value', room);
  });

  it('should display purpose from query params', () => {
    const purpose = 'Presentation for new students';
    cy.visit('http://localhost:5173/Ticket?purpose=' + purpose);
    cy.get('.purposeticketbox input').should('have.value', purpose);
  });

  // Not recommended to directly modify formatted dates in tests
  // Focus on testing how they are displayed based on query params

  it('should ensure button click navigates to Equipments page (if applicable)', () => {
    // Check if 'sendusfeedback' button exists (might not be present in all scenarios)
    cy.get('.sendusfeedback').then($element => {
      if ($element.length > 0) {
        cy.get('.sendusfeedback').click();
        cy.url().should('include', 'http://localhost:5173/Equipments'); // Assuming it redirects to Equipments page
      }
  
  });
});
});
