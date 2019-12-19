export function runSlider(a){
  runSlider.imgs[runSlider.count].classList.remove('shown');
  runSlider.inds[runSlider.count].classList.remove('shown');

  runSlider.count=(runSlider.count+a+runSlider.imgs.length)%runSlider.imgs.length;
  
  runSlider.imgs[runSlider.count].classList.add('shown');
  runSlider.inds[runSlider.count].classList.add('shown');
}

runSlider.count=0;
runSlider.imgs=document.querySelectorAll('.show img');
runSlider.inds=document.querySelectorAll('.control .item img');
