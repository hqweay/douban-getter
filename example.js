let getWatchedMoviesBySpider = require('./markall-douban-watched-movies');
// 存储路径
const STORE_PATH = 'douban-data-backup/';

getWatchedMoviesBySpider("hqweay", STORE_PATH);
