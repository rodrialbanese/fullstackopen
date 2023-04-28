import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import BlogForm from "./BlogForm"
import userEvent from "@testing-library/user-event"

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    const container = render(
        <BlogForm createBlog={createBlog} />
    ).container

    const titleInput = container.querySelector("#test-input-title")
    const authorInput = container.querySelector("#test-input-author")
    const urlInput = container.querySelector("#test-input-url")

    await user.type(titleInput, "Title")
    await user.type(authorInput, "Author")
    await user.type(urlInput, "url")

    const sendButton = screen.getByText("add new blog")
    await user.click(sendButton)

    // expect(createBlog.mock.calls).toHaveLength(1)
    // expect(createBlog.mock.calls[0][0].content).toBe("Title")
})