/// <reference types="Cypress" />

describe('My First Test', () => {
  it('OPens the home page', () => {
    cy.visit('http://127.0.0.1:3000/')
    cy.contains('Welcome')
    cy.contains('Home').click()
    cy.url().should('include', '/')
  })
})