# 学科知识图谱学习平台项目 [![wakatime](https://wakatime.com/badge/user/b5b6ac2c-550f-4e67-902a-a3d1fc690e9c/project/6ea8c319-dedf-4be5-9ff9-5318027b2604.svg)](https://wakatime.com/badge/user/b5b6ac2c-550f-4e67-902a-a3d1fc690e9c/project/6ea8c319-dedf-4be5-9ff9-5318027b2604)

## 安装教程

1. 安装Java SDK 11，下载前需要登录Oracle账号，[下载链接](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html#license-lightbox)，[安装教程](https://www.runoob.com/java/java-environment-setup.html)，测试是否能在命令行工具调用java

   ```bash
   java --version
   
   java 17.0.1 2021-10-19 LTS
   Java(TM) SE Runtime Environment (build 17.0.1+12-LTS-39)
   Java HotSpot(TM) 64-Bit Server VM (build 17.0.1+12-LTS-39, mixed mode, sharing)
   ```

2. 打开Neo4j官网，下载社区版服务器，不要选择桌面版，[下载链接](https://neo4j.com/download-center/#community)，依照跳出的网页对Neo4j进行配置，配置完成后能在命令行工具内调用即可

   ```bash
   neo4j -Verbose
   
   详细信息: Neo4j Server Type is 'Community'
   详细信息: Neo4j Version is '4.2.11'
   详细信息: Neo4j Database Mode is ''
   ```

3. 安装MySQL数据库，本系统默认使用MySQL8进行开发，[下载链接](https://dev.mysql.com/downloads/installer/)，安装方法不再赘述

   **注意：** 本系统在MySQL8环境下开发，目前已知MySQL5不支持8的utf8mb4_0900_ai_ci字符集，必须全部更换后运行

4. 安装Apache HTTP服务器，搭建本地服务器，[下载地址](https://www.apachehaus.com/cgi-bin/download.plx)，[安装教程](https://www.php.cn/apache/427457.html)，默认开机自启服务，并将**本项目**(Github下载后会自动在文件夹名称后添加"-master",需删除)拷入配置文件中DocumentRoot指向的文件夹地址

   或安装http-server包，使用Node进行安装，安装命令“npm i http-server”，使用命令“http-server [path] [options]”激活本地服务器

5. 安装Node.js版本管理服务nvm，[Windows版本链接](https://github.com/coreybutler/nvm-windows)，[安装及使用教程](https://www.runoob.com/w3cnote/nvm-manager-node-versions.html)，配置完成后即可在命令行工具内控制多个Node版本

   ```bash
   nvm list
   
      14.18.1
    * 12.22.7 (Currently using 64-bit executable)
      0.10.15
   ```

6. 通过nvm切换到Node V18/16 LTS版本(本软件需要使用await/async，并开启对ESLint的支持，至少需要16以上的版本)，并检查是否切换成功

   ```bash
   node --version
   
   v18.14.0
   ```

7. 切换到本项目所在的文件目录，安装PNPM包管理工具

   ```bash
   npm install -g pnpm
   ```

8. 切换到本项目所在的文件目录，安装项目的依赖模块

   ```bash
   pnpm install
   
   Lockfile is up to date, resolution step is skipped
   Packages: +900
   Packages are hard linked from the content-addressable store to the virtual store.
   Content-addressable store is at: D:\.pnpm-store\v3
   Virtual store is at:             node_modules/.pnpm
   Progress: resolved 900, reused 900, downloaded 0, added 900, done
   ```

## 数据导入教程

1. 在MySQL数据库中创建cq_history数据库，使用sql文件夹内的cq_history.sql文件自动导入表结构与数据（使用MySQL命令行工具或Navicat可视化工具）
2. 修改backend文件夹内的util.js文件，检查Neo4j与MySQL数据库连接密码
3. 新建data文件夹，并新建二级文件夹json，考入系统所需要的三元组信息及节点信息
4. 运行代码以自动将数据导入系统

   ```bash
   cd .\backend\
   node .\dataInit.js
   ```

**注意：** 因为部分代码依赖于相对路径，如果以 `node .\backend\dataInit.js` 的方式运行代码会导致运行过程中出错

## 运行教程

1. 运行服务端程序，在当前目录下输入以下代码，并保证3000端口无程序占用，保持持久化运行

   ```bash
   node .\backupServer.js
   ```

2. 在浏览器输入以下地址，即可打开本项目

   ```bash
   项目主页
   http://localhost/visual-kg-history/web/
   知识图谱页面
   http://localhost/visual-kg-history/web/kg/
   ```

   项目首次启动后服务端需要显示公匙后才能操作，每次服务器重启时前端页面应亦进行清空缓存的刷新

## 测试系统运行教程

目前系统不对用户身份进行识别区分，但已预埋设置以供后期改造优化

用户登录后打开页面进行试卷上传，试卷格式见 `SaveData.js` 文件中的 `quizSavetoSQL`函数

```
http://localhost/visual-kg-history/web/examUpload.html
```

目前系统默认将所有的测试分配给用户，等待优化
