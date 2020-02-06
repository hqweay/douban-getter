"use strict";
const fs = require('fs-extra');
const superagent = require('superagent');
const cheerio = require('cheerio');
const url = require('url');

/**
 * 
 * @param {*} userName 豆瓣账户 id
 * @param {*} STORE_PATH 存储路径
 */
function getWatchedMoviesBySpider(userName, STORE_PATH) {
  return new Promise(function (resolve, reject) {
    let data = []
    // let item = {};
    let user = userName // "hqweay";
    let page = -15
    // let id = 0;
    let flag = false

    console.log('开始爬取...')

    // var exec = new Promise(function (resolve, reject) {
    // id++;  await

    var s = setInterval(function () {
      page += 15
      var cnodeUrl = 'https://movie.douban.com/people/' + user + '/collect?start=' +
        page + '&sort=time&rating=all&filter=all&mode=grid'
      console.log('正在获取第 ' + page + ' 条数据...')
      superagent.get(cnodeUrl)
        .end(function (err, sres) {
          // 常规的错误处理
          if (err) {
            console.log(err)
          }
          var $ = cheerio.load(sres.text)

          let items = $('.item')
          if (items.length == 0) {
            flag = true
          }

          // 手动停止方便调试
          // if (page >= 30) {
          //   flag = true;
          // }

          items.each(function (idx, element) {
            let item = {}
            var $element = $(element)
            let url = $element.find('.pic a').attr('href')
            let pic = $element.find('.pic img').attr('src')
            let title = $element.find('.info .title a').text()
            let intro = $element.find('.info .intro').text()
            let date = $element.find('.info .date').text()
            let tags = ''
            if ($element.find('.info .tags').length != 0) {
              tags = $element.find('.info .tags').text()
            }
            let comment = ''
            if ($element.find('.info .comment').length != 0) {
              comment = $element.find('.info .comment').text()
            }

            // tags 处理
            tags = tags.replace('标签: ', '') // 去掉前缀
            tags = tags.split(' ') // 按空格转为数组

            if (tags.length == 1) {
              tags.splice(0, 1)
            }

            item['name'] = title.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
            item['url'] = url.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
            item['pic'] = pic.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
            item['intro'] = intro.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
            item['date'] = date
            item['comment'] = comment.replace(/\s/g, '') // replace("\n", "").replace(" ", "").replace('"', '\'')
            item['oldTags'] = tags
            data.push(item)
          })
        })
      if (flag === true) {
        clearInterval(s)
        console.log('爬取结束..')

        fs.outputJSONSync(STORE_PATH + userName + '-douban-watched-movie.json', data, err => {
          console.log(err) // => null
        })
        console.log('写入本地成功')
        resolve()
      }
    }, 1000)

    // console.log("结束表示")
  })
}
module.exports = getWatchedMoviesBySpider;