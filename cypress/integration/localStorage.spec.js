/// <reference types="cypress" />

// localStorage.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('example to-do app', () => {
  it('displays two todo items by default', () => {
    chrome.storage.local.get(undefined).then(value => value.to.be.null)
  })
})
