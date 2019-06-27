class Slides{
  constructor(options={}){
    this.$el = options.el
    this.imgData = options.imgData0
    this.render()
  }
  render(){
    this.$el.innerHTML = `<div class="slides" id="slides">`
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
}
