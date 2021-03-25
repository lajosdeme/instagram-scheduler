const {IgApiClient} = require('instagram-private-api')
const ig = new IgApiClient()

const login = require('./login')

/* -------------------------- Add comment to post -------------------------------------- 
 * @param {String} mediaId   The media id of the post under which the comment is to be added.
 * @param {String} comment   The comment to be posted.
 */
const addComment = async (mediaId, comment) => {
    // await login()

    await ig.state.generateDevice(process.env.IG_USERNAME);
    const proxy = process.env.IG_PROXY
    if (proxy !== undefined) {
      ig.state.proxyUrl = process.env.IG_PROXY;
    }
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD)
    
    //Check if the comment offensive. Required before posting comment to IG.
    await ig.media.checkOffensiveComment(comment).then(() => {
        console.log('checked')
    })
    //Post comment to IG post with media id.
    await ig.media.comment({mediaId: mediaId, text: comment}).then(() => {
        console.log('comment added.')
    })
    .catch((reason) => {
        console.log(`Adding comment failed. ${reason}`)
    })
}
module.exports = addComment