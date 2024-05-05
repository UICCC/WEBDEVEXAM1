// login.cy.js

describe('Login component', () => {
    // Test 1: Verify Login Button Click Navigation
    it('should navigate to "/" on Login button click', () => {
      cy.visit('http://localhost:5173/login'); // Assuming Login component is at /login route
  
      cy.get('#login-button').click();
  
      cy.url().should('eq', 'http://localhost:5173/'); // Verify URL after click
    });
  
    // Test 2: Verify Signup Button Click Navigation
    it('should navigate to "/" on Signup button click', () => {
      cy.visit('http://localhost:5173/login'); // Assuming Login component is at /login route
  
      cy.get('#Signup-button').click();
  
      cy.url().should('eq', 'http://localhost:5173/'); // Verify URL after click
    });
  
    // Test 3: Verify ID Input Value Update
    it('should update ID input value on typing', () => {
      cy.visit('http://localhost:5173/login'); // Assuming Login component is at /login route
  
      const testID = '123456';
  
      cy.get('.inside-box').type(testID);
  
      cy.get('.inside-box').should('have.value', testID); // Verify input value
    });
  
    // Test 4: Verify Password Input Value Update (value not shown)
    it('should update password input value on typing (value not shown)', () => {
      cy.visit('http://localhost:5173/login'); // Assuming Login component is at /login route
  
      const testPassword = 'mysecretpassword';
  
      cy.get('.inside-password').type(testPassword);
  
      // Password value won't be directly visible due to security reasons
      cy.get('.inside-password').should('have.attr', 'value').should('not.be.empty'); // Verify input has a value
    });
  
    // Test 5: Verify Signup API Call with Mock
    it('should call signup API with user data on Signup button click (mocked)', () => {
      const mockData = {
        borrowerID: '123456',
        borrowerName: 'John Doe',
        borrowerEmail: 'john.doe@example.com',
        // ... other data
      };
  
      cy.route('POST', 'http://localhost:8000/api/borrowers/', mockData).as('signupApi');
  
      cy.visit('http://localhost:5173/login'); // Assuming Login component is at /login route
  
      cy.get('#Signup-button').click();
  
      cy.wait('@signupApi').then((xhr) => {
        expect(xhr.requestBody).to.deep.equal(mockData); // Verify request body matches mock data
      });
    });
  });
  