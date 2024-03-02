const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
      ['/signin', '/check_session', '/post'],
      createProxyMiddleware({
      target: "http://app.ishs.co.kr", // 가장 베이스가 되는 것, 배열 맨 앞 api의 주소
      changeOrigin: true,
      })
  )
}