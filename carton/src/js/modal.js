import { getForm } from "./form";
import {
  data
} from './data';

export function modalOpen(key) {
  const modal = document.getElementById('modal');

  modal.querySelector('.title').innerHTML = data[key].title;
  modal.querySelector('.body').innerHTML = data[key].content;
  // if need to add form
  if(key=='form') modal.querySelector('.body').append(...getForm());
  
  modal.classList.add('d-block');
}