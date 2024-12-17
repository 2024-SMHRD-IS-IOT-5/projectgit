const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    // ESP32와 통신
    app.use(
        '/control',
        createProxyMiddleware({
            target: 'http://192.168.219.49:80', // ESP32 주소
            changeOrigin: true,
        })
    );

    // Node.js 서버와 통신
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3001', // Node.js 서버 주소
            changeOrigin: true,
        })
    );
};
