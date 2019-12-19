import {
  modalOpen
} from './js/modal';
import {
  runSlider
} from './js/slider';
import './js/scrollAnchor';
import {
  getForm
} from './js/form';

// for slider
runSlider(0);
document.querySelector('.slider .next').addEventListener('click', () => runSlider(1));
document.querySelector('.slider .prev').addEventListener('click', () => runSlider(-1));

// for arrow 'go to start'
arrow.onclick = () => window.scrollTo(pageXOffset, 0);
window.addEventListener('scroll', () => arrow.hidden = (pageYOffset < document.documentElement.clientHeight));

// for modal window opening
document.querySelectorAll('button[data-modal]:not([data-modal="close"])').forEach(el => el.addEventListener('click', () => modalOpen(
  el.dataset.modal
)));

// for modal window closing
document.querySelectorAll('button[data-modal="close"]').forEach(el => el.addEventListener('click', () => modal.classList.remove('d-block')));

// for forms creating
document.querySelectorAll('.form-container').forEach(el => el.append(...getForm()));

// styles
import '../node_modules/bootstrap/scss/bootstrap-grid.scss'
import './assets/scss/main.scss'
import './assets/css/main.css'