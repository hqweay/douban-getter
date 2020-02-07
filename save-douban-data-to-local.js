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
  }
  console.log(dataType + ' 写入本地成功');
}

module.exports = saveDoubanData;