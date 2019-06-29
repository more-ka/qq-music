(function(){
  fetch('/json/rec.json')
  .then(res => res.json())
  .then(render)

function render(json) {  
  renderSlide(json.data.slider)
  renderRadio(json.data.radioList)
  renderList(json.data.songList)
}

function renderSlide(slides) {  
  slides = slides.map( slide => {
    return {link: slide.linkUrl,image: slide.picUrl}
  })
  new Slides({
    el: document.querySelector('#window'),
    slides
  })
}
})()
function renderRadio(radios) {  
  document.querySelector('.radio .list').innerHTML = radios.map(radio => `
  <div class="listItem">
  <div class="listMedia">
    <img src="${radio.picUrl}" alt="封面">
    <span class="icon icon-play"></span>
  </div>
  <div class="listInfo">${radio.Ftitle}</div>
  </div>`).join('')
}
function renderList(songLists) {  
  document.querySelector('.hotList .list').innerHTML = songLists.map(list=>`
  <div class="listItem">
  <div class="listMedia">
    <img src="${list.picUrl}" alt="封面">
    <span class="icon icon-play"></span>
  </div>
  <div class="listInfo">${list.songListDesc}
  <div class="listAuthor">${list.songListAuthor}</div>
  </div>
  </div>`).join('')

}