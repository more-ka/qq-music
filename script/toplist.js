import {TOPLIST_RUL} from './contants.js'
import {lazyload} from './lazyload.js'

export class Toplist{
  constructor(el){
    this.$el = el
  }
  launch(){
    fetch(TOPLIST_RUL)
    .then(res => res.json())
    .then(json => this.render(json.data.topList))
  }
  render(listData){
    this.$el.innerHTML = listData
    .map(
      list => `<div class="listItem">
<div class="picture" >
    <img class="lazyload" data-src="${
      list.picUrl
    }" alt="" style="width:100px;height:100px;">
  </div>
  <div class="content">
    <div class="title">${list.topTitle}</div>
    ${this.songList(list.songList)}
  </div>
</div>`
    )
    .join("");
  lazyload(this.$el.querySelectorAll(".lazyload"));
  }
  songList(songs) {
    return songs
      .map(
        (song, i) =>
          `<p>${i + 1}
    <span class="name">${song.songname}</span>
    <span class="singer">- ${song.singername}</span>
  </p>
  `
      )
      .join("");
  }
}
