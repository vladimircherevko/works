import Card from './js/card'
import {
  data
} from './js/data'


// --- create content for main block
data.worksList.map(key => new Card(data.works[key]))
  .forEach(el => document.querySelector('.content').append(el));

// --- make filter buttons clickable
document.querySelectorAll('nav button')
  .forEach(btn => btn.addEventListener('click', e => {
    document.querySelectorAll('.card').forEach(card => card.hidden = !card.querySelector('.tags').innerHTML.includes(e.target.innerHTML == 'All' ? "" : e.target.innerHTML))
  }));


import './assets/css/main.css'
import './assets/scss/reset.scss'
import './assets/scss/main.scss'
import './assets/scss/card.scss'
import './assets/scss/img.scss'
import 'bootstrap/dist/css/bootstrap-grid.min.css'