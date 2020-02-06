# 豆瓣数据备份

## 已完成

- [x] 电影—看过

## 待施工

- [ ] 电影—想看
- [ ] 书籍—看过
- [ ] 书籍—想看
- [ ] 音乐—听过
- [ ] 音乐—想听
- [ ] 游戏—玩过
- [ ] 游戏—想玩
- [ ] ...

# 说明

从 [MarkAll](https://github.com/hqweay/MarkAll) 中把豆瓣爬虫抽取为插件。

# 使用

执行 `yarn` 或 `npm` 导入依赖，在 `NodeJS` 环境执行。

## 样例

```javascript
// 参考 example.js
let getWatchedMoviesBySpider = require('./mark-all-douban-watched-movie');
// 存储路径
const STORE_PATH = 'douban-data-backup/';
// 豆瓣 id，存储路径
getWatchedMoviesBySpider("hqweay", STORE_PATH);
```

## 效果

参考 `/douban-data-backup` 下的文件。

保存数据格式为 `JSON`，其它格式可以使用在线转换工具。

## 转换工具

[https://www.bejson.com/json/json2excel/](https://www.bejson.com/json/json2excel/)