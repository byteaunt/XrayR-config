const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5909;

// 使用CORS中间件，允许所有来源的请求
// 将CORS中间件放在所有路由定义之前，以确保所有路由都可以使用CORS策略
app.use(cors());

// 中间件，用于解析请求体为文本
app.use(express.text());

// 处理生成文件的POST请求
app.post('/generate', (req, res) => {
    // 获取请求体中的内容
    const yamlContent = req.body;
    // 指定生成的yml文件名称，这里使用时间戳来保证文件名的唯一性
    const fileName = `xrayr-${Date.now()}.yml`;
    // 指定文件保存的路径
    const filePath = path.join(__dirname, 'uploads', fileName);

    // 确保上传目录存在
    fs.mkdirSync(path.join(__dirname, 'uploads'), { recursive: true });

    // 写入文件
    fs.writeFile(filePath, yamlContent, (err) => {
        if (err) {
            console.error('File writing error:', err);
            return res.status(500).send('Error generating the file.');
        }
        // 返回文件的下载链接
        res.send({ link: `http://${req.headers.host}/down/${fileName}` });
    });
});

// 提供下载文件的GET路由
app.get('/down/:fileName', (req, res) => {
    const { fileName } = req.params;
    const filePath = path.join(__dirname, 'uploads', fileName);
    res.download(filePath, fileName, (err) => {
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
