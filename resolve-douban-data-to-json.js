function resolveDoubanData($, dataType, data) {
  if (dataType === "watchedMovies" || dataType === "willMovies" || dataType === "watchingMovies") {

    return resolveMovies($, data);

  } else if (dataType === "readBooks") {
    return resolveBooks($, data, flag);
  }
}


function resolveMovies($, data) {
  let items = $('.item');

  if (items.length == 0) {
    return true;
  }


  items.each(function (idx, element) {

    let item = {};
    var $element = $(element);

    let url = $element.find('.pic a').attr('href');
    let pic = $element.find('.pic img').attr('src');
    let title = $element.find('.info .title a').text();
    let intro = $element.find('.info .intro').text();
    let date = $element.find('.info .date').text();
    let tags = '';

    if ($element.find('.info .tags').length != 0) {
      tags = $element.find('.info .tags').text();
    }

    let comment = '';

    if ($element.find('.info .comment').length != 0) {
      comment = $element.find('.info .comment').text();
    }

    // tags 处理
    tags = tags.replace('标签: ', ''); // 去掉前缀
    tags = tags.split(' '); // 按空格转为数组

    if (tags.length == 1) {
      tags.splice(0, 1);
    }

    item['name'] = title.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['url'] = url.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['pic'] = pic.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['intro'] = intro.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['date'] = date
    item['comment'] = comment.replace(/\s/g, '') // replace("\n", "").replace(" ", "").replace('"', '\'')
    item['oldTags'] = tags

    data.push(item);
  })
}

function resolveBooks($, data, flag) { }

module.exports = resolveDoubanData;