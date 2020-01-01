import React, { useState, useEffect } from "react";
import { AlertContext } from "./alertContext";

export const AlertState = ({ children }) => {
  const [state, setState] = useState({
    shown: false,
    text: "",
    type: ""
  });

  useEffect(() => {
    if (state.shown) {
      let timer = setTimeout(setState, 5000, { ...state, shown: false });
      return () => clearTimeout(timer);
    }
  }, [state]);

  const showAlert = mes => setState({ ...mes, shown: true });
  const hideAlert = () => setState({ ...state, shown: false });

  return (
    <AlertContext.Provider value={{ alert: state, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
