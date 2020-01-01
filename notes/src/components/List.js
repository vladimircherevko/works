import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export const List = ({ pageName, searchItems, text, remove }) => {
  const { courier, listDynamicPages } = useContext(FirebaseContext);

  return (
    <TransitionGroup component="ul" className="list-group">
      {searchItems(listDynamicPages, pageName).map(
        ({ title, data, id, completed }, i) => (
          <CSSTransition key={id} classNames={"note"} timeout={800}>
            <li className="list-group=item shadow border border-info py-1 my-2 rounded">
              <div className="custom-control custom-checkbox d-flex justify-content-between mx-2">
                {pageName !== "Главная" ? (
                  <>
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id={`i${id}`}
                      checked={completed}
                      onChange={() =>
                        courier("toggleStateNote", id, pageName, !completed)
                      }
                    />
                    <label
                      className="custom-control-label d-flex justify-content-between notelabel"
                      htmlFor={`i${id}`}
                      title={text.label}
                    >
                      <span className="w-75 mx-2">{title}</span>
                      <span className="mx-2">{data}</span>
                    </label>
                  </>
                ) : (
                  <NavLink
                    className="d-flex justify-content-between notelabel"
                    to={`/Page${i}`}
                    title={text.label}
                  >
                    <span className="w-75 mx-2">{title}</span>
                    <span className="mx-2">{data}</span>
                  </NavLink>
                )}
                <button
                  className="align-self-center btn btn-sm btn-outline-danger"
                  onClick={() => courier(remove, id, pageName)}
                  title={text.button}
                >
                  &times;
                </button>
              </div>
            </li>
          </CSSTransition>
        )
      )}
    </TransitionGroup>
  );
};
