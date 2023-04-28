describe("Blog app", function() {
    beforeEach(function() {
        cy.request("POST", "http://localhost:3003/api/testing/reset")
        cy.createUser({
            "username": "root",
            "name": "root",
            "password": "password" })
        cy.visit("http://localhost:3000")
    })
    it("Login form is shown", function() {
        cy.get("#login-button")
    })
    describe("Log in", function () {
        it("succeeds with correct credentials", function() {
            cy.get("#username-login-input").type("root")
            cy.get("#password-login-input").type("password")
            cy.get("#login-button").click()
            cy.contains("root logged in")})

        it("fails with incorret credentials", function() {
            cy.get("#username-login-input").type("root")
            cy.get("#password-login-input").type("fail")
            cy.get("#login-button").click()
            cy.contains("invalid user or password")
        }
        )
    }
    )
    describe("When logged in", function () {
        beforeEach(function() {
            cy.login({
                "username": "root",
                "password": "password" })
            cy.visit("http://localhost:3000")
        })

        it("can create note", function() {
            cy.contains("Add Blog").click()
            cy.get("#test-input-title").type("Title")
            cy.get("#test-input-author").type("Author")
            cy.get("#test-input-url").type("url")
            cy.get("#test-button-new-blog-form").click()
            cy.contains("Title - Author")})

        it("can like a note", function() {
            cy.contains("Add Blog").click()
            cy.get("#test-input-title").type("Title")
            cy.get("#test-input-author").type("Author")
            cy.get("#test-input-url").type("url")
            cy.get("#test-button-new-blog-form").click()
            cy.contains("Show").click()
            cy.contains("like").click()
            cy.contains("likes 1")
        })

    }
    )
}
)
describe("Blog App / testing remove blog", function() {
    beforeEach(function() {
        cy.resetBd()
        // We create 2 users.
        // Then user1 will log in and create a blog.
        // After we test that:
        // if user 1 log in, it can remove the blog
        // if user2 log in, it can't remove the blog

        cy.createUser({
            "username": "user1",
            "name": "user1",
            "password": "password" })
        cy.createUser({
            "username": "user2",
            "name": "user2",
            "password": "password" })
        cy.login({ "username": "user1",
            "password": "password" })
        cy.createBlog(
            {
                "title": "Test Title",
                "author": "Test Author",
                "url": "www.google.com",
            }
        )
    })
    it("User that create a Blog can remove it", function ()  {
        cy.login({
            "username": "user1",
            "password": "password" }
        )
        cy.contains("Show").click()
        cy.contains("Remove")
    })
    it("User that doesn't create a blog cant delete", function ()  {
        cy.login({
            "username": "user2",
            "password": "password" }
        )
        cy.contains("Show").click()
        cy.contains("Remove").should("not.exist")

    })

})

describe("Blog App / testing likes function", function() {
    beforeEach(function() {
        cy.resetBd()
        // We create 1 users.
        // We create 5 blogs
        // Then we click like in some blogs

        cy.createUser({
            "username": "user1",
            "name": "user1",
            "password": "password" })
        cy.login({ "username": "user1",
            "password": "password" })
        cy.createBlog(
            {
                "title": "Blog 1",
                "author": "Test Author",
                "url": "www.google.com",
            }
        )
        cy.createBlog(
            {
                "title": "Blog 2",
                "author": "Test Author",
                "url": "www.google.com",
            }
        )
        cy.createBlog(
            {
                "title": "Blog 3",
                "author": "Test Author",
                "url": "www.google.com",
            }
        )
        cy.createBlog(
            {
                "title": "Blog 4",
                "author": "Test Author",
                "url": "www.google.com",
            }
        )
        cy.createBlog(
            {
                "title": "Blog 5",
                "author": "Test Author",
                "url": "www.google.com",
            }
        )
    })
    it.only("Blogs are ordered by most liked", function ()  {
        cy.login({
            "username": "user1",
            "password": "password" }
        )
        cy.contains("Blog 1").parent().contains("Show").click() //blog 1 will have 1 like
        cy.contains("Blog 1").parent().contains("like").click()
        cy.contains("Blog 1").parent().contains("likes 1")
        cy.contains("Blog 2").parent().contains("Show").click() //blog 2 will have 2 likes
        cy.contains("Blog 2").parent().contains("like").click()
        cy.contains("Blog 2").parent().contains("likes 1")
        cy.contains("Blog 2").parent().contains("like").click()
        cy.contains("Blog 2").parent().contains("likes 2")
        cy.contains("Blog 3").parent().contains("Show").click() //blog 2 will have 5 likes
        cy.contains("Blog 3").parent().contains("like").click()
        cy.contains("Blog 3").parent().contains("likes 1")
        cy.contains("Blog 3").parent().contains("like").click()
        cy.contains("Blog 3").parent().contains("likes 2")
        cy.contains("Blog 3").parent().contains("like").click()
        cy.contains("Blog 3").parent().contains("likes 3")
        cy.contains("Blog 3").parent().contains("like").click()
        cy.contains("Blog 3").parent().contains("likes 4")
        cy.contains("Blog 3").parent().contains("like").click()
        cy.contains("Blog 3").parent().contains("likes 5")

        cy.get(".test-toggable-blog-container").eq(1).should("contain", "Blog 2")
        cy.get(".test-toggable-blog-container").eq(1).should("contain", "Blog 2")
        cy.get(".test-toggable-blog-container").eq(4).should("contain", "Blog 5")

    })


})

