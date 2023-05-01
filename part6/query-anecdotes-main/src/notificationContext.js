import { createContext, useReducer, useContext} from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
      case "SET":
          return action.payload
      case "CLEAR":
          return null
      default:
          return state
    }
  }

  const NotificationContext = createContext()
  


  export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)
    
    const customDispatch = (action) => {
      if (typeof action === 'function') {
        action(notificationDispatch);
      } else {
        notificationDispatch(action);
      }
    };

    return (
        <NotificationContext.Provider value={[notification, customDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
  }

  export const useNotificationValue = () => {
    const counterAndDispatch = useContext(NotificationContext)
    return counterAndDispatch[0]
  }
  
  export const useNotificationDispatch = () => {
    const counterAndDispatch = useContext(NotificationContext)
    return counterAndDispatch[1]
  }

  export const addNotification = (notification) => {
    return (dispatch) => {
      dispatch({type: "SET", payload: notification});
      setTimeout(() => {
        dispatch({type: "CLEAR"});
      }, 5000); // delay action2 by 1 second (1000ms)
    };
  };

  export default NotificationContext