class MusicPlayer{
  constructor(el){
    this.$el = el
    this.button = this.$el.querySelector('.playerFooter .play')
    this.button.addEventListener('click',this)
    this.createAudio()
    this.musicLyric = new MusicLyric(this.$el.querySelector('.playerLyricWrapper'))
    this.musicProgress = new MusicProgress(this.$el.querySelector('.progressWrapper'), 8 , true)
  }
  createAudio(){
    let audio = document.createElement('audio')
    audio.src = 'http://dl.stream.qqmusic.qq.com/M500000wyGAY1FfsZ9.mp3?vkey=8D0CA4FB19163FC56E14D7DA38C76154238B69ABC2CE0DA6E298140EA3B8601B6028B9D3B83D1EF2228953C068F91AF2F220B5377A9BD72E&guid=5150825362&fromtag=1'
    document.body.appendChild(audio)
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
    event.target.classList.add('icon-pause')
    event.target.classList.remove('icon-play')
  }
  onPause(event){
    event.target.classList.add('icon-play')
    event.target.classList.remove('icon-pause')
  }
  show(){

  }
  hide(){

  }

}
