import React from "react";
import { Form } from "./Form";
import { List } from "./List";
import { TypePage } from "../context/typePage";

export const Page = ({ name }) => {
  let key = name === "Главная" ? "home" : "notes";
  return (
    <>
      <h4 className="text-center text-danger">{name.toUpperCase()}</h4>
      <Form {...TypePage[key].forForm} pageName={name} />
      <List {...TypePage[key].forList} pageName={name} />
    </>
  );
};
