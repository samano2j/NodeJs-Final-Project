//older way
// process.mainModule.filename
//newer way
// module.exports = require.main.path
module.exports = __dirname;