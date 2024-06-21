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
      cy.get('[data-test="items"').contains(item);
    });

    it('should put a new item in the "Unpacked Items" list', () => {
      cy.get('[data-test="items-unpacked"').contains(item);
    });

    it('should put a new item as the last item in the "Unpacked Items" list', () => {
      cy.get('[data-test="items-unpacked"] li').last().contains(item);
    });
  });

  describe('Filtering items', () => {
    const filterTerm = 'Tooth';

    beforeEach(() => {
      cy.get('[data-test="filter-items"]').type(filterTerm);
    });

    it('should show items that match whatever is in the filter field', () => {
      cy.get('[data-test="items"] li').each(($item) => {
        expect($item.text()).to.include(filterTerm);
      });
    });

    it('should hide items that do not match whatever is in the filter field', () => {
      cy.get('[data-test="items-unpacked"').contains('Hoodie').should('not.exist');
      cy.get('[data-test="items-packed"').contains('Deoderant').should('not.exist');
    });
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', () => {
        cy.get('[data-test="remove-all"]').click();
        cy.get('[data-test="items"] li').should('not.exist');
      });
    });

    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {
        cy.get('[data-test="items"] li').find('[data-test="remove"]');
      });

      it('should remove an item from the page', () => {
        // cy.get('[data-test="items"] li')
        //   .first()
        //   .within(() => cy.get('[data-test="remove"]').click())
        //   .should('not.exist');

        cy.get('[data-test="items"] li').each(($li) => {
          cy.wrap($li).find('[data-test="remove"]').click();
          cy.wrap($li).should('not.exist');
        });
      });
    });
  });

  describe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click();
      cy.get('[data-test="items-packed"] li').should('not.exist');
    });

    it('should empty have all of the items in the "Unpacked" list', () => {
      cy.get('[data-test="items"] li')
        .its('length')
        .then((count) => {
          cy.get('[data-test="mark-all-as-unpacked"]').click();
          cy.get('[data-test="items-unpacked"] li').its('length').should('eq', count);
        });
    });
  });

  describe('Mark individual item as packed', () => {
    it('should move an individual item from "Unpacked" to "Packed"', () => {
      cy.get('[data-test="items-unpacked"] li label')
        .first()
        .within(() => {
          cy.get('input[type="checkbox"]').click();
        })
        .then(($item) => {
          const text = $item.text();
          cy.get('[data-test="items-packed"] li label').first().should('have.text', text);
        });
    });
  });
});
