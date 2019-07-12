(function() {
  fetch("/json/rec.json")
    .then(res => res.json())
    .then(render);

  fetch("/json/toplist.json")
    .then(res => res.json())
    .then(json => json.data.topList)
    .then(renderToplist);

  function renderToplist(listData) {
    document.querySelector(".toplistView").innerHTML = listData
      .map(
        list => `<div class="listItem">
  <div class="picture" >
      <img class="lazyload" data-src="${
        list.picUrl
      }" alt="" style="width:100px;height:100px;">
    </div>
    <div class="content">
      <div class="title">${list.topTitle}</div>
      ${songList(list.songList)}
    </div>
</div>`
      )
      .join("");
    lazyload(document.querySelectorAll(".toplistView .lazyload"));
  }
  function songList(songs) {
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

  function render(json) {
    renderSlide(json.data.slider);
    renderRadio(json.data.radioList);
    renderList(json.data.songList);
    lazyload(document.querySelectorAll(".lazyload"));
  }

  document.querySelector(".playerButton").addEventListener("click", function() {
    document.querySelector(".player").classList.remove("hide");
  });
  document.querySelector(".icon-list").addEventListener("click", function() {
    document.querySelector(".player").classList.add("hide");
  });

  let search = new Search(document.querySelector(".searchView"));
  let musicPlayer = new MusicPlayer(document.querySelector(".player"));

  function onHashChange() {
    let hash = decodeURIComponent(location.hash);
    if (/^#player\?.+/.test(hash)) {
      let matches = hash.slice(hash.indexOf("?") + 1).match(/(\w+)=([^&]+)/g);
      let response = {}
      let options = matches && matches.map(match => {
        let arr = match.split('=')
        response[arr[0]] = arr[1]
      })
      musicPlayer.play(response)
    }else{
      musicPlayer.hide()
    }
  }
  onHashChange();
  window.addEventListener("hashchange", onHashChange);

  window.player = musicPlayer;
  function renderSlide(slides) {
    slides = slides.map(slide => {
      return { link: slide.linkUrl, image: slide.picUrl };
    });
    new Slides({
      el: document.querySelector("#window"),
      slides
    });
  }
})();
function renderRadio(radios) {
  document.querySelector(".radio .list").innerHTML = radios
    .map(
      radio => `
  <div class="listItem">
  <div class="listMedia">
    <img class="lazyload" data-src="${radio.picUrl}" alt="封面">
    <span class="icon icon-play"></span>
  </div>
  <div class="listInfo">${radio.Ftitle}</div>
  </div>`
    )
    .join("");
}
function renderList(songLists) {
  document.querySelector(".hotList .list").innerHTML = songLists
    .map(
      list => `
  <div class="listItem">
  <div class="listMedia">
    <img class="lazyload" data-src="${list.picUrl}" alt="封面">
    <span class="icon icon-play"></span>
  </div>
  <div class="listInfo">${list.songListDesc}
  <div class="listAuthor">${list.songListAuthor}</div>
  </div>
  </div>`
    )
    .join("");
}
