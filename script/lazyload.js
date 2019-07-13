export function lazyload(images) {
  let imgs = [].slice.call(images || document.querySelectorAll('.lazyload'))

  if('IntersectionObserver' in window){
    let observer = new IntersectionObserver(function(entries){
    entries.forEach(entry =>{
      if(entry.intersectionRatio >0){
        loadImage(entry.target, ()=>{
          observer.unobserve(entry.target)
        })
      }
    })
    
  },{threshold: 0.01})
  imgs.forEach(img=>observer.observe(img))
}else{
  let onscroll = throttle(function() {

    if (imgs.length === 0) {
      return window.removeEventListener("scroll", onscroll);
    }
    imgs = imgs.filter(img => img.classList.contains("lazyload"));
    imgs.forEach(img => {
      if (inViewport(img)) {
        loadImage(img);
      }
    })
  },500)

  window.addEventListener("scroll", onscroll);
  window.dispatchEvent(new Event("scroll"));
  
}
}
function throttle(func,wait) {  
  let previous,timer
  return function fn(){
    let current = Date.now()
    let different = current - previous
    if(!previous || different >= wait){
      func()
      previous = current
    }else if(different < wait){
      clearTimeout(timer)
      timer = setTimeout(fn,wait - different)
    }
  }
}

function inViewport(img) {
  let { top, right, bottom, left } = img.getBoundingClientRect();
  let vpHeight = document.documentElement.clientHeight;
  let vpWidth = document.documentElement.clientWidth;
  return (
    ((top > 0 && top < vpHeight) || (bottom > 0 && bottom < vpHeight)) &&
    ((left > 0 && left < vpWidth) || (right > 0 && right < vpWidth))
  );
}

function loadImage(img,callback) {
  let image = new Image();
  image.src = img.dataset.src;
  image.onload = function() {
    img.src = image.src;
    img.classList.remove("lazyload");
    if(typeof callback === 'function') {callback()}
  };
}