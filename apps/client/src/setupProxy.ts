import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app: any) {
  app.use(
    '/proxy',
    createProxyMiddleware({
      target: 'https://news.naver.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/proxy': '', // '/proxy' 접두어 제거
      },
    })
  );
}
