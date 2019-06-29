function lazyload(images){
  let imgs = [].slice.call(images)
  window.addEventListener('scroll',onscroll)
  window.dispatchEvent(new Event('scroll'))
  function onscroll(){
    if(imgs.length === 0){
      return window.removeEventListener('scroll',onscroll) }
    imgs = imgs.filter(img => img.classList.contains('lazyload'))
    imgs.forEach(img => {
      if(inViewport(img)){
        loadImage(img)
      }
    })
    
  }
  function inViewport(img){
    let {top,right,bottom,left} = img.getBoundingClientRect()
    let vpHeight = document.documentElement.clientHeight
    let vpWidth = document.documentElement.clientWidth
    return (
      (top > 0 && top < vpHeight || bottom> 0 && bottom < vpHeight) 
      && (left > 0 && left < vpWidth || right > 0 && right < vpWidth)
  )
}
  function loadImage(img){
    let image = new Image()
    image.src = img.dataset.src
    image.onload = function(){
      img.src = image.src
      img.classList.remove('lazyload')
    }
  }
}