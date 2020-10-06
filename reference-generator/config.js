 
module.exports = {
    handlebars: {
        partials: require('path').join(__dirname,"partials"),
        helpers: require.resolve('./helpers.js')
    },
    less: {
        main: [
            require.resolve("./less/custom.less")
        ]
    }
}
