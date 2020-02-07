
let createDoubanDataGetter = require('./markall-douban-data-getter-func-creater');
// 存储路径
const STORE_PATH = 'douban-data-backup/';

let getDoubanWatchedMovies = createDoubanDataGetter("watchedMovies");
let getDoubanWillMovies = createDoubanDataGetter("willMovies");
let getDoubanWatchingMovies = createDoubanDataGetter("watchingMovies");

let getDoubanReadBooks = createDoubanDataGetter("readBooks");

// getDoubanWatchedMovies("hqweay", STORE_PATH);
// getDoubanWillMovies("hqweay", STORE_PATH);
getDoubanReadBooks("hqweay", STORE_PATH);
// getDoubanWatchingMovies("hqweay", STORE_PATH);