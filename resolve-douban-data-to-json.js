function resolveDoubanData($, dataType, data) {
  if (dataType === "watchedMovies" || dataType === "wishMovies" || dataType === "watchingMovies") {

    return resolveMovies($, data);

  } else if (dataType === "readBooks" || dataType === "wishBooks" || dataType === "readingBooks") {
    return resolveBooks($, data);
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

function resolveBooks($, data) {
  let books = $('.subject-item');

  if (books.length == 0) {
    return true;
  }


  books.each(function (idx, element) {

    let item = {};
    var $element = $(element);

    let url = $element.find('.pic a').attr('href');
    let pic = $element.find('.pic img').attr('src');
    let title = $element.find('.info h2 a').text();
    // 作者，出版社，出版时间，
    let pub = $element.find('.info .pub').text();
    // 2020-02-05 读过
    let dateAndStatus = $element.find('.info .short-note .date').text();
    let date = dateAndStatus.replace(' 读过', '').trim(); // 去掉前缀

    let tags = '';
    if ($element.find('.info .tags').length != 0) {
      tags = $element.find('.info .tags').text();
    }
    // tags 处理
    tags = tags.replace('标签: ', ''); // 去掉前缀
    tags = tags.split(' '); // 按空格转为数组
    if (tags.length == 1) {
      tags.splice(0, 1);
    }


    // 评论
    let comment = '';
    if ($element.find('.info .comment').length != 0) {
      comment = $element.find('.info .comment').text();
    }



    item['title'] = title.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['url'] = url.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['pic'] = pic.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['pub'] = pub.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['date'] = date
    item['comment'] = comment.replace(/\s/g, '') // replace("\n", "").replace(" ", "").replace('"', '\'')
    item['oldTags'] = tags

    data.push(item);
  })
}

module.exports = resolveDoubanData;