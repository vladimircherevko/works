import React, { useContext } from "react";
import { AlertContext } from "../context/alert/alertContext";
import { CSSTransition } from "react-transition-group";

export const Alert = () => {
  const {
    alert: { type, text, shown },
    hideAlert
  } = useContext(AlertContext);

  return (
    <CSSTransition
      in={shown}
      classNames={"mess"}
      timeout={800}
      mountOnEnter
      unmountOnExit
    >
      <div className={`toast mess`}>
        <div className={`toast-header text-dark bg-${type}`}>
          <strong className="mr-auto">Внимание!</strong>
          <button
            type="button"
            className="ml-2 mb-1 close"
            data-dismiss="toast"
            onClick={hideAlert}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="toast-body">{text}</div>
      </div>
    </CSSTransition>
  );
};
