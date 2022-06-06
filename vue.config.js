module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/style/variables.scss";`
            }
        }
    },
    publicPath:'/weather-app/'
};