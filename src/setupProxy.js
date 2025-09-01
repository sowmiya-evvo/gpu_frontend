
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    console.log("✅ setupProxy loaded");
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8100",
      changeOrigin: true,
      logLevel: "debug", // helps debugging in console
    })
  );
};
