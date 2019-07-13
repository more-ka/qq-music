export class Search {
  constructor(el) {
    this.$el = el;
    this.$input = this.$el.querySelector(".input");
    this.$input.addEventListener("keyup", this.onKeyUp.bind(this));
    this.$songList = this.$el.querySelector(".searchList");
    this.$clear = this.$el.querySelector(".clear");
    this.keyword = "";
    this.page = 1;
    this.songs = [];
    this.prepage = 20;
    this.fetching = false;
    this.nomore = false;
    this.$clear.addEventListener('click',()=>{this.$input.value = '';this.reset()})
    window.addEventListener("scroll", this.onScroll.bind(this));
  }

  onScroll() {
    if (this.nomore) return;
    if (this.fetching) return;
    if (
      document.documentElement.clientHeight + pageYOffset >
      document.body.scrollHeight - 50
    ) {
      this.search(this.keyword, this.page + 1);
    }
  }

  onKeyUp(event) {
    let keyword = event.target.value.trim();
    if (!keyword) {
      this.reset();
    }
    if (event.keyCode !== 13) return;
    this.search(keyword);
  }
  reset() {
    this.page = 1;
    this.songs = [];
    this.keyword = "";
    this.$songList.innerHTML = "";
  }
  search(keyword, page) {
    this.keyword = keyword;
    this.fetching = true;
    fetch(
      `http://localhost:4000/search?keyword=${this.keyword}&page=${page ||
        this.page}`
    )
      .then(res => res.json())
      .then(json => {
        this.page = json.data.song.curpage;
        this.nomore = json.data.song.curnum === 0;
        return json.data.song.list;
      })
      .then(songs => this.append(songs))
      .then(() => (this.fetching = false));
  }
  append(songs) {
    let html = songs.map(song =>{
      let artist = song.singer.map(s=>s.name).join(' ')
        return  `
      <a class="songItem" 
      href="#player?artist=${artist}&songid=${song.songmid}&songname=${song.songname}&albumin=${song.songmid}&duration=${song.interval}">
        <i class="icon icon-music"></i>
        <div class="songName" ellipsis>${song.songname}</div>
        <div class="songSinger" ellipsis>${artist}</div>
      </a>`}).join("");

    this.$songList.insertAdjacentHTML("beforeend", html);
    if (this.nomore) {
      this.$songList.insertAdjacentHTML(
        "beforeend",
        `<li class="nomore">
        没有更多了
       </li>`
      );
    }
  }
}
