"use strict";
const superagent = require('superagent');
const cheerio = require('cheerio');
// const url = require('url');

const getUrl = require('./get-douban-data-url');
const resolveDoubanData = require('./resolve-douban-data-to-json');
const userAgents = require('./config/userAgents')
const cookies = require('./config/cookies')



// dataType : 看过电影、在看影视、想看电影...
function createDoubanDataGetter(dataType) {

  return function getDoubanData(userName, pageStart = 1, pageEnd = 2, sleepTimer = 1500) {

    return new Promise(function (resolve, reject) {
      let data = [];
      let user = userName; // "hqweay";
      let page = pageStart * 15 - 30;
      let flag = false;

      console.log('开始爬取...');


      var s = setInterval(function () {
        page += 15;
        var cnodeUrl = getUrl(dataType, user, page);

        console.log('正在获取第 ' + (page + 15) / 15 + ' 页数据...');

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

            // 停止
            if (page >= pageEnd * 15 - 30) {
              flag = true;
            }

            if (resolveDoubanData($, dataType, data) === true) {
              flag = true;
            }
          });// end superagent.end()


        if (flag === true) {
          clearInterval(s);
          console.log('爬取结束..');
          resolve(data);
        }

      }, sleepTimer);// end setInterval

    });
  }
}






module.exports = createDoubanDataGetter;