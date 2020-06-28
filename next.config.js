const withSass = require('@zeit/next-sass');
require('dotenv').config();

module.exports = withSass({
    webpack(config, options) {
        return config;
    },
})

module.exports = {
    env: {
        API_KEY: process.env.API_KEY
    }
}
