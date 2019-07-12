let text = '技术原因，暂不支持'

class MusicLyric {
  constructor(el) {
    this.$el = el;
    this.$el.innerHTML = '<ul class="playerLyric"></ul>';
    this.$lyric = this.$el.querySelector(".playerLyric");
    this.index = 0;
    this.currentTime = 0;
    this.text = 0;
    this.lyric = [];
    this.lyricObj = {};
    this.time = 0;
    this.reset(text);
  }
  restart() {
    this.reset();
    this.start();
  }
  start() {
    this.timer = setInterval(this.update.bind(this), 1000);
  }
  pause() {
    clearInterval(this.timer);
  }
  render() {
    this.$lyric.innerHTML = this.lyric
      .map(line => `<li>${line.slice(10)}</li>`)
      .join("");
  }
  update() {
    this.processingData();
    this.time = +this.getlyricTime(this.lyricObj);
    if (this.index === this.lyric.length - 1) return this.reset();
    for (let i = this.index; i < this.time + 1; i++) {
      if (this.lyricObj[i] && this.currentTime === i) {
        if (this.$lyric.children[this.index].previousSibling) {
          this.$lyric.children[this.index].previousSibling.classList.remove(
            "active"
          );
        }
        this.$lyric.children[this.index].classList.add("active");
        this.index += 1;
        break;
      }
    }
    this.currentTime += 1;
    if (this.index) {
      let distance = (this.index - 4) * this.$lyric.firstChild.offsetHeight;
      this.$lyric.style.transform = `translateY(-${distance}px)`;
    }
  }

  getlyricTime(obj) {
    let n = 0;
    let last;
    for (let i in obj) {
      last = i;
    }
    return last;
  }
  processingData() {
    this.lyric.map(line =>
      line.replace(/^\[(\d{2}):(\d{2}).\d{2}\](.+)/, (match, $1, $2, $3) => {
        this.lyricObj[+$1 * 60 + +$2] = $3;
      })
    );
  }
  reset(text) {
    this.pause();
    this.index = 0;
    this.currentTime = 0;
    if (text) {
      this.text = this.formatText(text);
      this.lyric = this.text.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm) || [];
    }
    if (this.lyric.length) {
      this.render();
      this.$lyric.children[this.index].classList.add("active");
    }
  }
  formatText(text) {
    let div = document.createElement("div");
    div.innerHTML = text;
    return div.innerHTML;
  }
}
