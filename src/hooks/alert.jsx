import React, { useContext, useEffect, useReducer } from "react";

const ALERT_LIFETIME = 5 * 1000;

const AlertContext = React.createContext({
  alerts: [],
  showAlert: (title, message) => null,
  removeAlert: (id) => null,
});

function alertReducer(state, action) {
  switch (action.type) {
    // create new alert
    case "add":
      return [
        ...state,
        { id: state.length + 1, message: action.message, title: action.title },
      ];
    // remove existing alert
    case "remove":
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
}

const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, []);

  const showAlert = (title, message) => {
    dispatch({ type: "add", title, message });
  };

  const removeAlert = (id) => {
    dispatch({ type: "remove", id });
  };

  // automatically destroy alert each 3 seconds
  useEffect(() => {
    let timer;
    if (state.length) {
      timer = setTimeout(() => {
        removeAlert(state[0].id);
      }, ALERT_LIFETIME);
    }

    return () => {
      timer && clearTimeout(timer);
    };
  }, [state]);

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        showAlert,
        removeAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

const useAlert = () => useContext(AlertContext);

export { AlertProvider, useAlert };
