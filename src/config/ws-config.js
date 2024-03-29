import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    "/ws",
    createProxyMiddleware({
      target: "http://api.lettlebookshelf.org:8080",
      ws: true,
    })
  );
};
