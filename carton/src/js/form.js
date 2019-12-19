import {
  modalOpen
} from './modal';
import {
  data
} from './data';

// create form element
export function getForm() {
  const p = document.createElement('p');
  p.className = "mb-2";
  p.innerHTML = 'Введите ваш номер телефона:';

  const small = document.createElement('small');
  small.innerHTML = '* Минимальный заказ 500шт';

  const form = document.createElement('form');
  form.className = "w-75 mx-auto";
  form.setAttribute('method', 'GET');
  form.setAttribute('action', '#');
  form.innerHTML = `<input name="tel" class="mx-auto mb-3 btn" type="tel" placeholder="+7 (ХХХ) ХХХ-ХХ-ХХ" maxlength="18" pattern="^\\+?\\d?\\s?[\\(-]?\\d{3}[\\)-]?\\s?\\d{3}-?\\d\\d-?\\d\\d$" required><button class="btn btn-f" type="submit">Оставить заявку!</button>`;
  form.addEventListener('submit', submitEmul);
  return [p, form, small];
}

// handler for submit event
function submitEmul(e) {
  e.preventDefault();
  let res = formater(e.target.elements.tel);
  if (res) {
    let old=data.submit.content;
    data.submit.content+= `<p>${res}</p><br><button onclick="alert('Вам перезвонят'); modal.classList.remove('d-block')" class="btn btn-f ok">Отправить</button>`;
    modalOpen('submit');
    data.submit.content=old;
  }
}

// translate gotten tel in format
function formater(el) {
  let s = el.value.match(/\d/g).join('');
  if (s.length == 10) s = '+7 (' + s[0] + s[1] + s[2] + ') ' + s[3] + s[4] + s[5] + '-' + s[6] + s[7] + '-' + s[8] + s[9];

  if (s.length == 11) s = '+' + s[0] + ' (' + s[1] + s[2] + s[3] + ') ' + s[4] + s[5] + s[6] + '-' + s[7] + s[8] + '-' + s[9] + s[10];
  el.value = s;
  return s;
}