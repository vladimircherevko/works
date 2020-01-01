import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { About } from "../staticPages/About";
import { Navbar } from "./Navbar";
import { Page } from "./Page";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { Alert } from "./Alert";

const staticPages = [
  { title: "Главная", component: () => <Page name="Главная" />, path: "/" },
  { title: "Инфо", component: About, path: "/About" }
];

export function PageMaker() {
  const [pages, setPages] = useState(staticPages);
  const { listDynamicPages, courier } = useContext(FirebaseContext);

  useEffect(() => {
    courier("fetchNotes");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setPages([
      ...staticPages,
      ...listDynamicPages.map((page, i) => ({
        title: page.title,
        path: `/Page${i}`,
        component: () => <Page name={page.title} />
      }))
    ]);
  }, [listDynamicPages]);

  return (
    <>
      <BrowserRouter>
        <Navbar pages={pages} />
        <div className="container pt-4">
          <Alert />
          <Switch>
            {pages.map((el, i) => (
              <Route
                key={el.path}
                path={el.path}
                component={el.component}
                exact={el.path === "/"}
              />
            ))}
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}
