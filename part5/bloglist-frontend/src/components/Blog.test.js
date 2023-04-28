import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("<Blog />", () => {
    let container
    const handleLike = jest.fn()
    const handleDelete = jest.fn()

    beforeEach(() => {
        const blog = {
            id: 1,
            title: "Title",
            author: "Author",
            url: "url",
            likes: 1,
            user: { name: "UserName" }

        }
        container = render(
            <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete}/>
        ).container
    })

    test("renders its children", async () => {
        const user = userEvent.setup()
        const button = container.querySelector("#test-like-button")
        await user.click(button)
        await user.click(button)
        expect(handleLike.mock.calls).toHaveLength(2)

    })

})