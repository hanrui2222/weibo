const { rejects } = require('assert');
const { resolve } = require('path');
const querystring = require('querystring');
const handleBlogRoute = require('./src/routes/blog');


const getPostData = (req) => {
    const promise = new Promise((resolve, rejects) => {
        if (req.method !== 'POST') {
            resolve({});
            return;

        }

        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return;
        }
        let postData = '';
        req.on('data', (chunk) => {
            postData += chunk.toString();
        });
        req.on('end', () => {
            if (!postData) {
                resolve({});
                return;
            }
            resolve(
                JSON.parse(postData)

            );

        });

    });

    return promise;

}





// 服务器处理函数
const serverHandler = (req, res) => {



    // 设置响应格式
    res.setHeader('Content-type', 'application/json');
    // 获取path
    const url = req.url;
    req.path = url.split('?')[0];
    // 解析query获取参数
    req.query = querystring.parse(url.split('?')[1]);



    //    处理post请求

    getPostData(req).then((postData) => {
        req.body = postData;
        // 博客相关的路由
        const blogDataPromise = handleBlogRoute(req, res);
        if (blogDataPromise) {
            blogDataPromise.then((blogData) => {
                res.end(
                    JSON.stringify(blogData)
                );
            });
            return;
        }
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        res.end();

    })





}
module.exports = serverHandler;