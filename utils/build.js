// const chromeWebStoreItemProperty = require('chrome-web-store-item-property');
const webpack = require('webpack');
const config = require('../webpack.config');
// const bumpMinorVersion = (version) => {
// 	const splitVersion = version.split('.');
// 	splitVersion[2] = (1 + parseInt(splitVersion[2], 10));
// 	return splitVersion.join('.');
// };

require('./prepare');
webpack(
	config,
	err => {
		if (err) {
			throw err;
		}
	},
);

// console.log('📞  Getting version from Chrome Webstore...');
// chromeWebStoreItemProperty(chromeStoreId)
// 	.then(value => {
// 		process.env.extension_version = newVersion;
// 		require('./prepare');
//
// 		webpack(
// 			config,
// 			function (err) {
// 				if (err) {
// 					throw err;
// 				}
// 			},
// 		);
// 	})
// 	.catch(err => {
// 		console.error('Failed getting version from Chrome Webstore', err);
// 	});
