# 简要说明

提供一个工厂方法，创建用户在豆瓣标记为电影、书籍、音乐、游戏对应的看过、在看、想看等条目的 Getter 方法。

提供一个 Save 方法，将 Getter 获取的数据保存至本地。

> 我的目标是备份豆瓣用户在豆瓣上的标记数据，而不是爬取豆瓣数据。所以获取信息的页面，我选取的是 **豆瓣标记信息列表** 的页面 **而不是条目详情页面**。
>
> 如该页面：[下一餐有折耳根想看的电影](https://movie.douban.com/people/hqweay/wish?start=15&sort=time&rating=all&filter=all&mode=grid)

# 使用

1. 引入包

   ```bash
   yarn add https://github.com/hqweay/markall-douban-backup.git
   ```

2. 使用样例

   ```javascript
   let { createDoubanDataGetter, saveDoubanData, DoubanTypeEnum } = require('markall-douban-backup');
   
   // 存储路径
   const STORE_PATH = "douban-data-backup";
   // 豆瓣帐号
   const userName = "hqweay";
   
   let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.watchedMovies);
   
   // 获取用户在豆瓣标记为想看的电影条目
   getDoubanWatchedMovies(userName, pageStart = 1, pageEnd = 2, sleepTimer = 1500).then(function (data) {
     // 数据、路径、文件名
     saveDoubanData(data, STORE_PATH + "/hqweay/movie/", "watchedMovies");
   })
   ```

# 方法说明

## createDoubanDataGetter

提供一个工厂方法，创建用户在豆瓣标记为电影、书籍、音乐、游戏对应的看过、在看、想看等条目的 Getter 方法。

### 可选参数

```javascript
// let getDoubanWatchedMovies = createDoubanDataGetter(DoubanTypeEnum.watchedMovies);
const DoubanTypeEnum = {
  "watchedMovies": "watchedMovies",
  "wishMovies": "wishMovies",
  "watchingMovies": "watchingMovies",
  "readBooks": "readBooks",
  "wishBooks": "wishBooks",
  "readingBooks": "readingBooks",
  "listenedMusics": "listenedMusics",
  "wishMusics": "wishMusics",
  "listeningMusics": "listeningMusics",
  "playedGames": "playedGames",
  "wishGames": "wishGames",
  "playingGames": "playingGames",
}
```

### 参数对应

| 电影 | 书籍 | 音乐 | 游戏 |
| ---- | ---- | ---- | ---- |
| 看过 | 读过 | 听过 | 玩过 |
| 想看 | 想读 | 想听 | 想玩 |
| 在看 | 在读 | 在听 | 在玩 |

## Getter

createDoubanDataGetter 的返回值是一个豆瓣标记数据的 Getter 函数，里面是一个 Promise，通过回调方法可以对 Getter 获取的数据进行相应处理。如：

```javascript
getDoubanWishMovies(userName, pageStart = 1, pageEnd = 2, sleepTimer = 1500).then(function (data) {
  // 数据、路径、文件名
  saveDoubanData(data, STORE_PATH + "/hqweay/movie/", "wishMovies");
})
```

### 可选参数

```javascript
getDoubanWatchedMovies(userName, pageStart = 1, pageEnd = 2, sleepTimer = 1500);
```

| 参数       | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| userName   | 豆瓣帐号                                                     |
| pageStart  | 数据获取开始页（注意：一页 15 条数据）                       |
| pageEnd    | 数据获取结束页                                               |
| sleepTimer | 爬取数据的时间间隔（**不建议修改，过快会被限制访问...**）默认为 1500（ms） |

## saveDoubanData

saveDoubanData() 是这个项目核心外的一个方法，用于将 Getter 获取的数据保存至本地。

```javascript
saveDoubanData(data, STORE_PATH = "douban-data-backup", fileName = "my-info");
```

### 参数说明

| 参数       | 说明       |
| ---------- | ---------- |
| data       | 数据       |
| STORE_PATH | 存储路径   |
| fileName   | 保存文件名 |

# 项目说明

把 [MarkAll](https://github.com/hqweay/MarkAll) 里的豆瓣爬虫抽取为插件...

## 结构

把获取豆瓣数据抽象为三步：获取页面、解析页面、数据存储。

核心是 `markall-douban-data-getter-func-creater.js`，用户可以通过该文件提供的方法创建一个 **获取某项信息的函数。**

如：

```javascript
let getDoubanWatchedMovies = createDoubanDataGetter("watchedMovies");
let getDoubanWishMovies = createDoubanDataGetter("wishMovies");
```

`markall-douban-data-getter-func-creater.js` 依赖 `get-douban-data-url.js` 、 `resolve-douban-data.js` 与 `save-douban-data-to-local.js`。

`get-douban-data-url.js`：通过参数获取豆瓣信息页面的 `url`。

`resolve-douban-data.js`：解析对应豆瓣信息页面的标签获取数据。

`save-douban-data-to.js`：备份数据的存储

**注意**：现在文件夹下的 resolve 文件是 `resolve-douban-data-to-json.js`，表示获取信息后以 JSON 格式存储。
同理，save 文件是 `save-douban-data-to-local.js`，表示存储至本地。

## 豆瓣信息页面的 URL 

可参考目录下的 `src/config/douban-data-urls.md`。

## 备份数据样例

参考 `/douban-data-backup` 下的文件。

# 开发

您可以创建自己的 `save-douban-data-to-cloud.js` 等类似文件编写上传到存储服务的逻辑。

也可以创建自己的 `resolve-douban-data-to-csv.js` 解析数据为 csv 格式保存...

也许我后面会写...

# 其它

另外，话说保存数据格式为 `JSON`，其它格式可以使用在线转换工具嘛...

比如 JSON 转 CSV ：[https://www.bejson.com/json/json2excel/](https://www.bejson.com/json/json2excel/)

# 一些问题

豆瓣读过的书籍页面直接访问 403，但是先访问用户主页，再访问读过的书籍页面就没问题。对比两个页面的请求头发现相差一个 Cookie 字段，但是——我又没登录。看样子只要有该字段就没问题，服务器没做其它啥验证。