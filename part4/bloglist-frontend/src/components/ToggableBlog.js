import { useState, forwardRef, useImperativeHandle } from "react"

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const showWhenVisible = { display: visible ? "" : "none" }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle}>
            <div>
                {props.blogLabel} <button onClick={toggleVisibility}>{visible ? "Hide" : "Show" }</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
            </div>
        </div>
    )
})

Togglable.displayName = "TogglableBlog"

export default Togglable