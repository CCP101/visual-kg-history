# 学科知识图谱学习平台项目 [![wakatime](https://wakatime.com/badge/user/b5b6ac2c-550f-4e67-902a-a3d1fc690e9c/project/6ea8c319-dedf-4be5-9ff9-5318027b2604.svg)](https://wakatime.com/badge/user/b5b6ac2c-550f-4e67-902a-a3d1fc690e9c/project/6ea8c319-dedf-4be5-9ff9-5318027b2604)

## 安装教程

1. 安装Java SDK 11，下载前需要登录Oracle账号，[下载链接](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html#license-lightbox)，[安装教程](https://www.runoob.com/java/java-environment-setup.html)，测试是否能在命令行工具调用java

   ```
   java --version

   java 17.0.1 2021-10-19 LTS
   Java(TM) SE Runtime Environment (build 17.0.1+12-LTS-39)
   Java HotSpot(TM) 64-Bit Server VM (build 17.0.1+12-LTS-39, mixed mode, sharing)
   ```
2. 打开Neo4j官网，下载社区版服务器，不要选择桌面版，[下载链接](https://neo4j.com/download-center/#community)，依照跳出的网页对Neo4j进行配置，配置完成后能在命令行工具内调用即可

   ```
   neo4j -Verbose

   详细信息: Neo4j Server Type is 'Community'
   详细信息: Neo4j Version is '4.2.11'
   详细信息: Neo4j Database Mode is ''
   ```
3. 安装Apache HTTP服务器，搭建本地服务器，[下载地址](https://www.apachehaus.com/cgi-bin/download.plx)，[安装教程](https://www.php.cn/apache/427457.html)，默认开机自启服务，并将**本项目**(Github下载后会自动在文件夹名称后添加"-master",需删除)拷入配置文件中DocumentRoot指向的文件夹地址

   或安装http-server包，使用Node进行安装，安装命令“npm i http-server”，使用命令“http-server [path] [options]”激活本地服务器
4. 安装Node.js版本管理服务nvm，[Windows版本链接](https://github.com/coreybutler/nvm-windows)，[安装及使用教程](https://www.runoob.com/w3cnote/nvm-manager-node-versions.html)，配置完成后即可在命令行工具内控制多个Node版本

   ```
   nvm list

      14.18.1
    * 12.22.7 (Currently using 64-bit executable)
      0.10.15
   ```
5. 通过nvm切换到Node V14/12 LTS版本(本软件需要使用await/async，至少需要12以上的版本)，并检查是否切换成功

   ```
   node --version

   v12.22.7
   ```
6. 切换到本项目所在的文件目录，安装PNPM包管理工具

   ```
   npm install -g pnpm
   ```
7. 切换到本项目所在的文件目录，安装项目的依赖模块

   ```
   pnpm install

   Lockfile is up to date, resolution step is skipped
   Packages: +900
   Packages are hard linked from the content-addressable store to the virtual store.
   Content-addressable store is at: D:\.pnpm-store\v3
   Virtual store is at:             node_modules/.pnpm
   Progress: resolved 900, reused 900, downloaded 0, added 900, done

   dependencies:
     + @antv/g6 4.8.7
     + @babel/runtime-corejs3 7.21.0
     + @mysql/xdevapi 8.0.32
     + cookie-parser 1.4.6
     + cors 2.8.5
     + csv 6.2.7
     + csv-parse 5.3.5
     + exceljs 4.3.0
     + express 4.18.2
     + jsencrypt 3.3.2
     + koa 2.14.1
     + koa-body 5.0.0
     + koa-bodyparser 4.3.0
     + koa-multer 1.0.2
     + koa-router 12.0.0
     + koa-session 6.4.0
     + koa2-cors 2.0.6
     + koa2-formidable 1.0.3
     + moment 2.29.4
     + mongodb 5.1.0
     + mysql 2.18.1
     + neo4j-driver 5.6.0
     + node-jsencrypt 1.0.0
     + node-rsa 1.1.1
     + uuid 9.0.0
     + webpack-dev-server 4.11.1
     + xlsx 0.18.5
        ```

## 数据导入教程

1. 在MySQL数据库中创建cq_history数据库，使用sql文件夹内的cq_history.sql文件自动导入表结构与数据（使用MySQL命令行工具或Navicat可视化工具）
2. 修改backend文件夹内的util.js文件，检查Neo4j与MySQL数据库连接密码
3. 修改backend文件夹内的dataInit.js文件，在110行后添加内容，保存并运行该文件，请提前将CSV文件放在指定位置或修改路径，查看数据库及/data/json路径确认是否写入成功

   ```
   ImportDataToNeo4j()
   ```

## 运行教程

1. 运行服务端程序，在当前目录下输入以下代码，并保证3000端口无程序占用，并保持持久化运行

   ```
   node .\backend\backupServer.js
   ```
2. 在浏览器输入以下地址，即可打开本项目

   ```
   项目主页
   http://localhost/visual-kg-history/web/
   知识图谱页面
   http://localhost/visual-kg-history/web/kg/
   ```

   项目首次启动后服务端需要显示公匙后才能操作，每次服务器重启时前端页面应亦进行清空缓存的刷新
