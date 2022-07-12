# 春秋战国历史图谱项目 [![wakatime](https://wakatime.com/badge/user/b5b6ac2c-550f-4e67-902a-a3d1fc690e9c/project/3904750b-5f53-4459-9925-cfbefab615cd.svg)](https://wakatime.com/badge/user/b5b6ac2c-550f-4e67-902a-a3d1fc690e9c/project/3904750b-5f53-4459-9925-cfbefab615cd)

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

3. 安装Apache HTTP服务器，搭建本地服务器，[下载地址](https://www.apachehaus.com/cgi-bin/download.plx)，[安装教程](https://www.php.cn/apache/427457.html)，默认开机自启服务，并将本项目拷入配置文件中DocumentRoot指向的文件夹地址

   或安装http-server包，使用Node进行安装，安装命令“npm i http-server”，使用命令“http-server [path] [options]”激活本地服务器

4. 安装Node.js版本管理服务nvm，[Windows版本链接](https://github.com/coreybutler/nvm-windows)，[安装及使用教程](https://www.runoob.com/w3cnote/nvm-manager-node-versions.html)，配置完成后即可在命令行工具内控制多个Node版本

   ```
   nvm list
   
      14.18.1
    * 12.22.7 (Currently using 64-bit executable)
      0.10.15
   ```

5. 通过nvm切换到Node V12 LTS版本，并检查是否切换成功

   ```
   node --version
   
   v12.22.7
   ```

6. 切换到本项目所在的文件目录，安装项目的依赖模块

   ```
   npm install --dependencies
   
   up to date in 0.732s
   
   8 packages are looking for funding
     run `npm fund` for details
   ```

7. 运行服务端程序，在当前目录下输入以下代码，并保证3000端口无程序占用，并保持持久化运行

   ```
   node .\backend\backupServer.js
   ```

8. 在浏览器输入以下地址，即可打开本项目

   ```
   项目主页
   http://localhost/visual-kg-histroy/web/
   知识图谱页面
   http://localhost/visual-kg-histroy/web/kg/
   ```
