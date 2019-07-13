  import './tabs.js'
  import {Search} from './search.js'
  import {Recommend} from './recommend.js'
  import {Toplist} from './toplist.js'
  import {MusicPlayer} from './musicPlayer.js'

let toplist = new Toplist(document.querySelector('.toplistView')).launch()
let recommend = new Recommend(document.querySelector('.commentView')).launch()
let search = new Search(document.querySelector(".searchView"));
let musicPlayer = new MusicPlayer(document.querySelector(".player"));


  document.querySelector(".playerButton").addEventListener("click", function() {
    document.querySelector(".player").classList.remove("hide");
  });
  document.querySelector(".icon-list").addEventListener("click", function() {
    document.querySelector(".player").classList.add("hide");
  });

  onHashChange();
  addEventListener("hashchange", onHashChange);

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
 

