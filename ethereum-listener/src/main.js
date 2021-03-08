const web3 = require('@/constructors/web3')
const ethereum = require('@/constructors/ethereum')

// Allow for clean nodemon restarts (see https://github.com/remy/nodemon/issues/1025#issuecomment-308049864)
process.on('SIGINT', () => {
  process.exit()
})

process.on('uncaughtException', (e) => {
  console.error(`[ethereum-listener] unhandled exception: ${e.message} ${e}`)
})


module.exports = async () => {
  console.info('[ethereum-listener] Starting...')
  try {
    const [
      postgres,
      redis,
    ] = await Promise.all([
      await require(`@/share/constructors/postgres`)(),
      await require(`@/share/constructors/redis`)({
        url: process.env.REDIS_URL,
        prefix: 'ethereum-listener',
      }),
    ])

    const {
      sequelize,
      Sequelize,
      models,
    } = require('@/constructors/sequelize')({})

    const context = {
      sequelize,
      Sequelize,
      models,
      postgres,
      redis,
      web3,
      ethereum,
    }

    if (process.env.MIGRATE_ON_BOOTSTRAP === 'true') await require('@/share/bin/sequelizeMigrate')()

    require('./lib/listeners/ETH/newBlockHeaders')(context)
    require('./lib/listeners/ETH/pendingTransactions')(context)

    require('./lib/sync/syncBlocks')(context)
    // require('./lib/sync/syncMethods').syncMethods(context)
    require('./lib/sync/syncPendingTransactions')(context)
  } catch (e) {
    console.error('[ethereum-listener] Error.')
    console.error(e)
  }
}
