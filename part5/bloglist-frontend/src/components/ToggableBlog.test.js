import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ToggableBlog from "./ToggableBlog"
import Blog from "./Blog"

describe("<TogglableBlog />", () => {
    let container

    beforeEach(() => {
        const blog = {
            id: 1,
            title: "Title",
            author: "Author",
            url: "url",
            likes: 1,
            user: { name: "UserName" }

        }
        const handleLike = jest.fn()
        const handleDelete = jest.fn()

        container = render(
            <ToggableBlog key={blog.id} blogLabel={blog.title + " - " + blog.author}>
                <div className="testDiv" >
                    <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete}/>
                </div>
            </ToggableBlog>
        ).container
    })

    test("renders its children", async () => {
        await container.querySelector("#test-toggable-content")
    })

    test("at start the children are not displayed", () => {
        const div = container.querySelector("#test-toggable-content")
        expect(div).toHaveStyle("display: none")
    })

    test("after clicking the button, children are displayed", async () => {
        const user = userEvent.setup()
        const button = container.querySelector("#test-toggable-button")

        await user.click(button)

        const div = container.querySelector("#test-toggable-content")
        expect(div).not.toHaveStyle("display: none")
    })

})