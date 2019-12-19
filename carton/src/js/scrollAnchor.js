document.querySelectorAll('a[href*="#"]')
  .forEach(item => item.addEventListener('click', e => {
    e.preventDefault();

    let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset - 70;

    window.scrollTo(0, coordY);
  }))