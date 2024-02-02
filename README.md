<h1 align="center">XrayR</h1>

![](https://img.shields.io/github/stars/bytefrontiers/XrayR-config)
![](https://img.shields.io/github/forks/bytefrontiers/XrayR-config)
![](https://github.com/XrayR-project/XrayR/actions/workflows/docker.yml/badge.svg)

[简体中文](https://github.com/bytefrontiers/XrayR-config/blob/master/README-CN.md)

An one-click online XrayR-config file gererator.


## Disclaimer

This project is just my personal learning and development and maintenance. I do not guarantee any availability and is not responsible for any consequences caused by the use of this software.



# Configure Backend

Contributors provided a backend service for us. If the backend server becomes unavailable, or if you wish to deploy your own backend server, please see the document.


## 1-Click installation

```
wget -N https://raw.githubusercontent.com/bytefrontiers/XrayR-config/main/cmd/backend_install.sh && bash backend_install.sh
```

After deployment, please change `xhr.open("POST", "https://example.com/generate", true);` in `index.html` to your domain; if you do not want to configure an SSL certificate, change it to `http://yourip:5909/generate`.

## Manual installation

### 1.  Install NPM

check if npm is installed on your system by executing the following command in the terminal:

```bash
npm -v
```

If npm is not installed, use the following command to install it:

```bash
sudo apt update
sudo apt install npm -y
```

### 2. Initialize NPM Project

Create a new directory `/opt/xrayr-config` and Initialize a new NPM project:

```bash
mkdir -p /opt/xrayr-config
cd /opt/xrayr-config
npm init -y
```

### 3.  Install Dependencies

Install the required NPM dependencies:

```bash
npm install express cors
sudo npm install pm2 -g
```


### 4. ownload XrayR-config Backend Script

Download the `yml2url.js`  file from GitHub to the current directory:

```bash
wget https://raw.githubusercontent.com/bytefrontiers/XrayR-config/main/yml2url/yml2url.js
```

You can also download `/backend/xrayr_command.js` , but be sure to configure the SSL certificate to support `HTTPS` , and set the allowed whitelist domains `allowedOrigins` .

### 5.  Start Application

Configure PM2 to ensure your application starts automatically with the system, listing port:5909

```bash
pm2 start yml2url.js
pm2 startup && pm2 save
```
### 6. Configure POST address

After deployment, please change `xhr.open("POST", "https://example.com/generate", true);` in `index.html` to your domain; if you do not want to configure an SSL certificate, change it to `http://yourip:5909/generate`.

## Licence

[Mozilla Public License Version 2.0](https://github.com/bytefrontiers/XrayR-config/blob/master/LICENSE)

## Stargazers over time

[![Stargazers over time](https://starchart.cc/bytefrontiers/XrayR-config.svg)](https://starchart.cc/bytefrontiers/XrayR-config)