let createDoubanDataGetter = require('./src/markall-douban-data-getter-func-creater');
let saveDoubanData = require('./src/save-douban-data-to-local');
let DoubanTypeEnum = require('./src/config/doubanEnum');

module.exports = {
  createDoubanDataGetter,
  saveDoubanData,
  DoubanTypeEnum,
}