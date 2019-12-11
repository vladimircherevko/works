import Loader from './loader'

export default class Select {
  constructor({
    selector,
    url,
    theme,
    onSelect
  }) {
    let
      permit = {}, // approved public methods 
      handlerOut = onSelect.bind(this), // outside click handler in right context
      activedOption = null, //selected option
      listValues = [], // values for options
      controlers = document.querySelectorAll('[data-type]'); // external buttons for work with select must have this attribute

    // prepare container & build structure
    const container = document.querySelector(selector);
    container.classList.add('select-wrap');

    //anim label under select
    const label = document.createElement('label');
    label.className = "select-label";
    label.innerHTML = theme;

    //select wrap
    const select = document.createElement('div');
    select.className = 'select';

    // title-button shows selected option & controls the view  
    const title = document.createElement('button');

    // list options
    const list = document.createElement('ul');
    list.classList.add('anim-item');

    // connect the load indicator
    const loader = Loader();
    loader.classList.add('anim-item');

    select.append(title, list, loader);
    container.append(label, select);

    // further a series of asynchronous actions
    (async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // animation delay
      setSelect(); // set start values
      if (url) await getValuesByNet(url); // load values for options
      if (listValues.length) readyList(); // create list options
      clickable.call(this); // make select clickable
    }).call(this)
    // here constructor finishs

    function getValuesByNet(url) {
      openLoader();
      return fetch(url)
        .then(resp => resp.json())
        .then(data => {
          listValues = Object.values(data).map(el => el.label)
        })
        .finally(() => closeLoader())
        .catch(err => {
          handlerOut('Loading error: see console');
          console.log(err);
        });
    }

    function clickable() {
      // create encapsulated public mehtods
      this.open = () => {
        if (permit.open) open()
      };
      this.close = () => {
        if (permit.close) close()
      };
      this.destroy = () => {
        if (permit.destroy) {
          if (list.classList.contains('open')) document.removeEventListener('keydown', arrowScroll);
          document.removeEventListener('click', onDocumentClick);
          container.innerHTML = '';
          container.classList.remove('select-wrap');
          permit = {};
          controlButtons();
          handlerOut('');
        }
      };
      this.set = n => {
        if (permit.set) {
          let options = list.querySelectorAll('li');
          if (n > 0 && n <= options.length) activeOption(options[n - 1]);
        }
      };
      this.get = () => {
        if (permit.get) return activedOption
      };
      this.clear = () => {
        if (permit.clear) {
          setSelect();
          permit.set = false;
          permit.clear = false;
          controlButtons();
          handlerOut('no options');
        }
      };

      permit.open = true;
      permit.destroy = true;
      permit.get = true;

      document.addEventListener('click', onDocumentClick);
      controlButtons(); //make external buttons activ
    }

    function controlButtons() {
      controlers.forEach(button => permit[button.dataset.type] ? button.classList.add('actived') : button.classList.remove('actived'))
    }

    function onDocumentClick(event) {
      if (handlerIn() || handlerOut()) {
        return;
      };
      if (list.classList.contains('open')) close();
    }

    function handlerIn() {
      if (select.contains(event.target)) {
        if (event.target.matches('.select-title')) {
          toggle();
          return true
        } else if (event.target.tagName == 'LI') {
          activeOption(event.target);
          close();
          return true;
        }
      }
      return false;
    }

    function arrowScroll(event) {
      if (event.code == 'ArrowUp') list.scrollTop -= 10;
      if (event.code == 'ArrowDown') list.scrollTop += 10;
    }

    function openLoader() {
      loader.classList.add('open');
    }

    function closeLoader() {
      loader.classList.remove('open');
    }

    function readyList() {
      listValues.forEach(value => {
        list.innerHTML += `<li>${value}</li>`;
      });
      title.classList.add('list-mark');
      permit.clear = true;
      permit.set = true;
    }

    function toggle() {
      list.classList.contains('open') ? close() : open();
    }

    function open() {
      list.classList.add('open');
      label.classList.remove('big');
      title.classList.add('up');
      document.addEventListener('keydown', arrowScroll); // scroll the list with arrowsUp/Down 
      permit.open = false;
      permit.close = true;
      controlButtons();
    }

    function close() {
      list.classList.remove('open');
      if (!activedOption) label.classList.add('big');
      list.classList.remove('open');
      title.classList.remove('up');
      document.removeEventListener('keydown', arrowScroll);
      permit.close = false;
      permit.open = true;
      controlButtons();
    }

    function activeOption(option) {
      label.classList.remove('big');
      title.innerHTML = option.innerHTML;
      if (activedOption) activedOption.classList.remove('actived');
      option.classList.add('actived');
      activedOption = option;
      handlerOut(title.innerHTML);
    }

    function setSelect() {
      activedOption = null;
      title.innerHTML = '';
      title.className = 'select-title';
      label.classList.add('big');
      list.innerHTML = '';
    }
  }
}