import React from "react";

export function About() {
  return (
    <div className="jumbotron">
      <h1 className="display-5">Simple Note app</h1>
      <p className="lead">
        Это простое React-приложение <strong>блокнот</strong> с удаленным
        хранением данных.
      </p>
      <hr className="my-4" />
      <p>
        Позволяет создавать/удалять страницы, добавлять/удалять/отмечать
        заметки, информирует об успешности операций.
      </p>
      <p>
        Все изменения синхронизируются с удаленной базой данных
        <strong> Firebase </strong> в реальном времени, что обьясняет некоторую
        задержку отображения изменений. Локальное хранилище данных не
        используется.
      </p>
      <hr className="my-4" />
      <p>
        2019 | <small className="ml-2"> Практика изучения React JS </small>
      </p>
    </div>
  );
}
