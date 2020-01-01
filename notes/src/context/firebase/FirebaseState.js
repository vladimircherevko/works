import React, { useState, useContext } from "react";
import { FirebaseContext } from "./firebaseContext";
import axios from "axios";
import { AlertContext } from "../alert/alertContext";

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({ children }) => {
  const { showAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);

  const methods = {
    fetchNotes: {
      method: "get",
      url: () => `${url}/notes.json`,
      value: () => null,
      handler: res => {
        if (res.data) {
          setState(
            Object.entries(res.data).map(page => ({
              title: page[1].title,
              id: page[0],
              content: page[1].content
                ? Object.keys(page[1].content).map(key => ({
                    ...page[1].content[key],
                    id: key
                  }))
                : []
            }))
          );
        } else showAlert({ text: "Список страниц пустой", type: "info" });
      }
    },
    addPage: {
      method: "post",
      url: () => `${url}/notes.json`,
      value: value => ({ title: value }),
      handler: (res, noteId, pageName, value) => {
        setState([...state, { title: value, id: res.data.name, content: [] }]);
        showAlert({ text: "Страница добавлена!", type: "success" });
      }
    },
    removePage: {
      method: "delete",
      url: pageId => `${url}/notes/${pageId}.json`,
      value: () => null,
      handler: (res, noteId) => {
        setState(state.filter(el => el.id !== noteId));
        showAlert({ text: "Страницa удалена!", type: "success" });
      }
    },
    toggleStateNote: {
      method: "patch",
      url: (pageId, noteId) => `${url}/notes/${pageId}/content/${noteId}.json`,
      value: value => ({ completed: value }),
      handler: (res, noteId, pageName, value) => {
        setState(
          state.map(page =>
            page.title !== pageName
              ? page
              : {
                  ...page,
                  content: page.content.map(note =>
                    note.id !== noteId ? note : { ...note, completed: value }
                  )
                }
          )
        );
      }
    },
    removeNote: {
      method: "delete",
      url: (pageId, noteId) => `${url}/notes/${pageId}/content/${noteId}.json`,
      value: () => null,
      handler: (res, noteId, pageName) => {
        setState(
          state.map(page =>
            page.title !== pageName
              ? page
              : {
                  ...page,
                  content: page.content.filter(note => note.id !== noteId)
                }
          )
        );
        showAlert({ text: "Запись удалена!", type: "success" });
      }
    },
    addNote: {
      method: "post",
      url: pageId => `${url}/notes/${pageId}/content.json`,
      value: value => ({
        title: value,
        data: new Date().toString(),
        completed: false
      }),
      handler: (res, noteId, pageName, value) => {
        setState(
          state.map(page =>
            page.title !== pageName
              ? page
              : {
                  ...page,
                  content: [
                    ...page.content,
                    {
                      title: value,
                      data: new Date().toString(),
                      completed: false,
                      id: res.data.name
                    }
                  ]
                }
          )
        );
        showAlert({ text: "Запись добавлена", type: "success" });
      }
    }
  };

  const courier = async (typeAction, noteId, pageName, value) => {
    setLoading(true);

    let pageId = pageName
      ? pageName !== "Главная"
        ? state.find(el => el.title === pageName).id
        : noteId
      : "";

    await axios[methods[typeAction].method](
      methods[typeAction].url(pageId, noteId),
      methods[typeAction].value(value)
    )
      .then(res => methods[typeAction].handler(res, noteId, pageName, value))
      .catch(err => {
        console.log(err);
        showAlert({ text: "Ошибка при обращении к серверу!", type: "danger" });
      });

    setLoading(false);
  };

  return (
    <FirebaseContext.Provider
      value={{
        loading,
        listDynamicPages: state,
        courier
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
