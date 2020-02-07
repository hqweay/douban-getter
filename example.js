
let createDoubanDataGetter = require('./markall-douban-data-getter-func-creater');
// 存储路径
const STORE_PATH = 'douban-data-backup/';

let getDoubanWatchedMovies = createDoubanDataGetter("watchedMovies");
let getDoubanWishMovies = createDoubanDataGetter("wishMovies");
let getDoubanWatchingMovies = createDoubanDataGetter("watchingMovies");

let getDoubanReadBooks = createDoubanDataGetter("readBooks");
let getDoubanWishBooks = createDoubanDataGetter("wishBooks");
let getDoubanReadingBooks = createDoubanDataGetter("readingBooks");


let getDoubanListenedMusics = createDoubanDataGetter("listenedMusics");
let getDoubanWishMusics = createDoubanDataGetter("wishMusics");
let getDoubanListeningMusics = createDoubanDataGetter("listeningMusics");

// getDoubanWatchedMovies("hqweay", STORE_PATH);
// getDoubanWishMovies("hqweay", STORE_PATH);
// getDoubanWatchingMovies("hqweay", STORE_PATH);


getDoubanReadBooks("hqweay", STORE_PATH);
// getDoubanWishBooks("hqweay", STORE_PATH);
// getDoubanReadingBooks("hqweay", STORE_PATH);

// getDoubanListenedMusics("hqweay", STORE_PATH);
// getDoubanWishMusics("hqweay", STORE_PATH);
// getDoubanListeningMusics("hqweay", STORE_PATH);