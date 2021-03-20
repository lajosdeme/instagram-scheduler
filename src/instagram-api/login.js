require('dotenv').config()
const {IgApiClient} = require('instagram-private-api')

const ig = new IgApiClient()

// ------------------------- Log in -------------------------------------- 
const login = async () => {
      // basic login-procedure
  await ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD)
}

module.exports = login