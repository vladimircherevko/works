export const TypePage = {
  home: {
    forForm: {
      text: {
        placeholder: "название страницы (max 15 символов)",
        title: "Добавить страницу"
      },
      submit: "addPage",
      list: "listDinamicPages",
      maxItems: 6,
      maxLength: 15,
      searchLength: state => state.length
    },
    forList: {
      searchItems: state =>
        state.map(page => ({
          title: `Страница: ${page.title}`,
          data: `Записей: ${page.content ? page.content.length : 0}`,
          id: page.id
        })),
      text: {
        label: "Перейти на страницу",
        button: "Удалить страницу"
      },
      remove: "removePage"
    }
  },
  notes: {
    forForm: {
      text: {
        placeholder: "заметку",
        title: "Добавить заметку"
      },
      submit: "addNote",
      list: "listNotes",
      maxItems: 20,
      maxLength: 200,
      searchLength: (state, title) => {
        let activePage = state.find(page => page.title === title);
        return (
          (activePage && activePage.content && activePage.content.length) || 0
        );
      }
    },
    forList: {
      searchItems: (state, title) => {
        let activePage = state.find(page => page.title === title);
        return (
          (activePage &&
            activePage.content &&
            activePage.content.map(note => ({
              ...note,
              data: new Date(note.data).toLocaleString("ru", {
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric"
              })
            }))) ||
          []
        );
      },
      text: {
        label: "Отметить запись",
        button: "Удалить запись"
      },
      remove: "removeNote"
    }
  }
};
