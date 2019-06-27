class Slides{
  constructor(options={}){
    this.$el = options.el
    this.imgData = options.imgData
    this.interval = options.interval || 3000
    this.index = 0
    this.render()
    this.start()
  }
  render(){
    this.$el.innerHTML = `<div class="slides" id="slides"></div>`
    this.$slides = this.$el.firstElementChild
    this.$slides.style.width = `${this.imgData.length*100}%`
    this.$slides.innerHTML = this.imgData.map(img=>
      `<div class="slidesItem">
      <a href="${img.link}">
        <img src="${img.image}" alt="picture">
      </a>
    </div>
      `).join('')
  }
  start(){
    setInterval(this.next.bind(this),this.interval)
  }
  next(){
    this.index += 1
    if(this.index >= this.imgData.length){
      this.index = 0
      this.$slides.style.transform = `translateX(0)`
      return
    }
    let distance = `-${this.index*(100/this.imgData.length)}%`
    
    this.$slides.style.transform = `translateX(${distance})`    
  }
}
