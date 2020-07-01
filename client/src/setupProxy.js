/* const proxy = require('http-proxy-middleware');
module.exports = function(app){
    app.use(
        '/api',
        proxy({
            target: 'http://localhost:5000', //노드 서버
            changeOrigin: true,
        })
    );
};
 */

// 위의 http-proxy-middleware가 버전 업이 되어서 쓰는 법이 바뀜

const { createProxyMiddleware } = require('http-proxy-middleware');



module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );
};

// client 3000 에서 5000으로 보내겠다.