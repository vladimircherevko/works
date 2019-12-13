import handler from './js/handler'
import Select from './js/select'

import './css/main.css'
import './css/select.css'
import './css/loader.css'

//start select plugin
const select = new Select({
  selector: '#select-container',
  theme: 'Select Technology',
  url: 'https://vladilen-dev.firebaseio.com/technologies.json',
  onSelect: handler
});
//now can use select's methods