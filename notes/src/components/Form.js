import React, { useContext, useState } from "react";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { AlertContext } from "../context/alert/alertContext";

export const Form = ({
  submit,
  searchLength,
  text,
  maxItems,
  maxLength,
  pageName
}) => {
  const { courier, listDynamicPages } = useContext(FirebaseContext);
  const { showAlert } = useContext(AlertContext);
  const [value, setValue] = useState("");

  const handleSubmit = event => {
    event.preventDefault();

    if (value.trim()) {
      if (
        pageName === "Главная" &&
        listDynamicPages.some(
          item => item.title.trim().toUpperCase() === value.trim().toUpperCase()
        )
      ) {
        showAlert({ text: `Такая страница уже есть`, type: "warning" });
        return;
      }
      courier(submit, null, pageName, value);
      setValue("");
      return;
    }
    showAlert({ text: "Нечего добавлять", type: "warning" });
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          {...(searchLength(listDynamicPages, pageName) < maxItems
            ? { placeholder: `Введите ${text.placeholder}` }
            : { disabled: true, placeholder: "Лимит исчерпан" })}
          maxLength={maxLength}
          title={text.title}
        />
      </div>
    </form>
  );
};
