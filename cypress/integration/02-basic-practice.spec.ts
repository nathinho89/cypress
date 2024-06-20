/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  describe('Adding a new item', () => {
    const item = 'New Item';

    beforeEach(() => {
      cy.get('[data-test="new-item-input"]').type(item);
      cy.get('[data-test="add-item"]').click();
    });

    it('should put a new item on the page after clicking on "Add Item"', () => {
      cy.get('#jetsetter-application').should('contain.text', item);
    });

    it('should put a new item in the "Unpacked Items" list', () => {
      cy.get('[data-test="items-unpacked"').should('contain.text', item);
    });

    it('should put a new item as the last item in the "Unpacked Items" list', () => {
      cy.get('[data-test="items-unpacked"').children().last().should('contain.text', item);
    });
  });

  describe('Filtering items', () => {
    const filterTerm = 'Tooth';

    beforeEach(() => {
      cy.get('[data-test="filter-items"]').type(filterTerm);
    });

    it('should show items that match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type(filterTerm);
    });

    it('should hide items that do not match whatever is in the filter field', () => {
      cy.get('[data-test="items-unpacked"').contains('Hoodie').should('not.exist');
      cy.get('[data-test="items-packed"').contains('Deoderant').should('not.exist');
    });
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', () => {});
    });

    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {});

      it('should remove an item from the page', () => {});
    });
  });

  describe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', () => {});

    it('should empty have all of the items in the "Unpacked" list', () => {});
  });

  describe('Mark individual item as packed', () => {
    it('should move an individual item from "Unpacked" to "Packed"', () => {});
  });
});
