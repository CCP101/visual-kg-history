# 春秋战国历史图谱项目

## 安装教程

1. 安装Java SDK 11，下载前需要登录Oracle账号，[下载链接](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html#license-lightbox)，安装完成后测试是否能在命令行工具调用java

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

3. 安装Apache HTTP服务器，搭建本地服务器，[下载地址](https://www.apachehaus.com/cgi-bin/download.plx)，安装方法及参数配置请参考其他资料，默认开机自启服务，并将本项目拷入配置文件中DocumentRoot指向的文件夹地址

4. 安装Node.js版本管理服务nvm，[Windows版本链接](https://github.com/coreybutler/nvm-windows)，[源代码链接](https://github.com/nvm-sh/nvm)，使用方法及换源方法请参考其他资料，配置完成后即可在命令行工具内控制多个Node版本

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

6. 切换到项目目录，安装项目的依赖模块

   ```
   npm install --dependencies
   
   up to date in 0.732s
   
   8 packages are looking for funding
     run `npm fund` for details
   ```

7. 运行服务端程序，在当前目录下输入以下代码，并保证3000端口无程序占用

   ```
   node .\backend\backupserver.js
   ```

8. 在浏览器输入以下地址，即可打开本项目

   ```
   http://localhost/visual-kg-histroy/
   ```
