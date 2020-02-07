function saveDoubanData(fs, STORE_PATH, userName, data, dataType) {
  if (dataType === "watchedMovies") {
    fs.outputJSONSync(STORE_PATH + '/' + userName + '/' + 'douban-watched-movie.json', data, err => {
      console.log(err); // => null
    })
  } else if (dataType === "willMovies") {
    fs.outputJSONSync(STORE_PATH + '/' + userName + '/' + 'douban-will-movie.json', data, err => {
      console.log(err); // => null
    })
  } else if (dataType === "watchingMovies") {
    fs.outputJSONSync(STORE_PATH + '/' + userName + '/' + 'douban-watching-movie.json', data, err => {
      console.log(err); // => null
    })
  }
  console.log(dataType + ' 写入本地成功');
}

module.exports = saveDoubanData;