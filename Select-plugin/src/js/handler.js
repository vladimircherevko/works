// will be used to handle button clicks (if run without parameter) & select messages (if run with string parameter)

export default function handler(logValue) {

  if (typeof logValue == 'string') {
    log.innerHTML = logValue;
    return;
  };

  if (event.target.tagName === "BUTTON" && event.target.dataset) {
    if (event.target.dataset.type && event.target.classList.contains('actived')) {

      //parameter for select method, used only in set
      let par = null;
      if (event.target.dataset.type === 'set') {
        par = +/\d/.exec(event.target.innerHTML);
      };

      // if select.method returns the result will be shown in the alert
      let res = this[event.target.dataset.type](par);
      if (res !== undefined) {
        res = res ? res.outerHTML : 'not selected';
        alert(res);
      }
    }

    // returns true if handled the event - click was on its button
    return true;
  };

  return false;
}