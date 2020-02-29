
let createDoubanDataGetter = require('./src/douban-data-getter-func-creater');
let saveDoubanData = require('./src/save-douban-data-to-local');
let DoubanTypeEnum = require('./src/config/doubanEnum');

// 存储文件夹路径
const STORE_PATH = 'douban-data-backup';
// 豆瓣帐号
const userName = "hqweay";

let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.watchedMovies);
let getDoubanWishMovies = createDoubanDataGetter(DoubanTypeEnum.wishMovies);
let getDoubanWatchingMovies = createDoubanDataGetter(DoubanTypeEnum.watchingMovies);

let getDoubanReadBooks = createDoubanDataGetter(DoubanTypeEnum.readBooks);
let getDoubanWishBooks = createDoubanDataGetter(DoubanTypeEnum.wishBooks);
let getDoubanReadingBooks = createDoubanDataGetter(DoubanTypeEnum.readingBooks);


let getDoubanListenedMusics = createDoubanDataGetter(DoubanTypeEnum.listenedMusic);
let getDoubanWishMusics = createDoubanDataGetter(DoubanTypeEnum.wishMusics);
let getDoubanListeningMusics = createDoubanDataGetter(DoubanTypeEnum.listeningMusics);

let getDoubanPlayedGames = createDoubanDataGetter(DoubanTypeEnum.playedGames);
let getDoubanWishGames = createDoubanDataGetter(DoubanTypeEnum.wishGames);
let getDoubanPlayingGames = createDoubanDataGetter(DoubanTypeEnum.playingGames);


getDoubanWishMovies(userName, pageStart = 1, pageEnd = 2, sleepTimer = 1500).then(function (data) {
  // 数据、路径、文件名
  saveDoubanData(data, STORE_PATH + "/hqweay/movie/", "wishMovies");
})

// getDoubanWishMovies(userName, pageStart = 1, pageEnd = 1, sleepTimer = 1500).then(function (data) {

//   console.log("sssssss");
// });
