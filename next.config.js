const withImages = require('next-images');


module.exports = withImages({
    webpack(config, options) {
        return config
    },
    dynamicAssetPrefix: true,
    images: {
        disableStaticImages: true
    },
    env: {
        API_URL: 'https://api.limitless-connection.com/api/v1/',
        BASE_URL: 'https://limitless-connection.com'
    }
});
