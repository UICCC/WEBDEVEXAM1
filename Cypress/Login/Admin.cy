describe('Admin component', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/admin'); // Assuming your Admin component runs at this URL
  });

  describe('Menu Navigation', () => {
    const navbarTextSelector = '.navbartexts'; // Matches your JSX class

    it('should navigate to Home page on clicking Home button', () => {
      cy.get(navbarTextSelector).contains('Home').click();
      cy.url().should('include', '/');
    });

    it('should navigate to Reports page on clicking Reports button', () => {
      cy.get(navbarTextSelector).contains('Reports').click();
      cy.url().should('include', '/Reports');
    });

    it('should navigate to Equipments page on clicking Equipments button', () => {
      cy.get(navbarTextSelector).contains('Equipments').click();
      cy.url().should('include', '/Equipments');
    });

    it('should navigate to Pendings page on clicking Pendings button', () => {
      cy.get(navbarTextSelector).contains('Pendings').click();
      cy.url().should('include', '/Pendings');
    });
  });

  describe('Data Table', () => {
    const tableHeaderSelector = '.p-datatable thead th';
    const tableBodyRowSelector = '.p-datatable tbody tr';
    const tableDataFieldSelector = '.p-col-field';

    it('should display table header with expected columns', () => {
      cy.get(tableHeaderSelector).should('contain', 'Time');
      cy.get(tableHeaderSelector).should('contain', 'ID');
      cy.get(tableHeaderSelector).should('contain', 'Name');
      // ... verify all expected columns
    });

    it('should display initial equipment data', () => {
      cy.get(`${tableBodyRowSelector}:first ${tableDataFieldSelector}`)
        .contains('7:30 AM');
      cy.get(`${tableBodyRowSelector}:first ${tableDataFieldSelector}`)
        .contains('Drake Zee');
      // ... verify other initial data
    });
  });

  describe('Edit Functionality', () => {
    const editButtonSelector = '.detail-section button'; // Assuming a button with this text for edit

    it('should allow editing existing category data', () => {
      const initialTime = '7:30 AM';
      const updatedTime = '8:00 AM';

      cy.get(`${tableBodyRowSelector}:first ${tableDataFieldSelector}`)
        .contains(initialTime)
        .click();
      cy.get('.detail-section input[name="time"]').should('have.value', initialTime);
      cy.get('.detail-section input[name="time"]').clear().type(updatedTime);
      cy.get(editButtonSelector).contains('Save').click();
      cy.get(`${tableBodyRowSelector}:first ${tableDataFieldSelector}`)
        .contains(updatedTime);
    });
  });

  describe('Delete Functionality', () => {
    const deleteButtonSelector = '.detail-section button'; // Assuming a button with this text for delete
    const initialRowCount = 10; // Adjust based on your initial data

    it('should allow deleting a category', () => {
      cy.get(tableBodyRowSelector).should('have.length', initialRowCount);
      cy.get(`${tableBodyRowSelector}:first ${tableDataFieldSelector}`)
        .contains('Drake Zee')
        .click();
      cy.get(deleteButtonSelector).contains('Delete').click();
      cy.get(tableBodyRowSelector).should('have.length', initialRowCount - 1);
    });
  });

  describe('Add Functionality', () => {
    const addButtonSelector = '.holderName button'; // Assuming a button with this text for add
    const initialRowCount = 10; // Adjust based on your initial data
    const newCategoryData = {
      time: '9:15 AM',
      name: 'New User',
      equipment: 'Projector, Laptop',
      // ... other required fields
    };

    it('should allow adding a new category', () => {
      cy.get(tableBodyRowSelector).should('have.length', initialRowCount);

      // Fill form inputs
      cy.get('.holderName input[name="time"]').type(newCategoryData.time);
      cy.get('.holderName input[name="name"]').type(newCategoryData.name);
      cy.get('.holderName input[name="equipment"]').type(newCategoryData.equipment);
      // ... fill other required fields based on your JSX

      cy.get(addButtonSelector).contains('Add').click();

      // Verify new category is added
      cy.get(tableBodyRowSelector).should('have.length', initialRowCount + 1);
      cy.get(`${tableBodyRowSelector}:last ${tableDataFieldSelector}`)
        .contains(newCategoryData.time);
      cy.get(`${tableBodyRowSelector}:last ${tableDataFieldSelector}`)
        .contains(newCategoryData.name);
      cy.get(`${tableBodyRowSelector}:last ${tableDataFieldSelector}`)
        .contains(newCategoryData.equipment);
      // ... verify other data in the last row based on your initial data
    });
  });
});
