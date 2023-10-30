/// <reference types="Cypress" />

describe('My First Test', () => {
  it('Opens the home page', () => {
    cy.visit('http://127.0.0.1:5173/')
    cy.contains('Welcome')
    cy.contains('Home').click()
    cy.url().should('include', '/')
  })
})