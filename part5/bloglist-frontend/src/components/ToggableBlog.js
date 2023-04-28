import { useState, forwardRef, useImperativeHandle } from "react"

const TogglableBlog = forwardRef((props, ref) => {
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
        <div className="test-toggable-blog-container" style={blogStyle}>
            <div>
                {props.blogLabel} <button id="test-toggable-button" onClick={toggleVisibility}>{visible ? "Hide" : "Show" }</button>
            </div>
            <div id="test-toggable-content" style={showWhenVisible}>
                {props.children}
            </div>
        </div>
    )
})

TogglableBlog.displayName = "TogglableBlog"

export default TogglableBlog