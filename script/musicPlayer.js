import { MusicLyric } from './musicLyric.js'
import { MusicProgress } from './mucisProgress.js'

export class MusicPlayer{
  constructor(el){
    this.$el = el
    this.button = this.$el.querySelector('.playerFooter .play')
    this.button.addEventListener('click',this)
    this.createAudio()
    this.$audio = document.querySelector('audio')
    this.musicLyric = new MusicLyric(this.$el.querySelector('.playerLyricWrapper'),this.$audio)
    this.musicProgress = new MusicProgress(this.$el.querySelector('.progressWrapper'), 100 , true)
  }
  play(options = {}){
    this.options = options
    this.$el.querySelector('.playerTitle .name').innerText = options.songname
    this.$el.querySelector('.playerTitle .singer').innerText = options.artist
    this.musicProgress.reset(options.duration)
    let url = `https://y.gtimg.cn/music/photo_new/T002R150x150M000${this.songid}.jpg?max_age=2592000`
    this.$el.querySelector('.bg').style.background = `url${url}`
    if(options.songid){                                          
      this.songid = options.songid
      this.$audio.src = `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400${this.songid}.m4a?guid=407204717&vkey=9CA4990693C80F81F3BB8034F6D90E8FBC0D3AB44FDF715EE8D5EA85DA2DDBB3F4DAF846F4B4ECD232BC0E238579DA8F04539B82874BB621&uin=0&fromtag=38`
      // fetch(`https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?-=MusicJsonCallback_lrc&pcachetime=1562916703597&songmid=${this.songid}&g_tk=1678736452&loginUin=1640627628&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`)
      //   .then(res=>res.json())
      //   .then(json=>json.lyric)
      //   .then(text=>this.musicLyric.reset(text))
      //   .catch(()=>{})      
    }
    this.show()
    this.$audio.play()
    this.musicLyric.start()
    this.musicProgress.start()
    this.button.classList.remove('icon-play')
    this.button.classList.add('icon-pause')
  }
  createAudio(){
    this.$audio = document.createElement('audio')
    this.$audio.addEventListener('ended',()=>{
      this.play(this.options)
      this.$audio.play()
      this.musicLyric.restart()
      this.musicProgress.restart()
    })
    document.body.appendChild(this.$audio)
  }
  handleEvent(event){
    let target = event.target
    switch(true){
      case target.matches('.icon-play'):
      this.onPlay(event)
      break
      case target.matches('.icon-pause'):
      this.onPause(event)
      break
    }
  }
  onPlay(event){
    this.$audio.play()
    this.musicLyric.start()
    this.musicProgress.start()
    event.target.classList.add('icon-pause')
    event.target.classList.remove('icon-play')
  }
  onPause(event){
    this.$audio.pause()
    this.musicLyric.pause()
    this.musicProgress.pause()
    event.target.classList.add('icon-play')
    event.target.classList.remove('icon-pause')
  }
  show(){
    this.$el.classList.remove('hide')
  }
  hide(){
    this.$el.classList.add('hide')
  }

}
