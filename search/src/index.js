import { fromEvent, EMPTY } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  mergeMap,
  tap,
  catchError,
  filter
} from "rxjs/operators";

const url = "https://api.github.com/search/users?q=";

const preloader = `<div class="preloader-wrapper big active">
<div class="spinner-layer spinner-blue-only">
  <div class="circle-clipper left">
    <div class="circle"></div>
  </div><div class="gap-patch">
    <div class="circle"></div>
  </div><div class="circle-clipper right">
    <div class="circle"></div>
  </div>
</div>
</div>`;

const input = document.getElementById("search");
const result = document.getElementById("result");

fromEvent(input, "input")
  .pipe(
    map(e => e.target.value),
    debounceTime(2000),
    distinctUntilChanged(),
    filter(v => v.trim()),
    tap(() => (result.innerHTML = preloader)),
    switchMap(v => ajax.getJSON(url + v).pipe(catchError(err => EMPTY))),
    map(resp => resp.items),
    tap(() => (result.innerHTML = "")),
    mergeMap(items => items)
  )
  .subscribe(
    user => {
      const card = `<div class="col s3"><div class="card">
  <div class="card-image"><img src="${user.avatar_url}" alt="photo"/></div>
  <a href="${user.html_url}" target="_blank" title="Open GitHub">
  <div class="card-action purple lighten-5 hoverable">${user.login}</div>
  </a>
  </div></div>`;

      result.insertAdjacentHTML("beforeend", card);
    },
    err => console.log("Wrong work!", err)
  );
