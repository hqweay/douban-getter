let { createDoubanDataGetter, getDoubanItemInfo } = require('./src/douban-data-getter-func-creater');
let saveDoubanData = require('./src/save-douban-data-to-local');
let DoubanTypeEnum = require('./src/config/doubanEnum');

module.exports = {
  createDoubanDataGetter,
  getDoubanItemInfo,
  saveDoubanData,
  DoubanTypeEnum,
}