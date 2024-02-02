#!/bin/bash

# 检测是否安装了npm，如果没有，则安装
if ! command -v npm &> /dev/null; then
    echo "npm not found，installing..."
    sudo apt update
    sudo apt install npm -y
fi

# 创建目录并进入
mkdir -p /opt/xrayr-config
cd /opt/xrayr-config
echo "About to install at /opt/xrayr-config"

# 初始化npm项目并安装依赖
npm init -y
npm install express cors

# 全局安装pm2
sudo npm install pm2 -g

# 下载yml2url.js
wget https://raw.githubusercontent.com/bytefrontiers/XrayR-config/yml2url/main/yml2url.js

echo "Starting service..."
# 使用pm2启动yml2url.js
pm2 start yml2url.js

# 设置pm2随系统启动而启动
pm2 startup && pm2 save

echo "Backend running, listening port:5909"