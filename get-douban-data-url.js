function getUrl(dataType, user, page) {
  if (dataType === "watchedMovies") {
    return 'https://movie.douban.com/people/'
      + user
      + '/collect?start='
      + page
      + '&sort=time&rating=all&filter=all&mode=grid';
  }
}

module.exports = getUrl;