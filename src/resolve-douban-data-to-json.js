function resolveDoubanData($, dataType, data) {
  if (dataType === "watchedMovies" || dataType === "wishMovies" || dataType === "watchingMovies") {
    return resolveMovies($, data);
  } else if (dataType === "readBooks" || dataType === "wishBooks" || dataType === "readingBooks") {
    return resolveBooks($, data);
  } else if (dataType === "listenedMusics" || dataType === "wishMusics" || dataType === "listeningdMusics") {
    return resolveMusics($, data);
  } else if (dataType === "playedGames" || dataType === "wishGames" || dataType === "playingGames") {
    return resolveGames($, data);
  } else if (dataType === "movie") {
    return resolveMovie($, data);
  } else if (dataType === "book") {
    return resolveBook($, data);
  } else if (dataType === "music") {

  } else if (dataType === "app") {

  }
}

function resolveBook($, data) {
  let content = $('#content');

  data.push({
    'title': $('h1 span').text().trim(),
    'url': content.find('#mainpic a').attr('href').trim(),
    'pic': content.find('#mainpic img').attr('src').trim(),
    'intro': content.find('#link-report .intro').text().trim(),
    'rate': content.find('.rating_num').text().trim(),
  });
  return data;
}
function resolveMovie($, data) {
  let content = $('#content');

  data.push({
    'title': content.find('h1 span').text().trim(),
    'url': content.find('#mainpic a').attr('href').trim(),
    'pic': content.find('#mainpic img').attr('src').trim(),
    'intro': content.find('#link-report span').text().trim(),
    'rate': content.find('.rating_num').text().trim(),
  });
  return data;
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

    let rate = 0;
    if ($element.find('.info .rating1-t').length != 0) {
      rate = 1;
    } else if ($element.find('.info .rating2-t').length != 0) {
      rate = 2;
    } else if ($element.find('.info .rating3-t').length != 0) {
      rate = 3;
    } else if ($element.find('.info .rating4-t').length != 0) {
      rate = 4;
    } else if ($element.find('.info .rating5-t').length != 0) {
      rate = 5;
    }

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

    if (tags.length == 1 && tags[0] === "") {
      tags.splice(0, 1);
    }

    item['title'] = title.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['url'] = url.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['pic'] = pic.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['intro'] = intro.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['date'] = date
    item['comment'] = comment.replace(/\s/g, '') // replace("\n", "").replace(" ", "").replace('"', '\'')
    item['tags'] = tags
    item['rate'] = rate

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

    if (tags.length == 1 && tags[0] === "") {
      tags.splice(0, 1);
    }

    // 评论
    let comment = '';
    if ($element.find('.info .comment').length != 0) {
      comment = $element.find('.info .comment').text();
    }

    let rate = 0;
    if ($element.find('.info .rating1-t').length != 0) {
      rate = 1;
    } else if ($element.find('.info .rating2-t').length != 0) {
      rate = 2;
    } else if ($element.find('.info .rating3-t').length != 0) {
      rate = 3;
    } else if ($element.find('.info .rating4-t').length != 0) {
      rate = 4;
    } else if ($element.find('.info .rating5-t').length != 0) {
      rate = 5;
    }


    item['title'] = title.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['url'] = url.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['pic'] = pic.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['pub'] = pub.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['date'] = date
    item['comment'] = comment.replace(/\s/g, '') // replace("\n", "").replace(" ", "").replace('"', '\'')
    item['tags'] = tags
    item['rate'] = rate

    data.push(item);
  })
}

function resolveMusics($, data) {
  let musics = $('.item');

  if (musics.length == 0) {
    return true;
  }


  musics.each(function (idx, element) {

    let item = {};
    var $element = $(element);

    let url = $element.find('.pic a').attr('href');
    let pic = $element.find('.pic img').attr('src');
    let title = $element.find('.info .title a').text().trim();
    // 创作者、时间...
    let intro = $element.find('.info .intro').text();


    let date = $element.find('.info .date').text();

    let tags = '';
    if ($element.find('.info .tags').length != 0) {
      tags = $element.find('.info .tags').text();
    }
    // tags 处理
    tags = tags.replace('标签: ', ''); // 去掉前缀
    tags = tags.split(' '); // 按空格转为数组

    if (tags.length == 1 && tags[0] === "") {
      tags.splice(0, 1);
    }


    // 评论
    let comment = '';
    if ($element.find('.info li').length >= 4) {
      comment = $element.find('.info li').last().text();
    }

    let rate = 0;
    if ($element.find('.info .rating1-t').length != 0) {
      rate = 1;
    } else if ($element.find('.info .rating2-t').length != 0) {
      rate = 2;
    } else if ($element.find('.info .rating3-t').length != 0) {
      rate = 3;
    } else if ($element.find('.info .rating4-t').length != 0) {
      rate = 4;
    } else if ($element.find('.info .rating5-t').length != 0) {
      rate = 5;
    }

    item['title'] = title.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['url'] = url.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['pic'] = pic.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['intro'] = intro.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['date'] = date
    item['comment'] = comment.replace(/\s/g, '') // replace("\n", "").replace(" ", "").replace('"', '\'')
    item['tags'] = tags
    item['rate'] = rate

    data.push(item);
  })
}

function resolveGames($, data) {
  let games = $('.common-item');

  if (games.length == 0) {
    return true;
  }


  games.each(function (idx, element) {

    let item = {};
    var $element = $(element);

    let url = $element.find('.pic a').attr('href');
    let pic = $element.find('.pic img').attr('src');
    let title = $element.find('.content .title a').text().trim();
    // 创作者、时间...
    let intro = $element.find('.content .desc').text().trim();


    let date = $element.find('.content .rating-info .date').text();

    let tags = '';
    if ($element.find('.content .rating-info .tags').length != 0) {
      tags = $element.find('.content .rating-info .tags').text();
    }
    // tags 处理
    tags = tags.replace('标签: ', '').trim(); // 去掉前缀
    tags = tags.split(' '); // 按空格转为数组

    if (tags.length == 1 && tags[0] === "") {
      tags.splice(0, 1);
    }

    // 评论
    let comment = '';
    comment = $element.find('.content').children().eq(2).text();

    let rate = 0;
    if ($element.find('.content .rating-info .allstar10').length != 0) {
      rate = 1;
    } else if ($element.find('.content .rating-info .allstar20').length != 0) {
      rate = 2;
    } else if ($element.find('.content .rating-info .allstar30').length != 0) {
      rate = 3;
    } else if ($element.find('.content .rating-info .allstar40').length != 0) {
      rate = 4;
    } else if ($element.find('.content .rating-info .allstar50').length != 0) {
      rate = 5;
    }

    item['title'] = title.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['url'] = url.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['pic'] = pic.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['intro'] = intro.replace(/\s/g, '') // replace("\n", "").replace(" ", "")
    item['date'] = date
    item['comment'] = comment.replace(/\s/g, '') // replace("\n", "").replace(" ", "").replace('"', '\'')
    item['tags'] = tags
    item['rate'] = rate

    data.push(item);
  })
}

module.exports = resolveDoubanData;