/// <reference types="cypress" />

describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
    cy.get('[data-test="filter-items"]').as('filterInput');
    cy.get('[data-test="items"]').as('allItems');
    cy.get('[data-test="items-packed"]').as('packedItems');
    cy.get('[data-test="items-unpacked"]').as('unpackedItems');
  });

  it('should filter items', () => {
    const filterTerm = 'Tooth';
    cy.get('@filterInput').type(filterTerm);

    cy.get('@allItems').each(($item) => {
      expect($item.text()).to.include(filterTerm);
    });

    cy.get('@allItems').should('not.contain.text', 'Hoodie');
  });

  it('should move items from unpacked to packed', () => {
    cy.get('@unpackedItems').find('label').first().as('itemLabel');
    cy.get('@itemLabel').invoke('text').as('itemName');

    cy.get('@itemLabel').click();

    cy.get('@itemName').then((text) => {
      cy.get('@packedItems').contains(text);
    });
  });
});
