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
  } else if (dataType === "readingBooks") {
    return 'https://book.douban.com/people/'
      + user
      + '/do?start='
      + page
      + '&sort=time&rating=all&filter=all&mode=grid'
  } else if (dataType === "listenedMusics") {
    return 'https://music.douban.com/people/'
      + user
      + '/collect?start='
      + page
      + '&sort=time&rating=all&filter=all&mode=grid'
  } else if (dataType === "wishMusics") {
    return 'https://music.douban.com/people/'
      + user
      + '/wish?start='
      + page
      + '&sort=time&rating=all&filter=all&mode=grid'
  } else if (dataType === "listeningMusics") {
    return 'https://music.douban.com/people/'
      + user
      + '/do?start='
      + page
      + '&sort=time&rating=all&filter=all&mode=grid'
  } else if (dataType === "playedGames") {
    return 'https://www.douban.com/people/'
      + user
      + '/games?action=collect&start='
      + page
  } else if (dataType === "wishGames") {
    return 'https://www.douban.com/people/'
      + user
      + '/games?action=wish&start='
      + page
  } else if (dataType === "playingGames") {
    return 'https://www.douban.com/people/'
      + user
      + '/games?action=do&start='
      + page
  }
}

module.exports = getUrl;