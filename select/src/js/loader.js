export default function Loader(){
  const div=document.createElement('div');
  div.className='loader';

  let img=document.createElement('img');
  img.src='./img/reload.png';
  div.append(img);
  return div;
}