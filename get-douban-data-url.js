function getUrl(dataType, user, page) {
  if (dataType === "watchedMovies") {
    return 'https://movie.douban.com/people/'
      + user
      + '/collect?start='
      + page
      + '&sort=time&rating=all&filter=all&mode=grid';
  } else if (dataType === "wishMovies") {
    return 'https://movie.douban.com/people/'
      + user
      + '/wish?start='
      + page
      + '&sort=time&rating=all&filter=all&mode=grid'
  } else if (dataType === "watchingMovies") {
    return 'https://movie.douban.com/people/'
      + user
      + '/do?start='
      + page
      + '&sort=time&rating=all&filter=all&mode=grid'
  } else if (dataType === "readBooks") {
    return 'https://book.douban.com/people/'
      + user
      + '/collect?start='
      + page
      + '&sort=time&rating=all&filter=all&mode=grid'
  } else if (dataType === "wishBooks") {
    return 'https://book.douban.com/people/'
      + user
      + '/wish?start='
      + page
      + '&sort=time&rating=all&filter=all&mode=grid'
  }
}

module.exports = getUrl;