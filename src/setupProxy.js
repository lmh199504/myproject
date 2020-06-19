const {
	createProxyMiddleware
} = require('http-proxy-middleware');
module.exports = function(app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://192.168.3.124:3200',
			changeOrigin: true,
			pathRewrite: {
				'^/api': ''
			}
		})
	);
};
