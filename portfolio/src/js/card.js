export default class Card {
  constructor({
    img,
    tags,
    demo,
    code,
    dsc,
    name
  }) {
    const card = document.createElement('div');
    card.className = "col-12 col-md-6 col-lg-4 card";

    card.innerHTML = 
    `<div class="img_anim">
      <img src="${img}" alt="picture">
      <div class="blind">
        <p>${dsc}</p>
        <a class="demo" href="${demo}">Demo</a>
        <a class="code" href="${code}">Code</a>
      </div>
    </div>
    <div class="title">
      <h2>${name}</h2>
      <span class="tags">${tags.join(' | ')}</span>
    </div>`;
    return card;
  }
}