const syncBlock = require('./syncBlock')
const { getDate } = require("/app/share/lib")
const debug = require('debug')('ethereum-listener:lib:syncBlocks')
const getSyncStartAndEndBlocks = require('./getSyncStartAndEndBlocks')

// TODO share logic with newBlockHeaders to simplify


module.exports = async ({
  startBlockNumber,
  models,
  sequelize,
  web3,
}) => {
  debug(`Starting block number ${startBlockNumber}`)
  try {
    let end = startBlockNumber + process.env.BLOCK_STEP_COUNT;

    for ( current = startBlockNumber; current < end; current++) {
      debug(`START syncing block ${current}`)
      await syncBlock({
        blockNumber: current,
        withMethods: true,
        web3,
        models  
      })
      debug(`END syncing block ${current}`)
    }

  } catch (e) {
    console.error(e)
  }
}
