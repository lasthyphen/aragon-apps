const config = require('../../shared/buidler.config')

config.solc.optimizer.runs = 10000
module.exports = config
