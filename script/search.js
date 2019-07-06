class Search {
  constructor(el) {
    this.$el = el;
    this.$input = this.$el.querySelector(".input");
    this.$input.addEventListener("keyup", this.onKeyUp.bind(this));
    this.$songList = this.$el.querySelector(".searchList");
    this.keyword = ''
    this.page = 1
    this.songs = []
    this.prepage = 20
  }

  onKeyUp(event) {
    let keyword = event.target.value.trim()
    if (event.key !== 'Enter') return
    console.log('1');
    this.search(keyword)
  }
  search(keyword) {
    this.keyword = keyword
    console.log('2');

    fetch(`http://localhost:4000/search?keyword=${this.keyword}&page=${this.page}`)
      .then(res => res.json())
      .then(json => json.data.song.list)
      .then(songs => this.append(songs))
      
  }
  append(songs) {
    console.log(songs);
    
    let html = songs.map(song => `
      <li class="songItem">
        <i class="icon icon-music"></i>
        <div class="songName">${song.songname}</div>
        <div class="songSinger">${song.singer.map(s=>s.name).join(' ')}</div>
      </li>`).join('')
      this.$songList.insertAdjacentHTML('beforeend',html)

  }
}
