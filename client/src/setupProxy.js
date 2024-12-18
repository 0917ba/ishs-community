const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    [
      '/signin',
      '/check_session',
      '/signup',
      '/signout',
      '/user',
      '/post',
      '/report',
      '/comment',
      '/reaction',
      '/signout',
    ],
    createProxyMiddleware({
      target: 'http://ishs.kr:3000',
      changeOrigin: true,
    })
  );
  app.use(
    ['/upload', '/file'],
    createProxyMiddleware({
      target: 'http://ishs.kr:4000',
      changeOrigin: true,
    })
  );
};
