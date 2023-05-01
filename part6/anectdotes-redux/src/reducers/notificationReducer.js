import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice ({
    name: "filter",
    initialState: "",
    reducers: {
        createNotification: {
            reducer: (state, action) => {
                return action.payload
            },
        },
        clearNotification: {
            reducer: (state, action) => {
                return null
            },
        }
    }
})
   
export const {createNotification, clearNotification} = notificationSlice.actions

export const setNotification = (message, seconds) => {
    return async (dispatch, getState) => {
        dispatch(createNotification(message))
        setTimeout(() => {
            dispatch(clearNotification());
          }, seconds*1000);
    }
}

export default notificationSlice.reducer