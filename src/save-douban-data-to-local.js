function saveDoubanData(fs, STORE_PATH, userName, data, dataType) {
  if (dataType === "watchedMovies") {
    fs.outputJSONSync(STORE_PATH + '/' + userName + '/movie/' + 'douban-watched-movie.json', data, err => {
      console.log(err); // => null
    })
  } else if (dataType === "wishMovies") {
    fs.outputJSONSync(STORE_PATH + '/' + userName + '/movie/' + 'douban-wish-movie.json', data, err => {
      console.log(err); // => null
    })
  } else if (dataType === "watchingMovies") {
    fs.outputJSONSync(STORE_PATH + '/' + userName + '/movie/' + 'douban-watching-movie.json', data, err => {
      console.log(err); // => null
    })
  } else if (dataType === "readBooks") {
    fs.outputJSONSync(STORE_PATH + '/' + userName + '/book/' + 'douban-read-books.json', data, err => {
      console.log(err); // => null
    })
  } else if (dataType === "wishBooks") {
    fs.outputJSONSync(STORE_PATH + '/' + userName + '/book/' + 'douban-wish-books.json', data, err => {
      console.log(err); // => null
    })
  } else if (dataType === "readingBooks") {
    fs.outputJSONSync(STORE_PATH + '/' + userName + '/book/' + 'douban-reading-books.json', data, err => {
      console.log(err); // => null
    })
  } else if (dataType === "listenedMusics") {
    fs.outputJSONSync(STORE_PATH + '/' + userName + '/music/' + 'douban-listened-musics.json', data, err => {
      console.log(err); // => null
    })
  } else if (dataType === "wishMusics") {
    fs.outputJSONSync(STORE_PATH + '/' + userName + '/music/' + 'douban-wish-musics.json', data, err => {
      console.log(err); // => null
    })
  } else if (dataType === "listeningMusics") {
    fs.outputJSONSync(STORE_PATH + '/' + userName + '/music/' + 'douban-listening-musics.json', data, err => {
      console.log(err); // => null
    })
  } else if (dataType === "playedGames") {
    fs.outputJSONSync(STORE_PATH + '/' + userName + '/game/' + 'douban-played-games.json', data, err => {
      console.log(err); // => null
    })
  } else if (dataType === "wishGames") {
    fs.outputJSONSync(STORE_PATH + '/' + userName + '/game/' + 'douban-wish-games.json', data, err => {
      console.log(err); // => null
    })
  } else if (dataType === "playingGames") {
    fs.outputJSONSync(STORE_PATH + '/' + userName + '/game/' + 'douban-palying-games.json', data, err => {
      console.log(err); // => null
    })
  }
  console.log(dataType + ' 写入本地成功');
}

module.exports = saveDoubanData;