"use strict";
const fs = require('fs-extra');
const superagent = require('superagent');
const cheerio = require('cheerio');
const url = require('url');


const getUrl = require('./get-douban-data-url');
const resolveDoubanData = require('./resolve-douban-data-to-json');
const saveDoubanData = require('./save-douban-data-to-local');
const userAgents = require('./config/userAgents')
const cookies = require('./config/cookies')

// 配置
const sleepTimer = 1500;


// dataType : 看过电影、在看影视、想看电影...
function createDoubanDataGetter(dataType) {

  return function getDoubanData(userName, STORE_PATH, endItemsCount = 999999, sleepTimer = 1500) {

    // 书籍初始化

    // superagent.get('https://book.douban.com/people/hqweay/')
    //   .end(function (err, sres) {
    //   })

    return new Promise(function (resolve, reject) {
      let data = [];
      let user = userName; // "hqweay";
      let page = -15;
      let flag = false;

      console.log('开始爬取...');

      var s = setInterval(function () {
        page += 15;
        var cnodeUrl = getUrl(dataType, user, page);

        console.log('正在获取第 ' + page + ' 条数据...');

        let userAgent = userAgents[parseInt(Math.random() * userAgents.length)];
        let cookie = cookies[parseInt(Math.random() * cookies.length)];

        superagent.get(cnodeUrl)
          .set({
            'User-Agent': userAgent,
            'Cookie': cookie
          })
          .end(function (err, sres) {

            if (err) {
              console.log('请求页面信息出错： ' + err);
            }

            var $ = cheerio.load(sres.text);

            // 手动停止方便调试
            if (page >= endItemsCount - 15) {
              flag = true;
            }

            if (resolveDoubanData($, dataType, data) === true) {
              flag = true;
            }
          });// end superagent.end()


        if (flag === true) {
          clearInterval(s);
          console.log('爬取结束..');

          // fs.outputJSONSync(STORE_PATH + userName + '-douban-watched-movie.json', data, err => {
          //   console.log(err); // => null
          // })
          // console.log('写入本地成功');

          saveDoubanData(fs, STORE_PATH, userName, data, dataType);

          resolve();
        }

      }, sleepTimer);// end superagent end
    });// end setInterval
  }
}






module.exports = createDoubanDataGetter;