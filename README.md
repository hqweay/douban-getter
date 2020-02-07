# 简要说明

提供一个工厂方法，创建电影、书籍、音乐、游戏对应的看过、在看、想看等条目的 Getter 方法。

# 豆瓣标记数据备份

我的目标是备份豆瓣用户在豆瓣上的标记数据，而不是爬取豆瓣数据。所以获取信息的页面，我选取的是 **豆瓣标记信息列表** 的页面 **而不是条目详情页面**。

如该页面：[下一餐有折耳根想看的电影](https://movie.douban.com/people/hqweay/wish?start=15&sort=time&rating=all&filter=all&mode=grid)

## 使用

1. 引入包

   ```bash
   yarn add https://github.com/hqweay/markall-douban-backup.git
   ```

2. 使用

   ```javascript
   let createDoubanDataGetter = require('markall-douban-backup');
   
   // 存储路径
   const STORE_PATH = "douban-data-backup/";
   // 豆瓣帐号
   const user = "hqweay";
   
   let getDoubanWatchedMovies = createDoubanDataGetter("watchedMovies");
   
   // 获取用户在豆瓣标记为看过的电影条目
   getDoubanWatchedMovies(user, STORE_PATH);
   ```

3. Getter 的可选参数

   ```javascript
   getDoubanWatchedMovies(userName, STORE_PATH, endItemsCount = 999999, sleepTimer = 1500) 
   ```

| 参数          | 说明                                                         |
| ------------- | ------------------------------------------------------------ |
| userName      | 豆瓣帐号                                                     |
| STORE_PATH    | 存储文件夹路径                                               |
| endItemsCount | 爬取条目的数目（因为条目页面是每页 15 条数据，所以爬取数目也只能以 15 的倍数控制...）默认为一个极大值 999999，表示爬取所有数据。 |
| sleepTimer    | 爬取数据的时间间隔（不建议修改，过快会被限制访问...）默认为 1500（ms） |

## createDoubanDataGetter 可以使用的参数

```javascript
let getDoubanWatchedMovies = createDoubanDataGetter("watchedMovies");
let getDoubanWishMovies = createDoubanDataGetter("wishMovies");
let getDoubanWatchingMovies = createDoubanDataGetter("watchingMovies");

let getDoubanReadBooks = createDoubanDataGetter("readBooks");
let getDoubanWishBooks = createDoubanDataGetter("wishBooks");
let getDoubanReadingBooks = createDoubanDataGetter("readingBooks");


let getDoubanListenedMusics = createDoubanDataGetter("listenedMusics");
let getDoubanWishMusics = createDoubanDataGetter("wishMusics");
let getDoubanListeningMusics = createDoubanDataGetter("listeningMusics");

let getDoubanPlayedGames = createDoubanDataGetter("playedGames");
let getDoubanWishGames = createDoubanDataGetter("wishGames");
let getDoubanPlayingGames = createDoubanDataGetter("playingGames");
```

## 参数对应

### 影视

- [x] 电影—看过
- [x] 电影—想看
- [x] 影视—在看

### 书籍

- [x] 书籍—读过
- [x] 书籍—想读
- [x] 书籍—在读

### 音乐

- [x] 音乐—听过
- [x] 音乐—想听
- [x] 音乐—在听

### 游戏

- [x] 游戏—玩过
- [x] 游戏—想玩
- [x] 游戏—在玩

# 项目说明

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

# 其它

本来目的是想把 [MarkAll](https://github.com/hqweay/MarkAll) 里的豆瓣爬虫抽取为插件...

另外，话说保存数据格式为 `JSON`，其它格式可以使用在线转换工具嘛...

比如 JSON 转 CSV ：[https://www.bejson.com/json/json2excel/](https://www.bejson.com/json/json2excel/)

# 一些问题

豆瓣读过的书籍页面直接访问 403，但是先访问用户主页，再访问读过的书籍页面就没问题。对比两个页面的请求头发现相差一个 Cookie 字段，但是——我又没登录。看样子只要有该字段就没问题，服务器没做其它啥验证。