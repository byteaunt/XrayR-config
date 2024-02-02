<h1 align="center">XrayR</h1>

![](https://img.shields.io/github/stars/bytefrontiers/XrayR-config)
![](https://img.shields.io/github/forks/bytefrontiers/XrayR-config)
![](https://github.com/XrayR-project/XrayR/actions/workflows/docker.yml/badge.svg)

[English](https://github.com/bytefrontiers/XrayR-config) | [前端](https://bytefrontiers.github.io/XrayR-config/) | [yml生成下载链接](https://bytefrontiers.github.io/XrayR-config/yml2url/)

An one-click online XrayR-config file gererator.


## 免责声明

本项目只是本人个人学习开发并维护，本人不保证任何可用性，也不对使用本软件造成的任何后果负责。



# 后端部署

本项目贡献者提供了后端服务器，在此表示感谢。如果后端服务器失效，或者你希望部署自己的后端服务器，请看下面的内容。

## 一键安装

```
wget -N https://raw.githubusercontent.com/bytefrontiers/XrayR-config/main/cmd/backend_install.sh && bash backend_install.sh
```

部署完成后，需要修改 `index.html` 中 `xhr.open("POST", "https://example.com/generate", true);` 为你的服务器地址:端口; 如果你不想配置ssl证书，请修改为 `http://yourip:5909/generate`

## 手动安装

### 1. 安装NPM

首先，检查您的系统上是否已安装npm。可以通过在终端执行以下命令来检查：

```bash
npm -v
```

如果没有安装npm，使用以下命令安装：

```bash
sudo apt update
sudo apt install npm -y
```

### 2. 创建目录并初始化

创建一个新的目录`/opt/xrayr-config`用于存放项目文件：

```bash
mkdir -p /opt/xrayr-config
cd /opt/xrayr-config
npm init -y
```

### 3. 安装依赖

安装所需的NPM依赖包和PM2

```bash
npm install express cors
sudo npm install pm2 -g
```


### 4. 下载XrayR-config后端

从GitHub下载 `yml2url.js` 文件到当前目录：

```bash
wget https://raw.githubusercontent.com/bytefrontiers/XrayR-config/main/yml2url/yml2url.js
```

你也可以使用 `/backend/xrayr_command.js` ，但需要注意配置SSL证书以支持 https ，并且设置允许的白名单域名 allowedOrigins

### 5. 启动后端

使用PM2启动并应用随系统启动，监听5909端口：

```bash
pm2 start yml2url.js
pm2 startup && pm2 save
```

### 6. 修改后端服务器地址

部署完成后，需要修改 `index.html` 中 `xhr.open("POST", "https://example.com/generate", true);` 为你的服务器地址:端口; 如果你不想配置ssl证书，请修改为 `http://yourip:5909/generate`

注意放行5909端口

```bash
sudo ufw allow 5909
```

## Licence

[Mozilla Public License Version 2.0](https://github.com/bytefrontiers/XrayR-config/blob/master/LICENSE)

## Stargazers over time

[![Stargazers over time](https://starchart.cc/bytefrontiers/XrayR-config.svg)](https://starchart.cc/bytefrontiers/XrayR-config)