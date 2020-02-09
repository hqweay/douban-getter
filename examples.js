
let createDoubanDataGetter = require('./src/markall-douban-data-getter-func-creater');
// 存储文件夹路径
const STORE_PATH = 'douban-data-backup';
const userName = "hqweay";

let getDoubanWatchedMovies = createDoubanDataGetter("watchedMovies");
let getDoubanWishMovies = createDoubanDataGetter("wishMovies");
let getDoubanWatchingMovies = createDoubanDataGetter("watchingMovies");

let getDoubanReadBooks = createDoubanDataGetter("readBooks");
let getDoubanWishBooks = createDoubanDataGetter("wishBooks");
let getDoubanReadingBooks = createDoubanDataGetter("readingBooks");


let getDoubanListenedMusics = createDoubanDataGetter("listenedMusics");
let getDoubanWishMusics = createDoubanDataGetter("wishMusics");
let getDoubanListeningMusics = createDoubanDataGetter("listeningMusics");

let getDoubanPlayedGames = createDoubanDataGetter("playedGames");
let getDoubanWishGames = createDoubanDataGetter("wishGames");
let getDoubanPlayingGames = createDoubanDataGetter("playingGames");

// getDoubanWatchedMovies(userName, 15);
// getDoubanWishMovies(userName);
// getDoubanWatchingMovies(userName);


// getDoubanReadBooks(userName);
// getDoubanWishBooks(userName);
// getDoubanReadingBooks(userName);

// getDoubanListenedMusics(userName);
// getDoubanWishMusics(userName);
// getDoubanListeningMusics(userName);

// getDoubanPlayedGames(userName);
// getDoubanWishGames(userName);
// getDoubanPlayingGames(userName, 30, 6000);


const saveDoubanData = require('./src/save-douban-data-to-local');

getDoubanWatchedMovies(userName, 15).then(function (data) {
  console.log(data);
  saveDoubanData(STORE_PATH, data, "watchedMovies", userName);
})

// saveDoubanData(STORE_PATH, data, dataType, userName = "my")