const {IgApiClient} = require('instagram-private-api')
const ig = new IgApiClient()

// ------------------------- Add comment to post -------------------------------------- 
//Parameter: mediaId: the media id of the post under which the comment is to be added
//Parameter: comment: the text of the comment
const addComment = async (mediaId, comment) => {
    //Basic login procedure, comment out proxyUrl if you want to use proxy
    ig.state.generateDevice(process.env.IG_USERNAME);
    //ig.state.proxyUrl = process.env.IG_PROXY
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