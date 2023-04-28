// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", ({ username, password }) => {
    cy.request({
        url:"http://localhost:3003/api/login",
        method: "POST",
        body: { username, password },
    }).then((response) => {
        window.localStorage.setItem(
            "loggedBlogappUser", JSON.stringify(response.body)
        ) })
    cy.visit("http://localhost:3000")
})

Cypress.Commands.add("createUser", ({ username, name , password }) => {
    cy.request({
        url:"http://localhost:3003/api/users",
        method: "POST",
        body: { username, name,  password },
    })
})

Cypress.Commands.add("createBlog", ({ title , author, url }) => {
    cy.request({
        url:"http://localhost:3003/api/blogs",
        method: "POST",
        body: { title , author, url },
        headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("loggedBlogappUser")).token}`
        }
    }
    )
})

Cypress.Commands.add("resetBd", () => {
    cy.request({
        url:"http://localhost:3003/api/testing/reset",
        method: "POST",
    })
})