/// <reference types="cypress" />

describe('Create a New Item', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  it('should have a form and contain add items', () => {
    cy.get('form').should('contain.text', 'Add Item');
  });

  it('should put stuff in an input field', () => {
    cy.get('[data-test="new-item-input"]').type('New Item');
  });
});
