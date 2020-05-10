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


      console.log(dataType + ' 开始爬取...');

      let interval = setInterval(function () {
        page += 15;
        var cnodeUrl = getUrl(dataType, user, page);
        if (flag === false) {
          console.log(dataType + ' 请求第 ' + (page + 15) / 15 + ' 页数据...');
        }

        let userAgent = userAgents[parseInt(Math.random() * userAgents.length)];
        let cookie = cookies[parseInt(Math.random() * cookies.length)];

        superagent.get(cnodeUrl)
          .set({
            'User-Agent': userAgent,
            'Cookie': cookie
          }).timeout({
            response: 10000
          })
          .end(function (err, res) {

            if (err) {
              if (err.timeout) {
                console.log("请求超时，请检查网络：" + err);
              } else {
                console.log('请求页面信息出错： ' + err);
              }
            }

            var $ = cheerio.load(res.text);
            console.log(dataType + ' 解析第 ' + (page + 15) / 15 + ' 页数据...');
            if (resolveDoubanData($, dataType, data) === true) {
              // 请求页面已无条目数据
              flag = true;
              resolve(flag);
            }

            if (flag === true || page >= pageEnd * 15 - 15) {
              // clearInterval(s);
              // 用 this 的话，setInterval(function () {}) 调用时不能用箭头函数哦
              // clearInterval(this);
              console.log('数据获取结束...');
              resolve(data);
            }

          });// end superagent.end()

        if (flag === true || page >= pageEnd * 15 - 15) {
          //clearInterval(this);
          clearInterval(interval);
	  console.log("正在请求，等待获取数据...");
        }

      }, sleepTimer);// end setInterval

    });
  }
}






module.exports = createDoubanDataGetter;
