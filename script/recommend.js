import {lazyload} from './lazyload.js'
import {RECOMMEND_RUL} from './contants.js'
import {Slides} from './slides.js'
export class Recommend{
  constructor(el){
    this.$el = el
  }
  launch(){
    fetch(RECOMMEND_RUL)
    .then(res => res.json())
    .then(json => this.json = json)
    .then(() => this.render())
    return this
  }
  render(json){
    this.renderSlider(this.json.data.slider)
    this.renderRadio(this.json.data.radioList);
    this.renderList(this.json.data.songList);
    lazyload()
  }
  renderSlider(slides) {
    this.slides = new Slides({      
      el: this.$el.querySelector('.window'),
      slides: slides.map(slide => ({ link: slide.linkUrl, image: slide.picUrl }))
    })
  }
  renderRadio(radios){
    this.$el.querySelector(".radio .list").innerHTML = radios
    .map(
      radio => `
  <div class="listItem">
  <div class="listMedia">
    <img class="lazyload" data-src="${radio.picUrl}" alt="封面">
    <span class="icon icon-play"></span>
  </div>
  <div class="listInfo">${radio.Ftitle}</div>
  </div>`
    )
    .join("");
  }
  renderList(songLists){
    this.$el.querySelector(".hotList .list").innerHTML = songLists
    .map(
      list => `
  <div class="listItem">
  <div class="listMedia">
    <img class="lazyload" data-src="${list.picUrl}" alt="封面">
    <span class="icon icon-play"></span>
  </div>
  <div class="listInfo">${list.songListDesc}
  <div class="listAuthor">${list.songListAuthor}</div>
  </div>
  </div>`
    )
    .join("");
  }
}

