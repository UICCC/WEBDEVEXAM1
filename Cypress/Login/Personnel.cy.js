describe('Personnel component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/Personnel'); // Assuming Personnel component is accessible at this route
    });
  
    it('should display the title "PERSONNEL"', () => {
      cy.get('h1').should('contain.text', 'PERSONNEL');
    });
  
    it('should have table headers "Personnel ID" and "Column 2"', () => {
      cy.get('table thead tr th').should('have.length', 2); // Check for two headers
      cy.get('table thead tr:nth-child(1) th:nth-child(1)').should('contain.text', 'Personnel ID');
      cy.get('table thead tr:nth-child(1) th:nth-child(2)').should('contain.text', 'Column 2');
    });
  
    it('should display "Row 3, Cell 1" in the third row, first cell', () => {
      cy.get('table tbody tr:nth-child(3) td:nth-child(1)').should('contain.text', 'Row 3, Cell 1');
    });
  
    it('should display 10 rows in the table', () => {
      cy.get('table tbody tr').should('have.length', 10);
    });


    
   
  });
  