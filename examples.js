
let createDoubanDataGetter = require('./src/markall-douban-data-getter-func-creater');

// 存储文件夹路径
const STORE_PATH = 'douban-data-backup';
// 豆瓣帐号
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



const saveDoubanData = require('./src/save-douban-data-to-local');

getDoubanListenedMusics(userName, pageStart = 1, pageEnd = 2, sleepTimer = 1500).then(function (data) {
  // 数据、路径、文件名
  saveDoubanData(data, STORE_PATH + "/hqweay/music/", "listenedMusics");
})
