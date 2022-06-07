module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/style/variables.scss";`
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/weather-app/' : '/'
};