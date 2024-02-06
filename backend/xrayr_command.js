// 这个版本需要注意配置SSL证书以支持 https ，并且设置允许的白名单域名 allowedOrigins
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5908;

// 自定义CORS中间件
app.use((req, res, next) => {
    // 允许的域名列表，区分 http 和 https
    const allowedOrigins = ['https://byteaunt.github.io'];

    const origin = req.headers.origin;

    // 检查请求的来源是否在允许的列表中
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

    next();
});

// 使用express.static中间件服务静态文件
app.use('/xrayr', express.static('upload'));

app.use(express.text());

app.post('/generate', (req, res) => {
    const yamlContent = req.body;
    // 使用时间戳作为唯一ID
    const uniqueId = Date.now();
    const dirPath = path.join(__dirname, 'upload', uniqueId.toString());
    fs.mkdirSync(dirPath, { recursive: true });
    const filePath = path.join(dirPath, 'config.yml');

    fs.writeFile(filePath, yamlContent, (err) => {
        if (err) {
            console.error('File writing error:', err);
            return res.status(500).send('Error generating the file.');
        }
        // 生成并返回下载链接，包含唯一ID和固定的文件名
        // 需要注意配置SSL证书以支持 https，否则请改为http
        res.send({ link: `https://${req.headers.host}/xrayr/${uniqueId}/config.yml` });
    });
});

// 提供下载文件的GET路由
app.get('/xrayr/:uniqueId/config.yml', (req, res) => {
    const { uniqueId } = req.params;
    const dirPath = path.join(__dirname, 'upload', uniqueId, 'config.yml');
    res.download(dirPath, uniqueId, (err) => {
        if (err) {
            console.error('Download error:', err);
            if (!res.headersSent) {
                res.status(500).send('Error downloading the file.');
            }
        }
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
