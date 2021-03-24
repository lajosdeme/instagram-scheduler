require('dotenv').config()
const {IgApiClient} = require('instagram-private-api');
const Logger = require('../loaders/logger')
const ig = new IgApiClient()

// ------------------------- Log in -------------------------------------- 
const login = async () => {
  // basic login-procedure
  await ig.state.generateDevice(process.env.IG_USERNAME);
  const proxy = process.env.IG_PROXY
  if (proxy !== undefined) {
    ig.state.proxyUrl = process.env.IG_PROXY;
  }
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD)
  .then(value => {
    Logger.info('Account logged in successfully.', value)
  })
  .catch(error => {
    Logger.error('Could not log in', error)
  })
}
module.exports = login