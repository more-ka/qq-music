let text =
  "[ti&#58;17岁]&#10;[ar&#58;刘德华]&#10;[al&#58;如果有一天]&#10;[by&#58;]&#10;[offset&#58;0]&#10;[00&#58;00&#46;00]17岁&#32;&#45;&#32;刘德华&#32;&#40;Andy&#32;Lau&#41;&#10;[00&#58;05&#46;97]词：刘德华,徐继宗&#10;[00&#58;11&#46;95]曲：徐继宗&#10;[00&#58;17&#46;93]十七岁那日&#10;[00&#58;19&#46;48]不要脸参加了挑战&#10;[00&#58;22&#46;93]&#10;[00&#58;23&#46;99]明星也有训练班&#10;[00&#58;26&#46;38]短短一年太新鲜&#10;[00&#58;29&#46;26]记得四哥发哥都已见过面&#10;[00&#58;34&#46;78]&#10;[00&#58;35&#46;75]后来荣升主角太突然&#10;[00&#58;39&#46;93]&#10;[00&#58;41&#46;80]廿九岁颁奖的晚宴&#10;[00&#58;45&#46;02]Fans&#32;太疯癫&#10;[00&#58;46&#46;85]&#10;[00&#58;47&#46;90]来听我唱段情歌&#10;[00&#58;50&#46;29]一曲歌词太经典&#10;[00&#58;53&#46;27]我的震音假音早已太熟练&#10;[00&#58;58&#46;78]&#10;[00&#58;59&#46;32]然而情歌总唱不厌&#10;[01&#58;03&#46;45]&#10;[01&#58;05&#46;55]喜欢我别遮脸任由途人发现&#10;[01&#58;11&#46;20]尽管唱用心把这情绪歌中染&#10;[01&#58;16&#46;94]&#10;[01&#58;19&#46;67]唱情歌齐齐来一遍&#10;[01&#58;24&#46;50]&#10;[01&#58;25&#46;65]无时无刻都记住&#10;[01&#58;28&#46;21]掌声响遍天&#10;[01&#58;30&#46;29]&#10;[01&#58;31&#46;33]来唱情歌由从头再一遍&#10;[01&#58;36&#46;28]&#10;[01&#58;37&#46;41]如情浓有点泪流难避免&#10;[01&#58;41&#46;74]&#10;[01&#58;43&#46;06]音阶起跌拍子改变&#10;[01&#58;45&#46;97]&#10;[01&#58;46&#46;61]每首歌是每张脸&#10;[01&#58;50&#46;06]&#10;[02&#58;00&#46;99]喜欢我别遮脸任由途人发现&#10;[02&#58;06&#46;20]&#10;[02&#58;06&#46;74]尽管唱用心把这情绪歌声中渲染&#10;[02&#58;12&#46;25]&#10;[02&#58;13&#46;79]唱情歌齐齐来一遍&#10;[02&#58;18&#46;28]&#10;[02&#58;19&#46;61]无时无刻都记住掌声响遍天&#10;[02&#58;24&#46;28]&#10;[02&#58;25&#46;38]来唱情歌由从头再一遍&#10;[02&#58;30&#46;35]&#10;[02&#58;31&#46;41]如情浓有点泪流难避免&#10;[02&#58;35&#46;40]&#10;[02&#58;36&#46;91]音阶起跌拍子改变&#10;[02&#58;39&#46;98]&#10;[02&#58;40&#46;59]年月变但我未变&#10;[02&#58;43&#46;65]唱情歌齐齐来一遍&#10;[02&#58;48&#46;37]&#10;[02&#58;49&#46;65]无时无刻都记住掌声响遍天&#10;[02&#58;54&#46;32]&#10;[02&#58;55&#46;43]来唱情歌由从头再一遍&#10;[03&#58;00&#46;32]&#10;[03&#58;01&#46;28]如情浓有点泪流难避免&#10;[03&#58;05&#46;30]&#10;[03&#58;06&#46;92]音阶起跌拍子改变&#10;[03&#58;10&#46;02]&#10;[03&#58;10&#46;58]每首歌是每张脸&#10;[03&#58;13&#46;83]&#10;[03&#58;21&#46;01]如今我四十看从前沙哑了声线&#10;[03&#58;25&#46;72]&#10;[03&#58;26&#46;76]回忆我冀望那掌声&#10;[03&#58;29&#46;78]都依然到今天&#10;[03&#58;31&#46;75]&#10;[03&#58;32&#46;33]那首潮水忘情水不再经典&#10;[03&#58;37&#46;80]&#10;[03&#58;40&#46;41]仍长埋你的心中从未变";

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
    this.time = 0
    this.i = 0
    this.reset(text);
    this.start()
  }
  restart(){
    this.reset()
    this.start()
  }
  start() {
    this.timer = setInterval(this.update.bind(this), 1000);
  }
  pause() {
    clearInterval(this.timer);
  }
  render() {
    let html = this.lyric.map(line => `<li>${line.slice(10)}</li>`).join("");
    this.$lyric.innerHTML = html;
  }
  update() {
    this.processingData();
    this.time = +this.getlyricTime(this.lyricObj);
    
    for (let i = this.index; i < this.time + 1; i++) {
      if (this.lyricObj[i] && this.currentTime === i) {
        if(this.$lyric.children[this.index].previousSibling){
          this.$lyric.children[this.index].previousSibling.classList.remove('active')
        }
        this.$lyric.children[this.index].classList.add("active");
        this.index += 1
        break
      }
    }
    this.currentTime += 1
    if(this.index){
      let distance = (this.index-4) * this.$lyric.firstChild.offsetHeight
      this.$lyric.style.transform = `translateY(-${distance}px)`
      console.log(this.index,distance);
      
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
