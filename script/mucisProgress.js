export class MusicProgress {
  constructor(el, duration, start) {
    this.$el = el;
    this.currentTime = 0;
    this.duration = duration || 0;
    this.progress = 0;
    this.render();
    this.$currentTime = this.$el.querySelector(".currentTime");
    this.$duration = this.$el.querySelector(".duration");
    this.$progress = this.$el.querySelector(".bar");
    this.$currentTime.innerText = this.formatTime(this.currentTime);
    this.$duration.innerText = this.formatTime(this.duration);
    if (start) this.start();
    this.reset()
  }
  start() {
    this.timer = setInterval(this.update.bind(this), 50);
  }
  pause() {
    clearInterval(this.timer);
  }
  update() {
    this.currentTime += 0.05;
    if (this.currentTime > this.duration) this.reset();
    this.progress = this.currentTime / this.duration;
    this.$progress.style.transform = `translate(${this.progress * 100 - 100}%)`;
    this.$currentTime.innerText = this.formatTime(this.currentTime);
  }
  reset(duration) {
    this.pause();
    this.currentTime = 0;
    this.duration = 0;
    if (duration) {
      this.duration = duration;
      this.$duration.innerText = this.formatTime(this.duration);
    }
  }
  restart() {
    this.reset();
    this.update();
    this.start();
  }
  render() {
    this.$el.innerHTML = `<div class="currentTime time"></div>
    <div class="progress">
      <div class="bar"></div>
    </div>
    <div class="duration time"></div>
    `;
  }
  formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let second = Math.floor(seconds % 60);
    if (mins < 10) mins = "0" + mins;
    if (second < 10) second = "0" + second;
    return `${mins}:${second}`;
  }
}
