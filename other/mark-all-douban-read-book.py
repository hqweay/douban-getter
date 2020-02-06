#!/usr/local/bin/python3.6
# encoding:utf-8
# 注释使用中文引入
from bs4 import BeautifulSoup
import requests
import time
import sys
import importlib
import json
importlib.reload(sys)
# utf-8 编码问题

# 配置
page_end = 100000  # 要爬多少条数据
# page_end = (page_end/15 + 1) * 15
id = 0  # 计数
user = 'hqweay'  # 豆瓣 id
file_name = "./douban-" + user + ".json"  # 数据保存文件名
sleep_time = 1000  # 爬取频率
page = -15
# --------------------------
fo = open(file_name, "w+")  # 数据写入文件 "ab+"追加,"wb+"覆盖  b 是二进制使用数据的意思
print('开始爬取...')
datas = []
item = {
    "url": "https://movie.douban.com/subject/1297052/",
    "pic": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p456692072.jpg",
    "name": "侧耳倾听/耳をすませば/心之谷/梦幻街少女",
    "intro": "1995-07-15(日本)/本名阳子/小林桂树/高山南/高桥一生/山下容莉枝/室井滋/露口茂/饭冢雅弓/加利·艾尔维斯/日本/近藤喜文/111分钟/侧耳倾听/剧情/爱情/动画/宫崎骏HayaoMiyazaki/柊葵AoiHîragi/日语/英语",
    "date": "2019-05-31",
    "comment": "干净得像猫爪一样/中学英语课本接触的乡村路",
    "oldTags": ["吉卜力", "宫崎峻", "日本", "日本动画"]
}
# 爬虫
while True:

    # 15 为一组,值为 0~15 取得同一页数据
    page += 15
    # URL
    url_str = 'https://movie.douban.com/people/' + user + '/collect?start=' + \
        str(page) + '&sort=time&rating=all&filter=all&mode=grid'
    # 获取信息
    response = requests.get(url=url_str)
    info_html = response.text
    soup = BeautifulSoup(info_html, 'html.parser')
    tag = soup.div
    movieList = soup.find_all("div", "item")  # 一页所有电影

    print(response)

    if(0 == len(movieList)):
        break
    # 测试
    # if(page > 30):
    #     break

    # 解析...
    for movie in movieList:
        id += 1
        movieItem = BeautifulSoup(str(movie), 'html.parser')
        pic = movieItem.find("div", "pic").find('img')['src']
        title = movieItem.find("li", "title").find('a').get_text()
        url = movieItem.find("li", "title").find('a')['href']
        intro = movieItem.find("li", "intro").get_text()
        date = movieItem.find("span", "date").get_text()

        tags = ""
        if movieItem.find("span", "tags") != None:
            tags = movieItem.find("span", "tags").get_text()

        comment = ""
        if movieItem.find("span", "comment") != None:
            comment = movieItem.find("span", "comment").get_text()

        tags = tags.replace("标签: ", "")  # 去掉前缀
        tags = tags.split(" ")  # 按空格转为数组

        if len(tags) == 1:
            del tags[0]

        print("第" + str(id) + "条数据...")

        # item['id'] = str(id)
        item['name'] = str(title.replace("\n", "").replace(" ", ""))
        item['url'] = str(url.replace("\n", "").replace(" ", ""))
        item['pic'] = str(pic.replace("\n", "").replace(" ", ""))
        item['intro'] = str(intro.replace("\n", "").replace(" ", ""))
        item['date'] = str(date)
        item['comment'] = str(comment.replace(
            "\n", "").replace(" ", "").replace('"', '\''))
        item['oldTags'] = tags

        newItem = item.copy()
        datas.append(newItem)
        # print(datas)


itemJson = json.dumps(datas, ensure_ascii=False)
fo.write(itemJson)
fo.close()
