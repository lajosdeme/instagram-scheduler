const { IgApiClient } = require('instagram-private-api')
const ig = new IgApiClient()
const fs = require('fs')

const getObject = require('../db/getScheduleObjects').getSingleScheduleObject
const addComment = require('./addComment')
const deleteObject = require('../db/deleteScheduleObject')
const login = require('./login')

/* ------------------------- Upload photo to Instagram -------------------------------------- 
 * @param {Int} id  The id of the schedule info object
 */
const uploadPhoto = async (id) => {
    // await login()

    await ig.state.generateDevice(process.env.IG_USERNAME);
    const proxy = process.env.IG_PROXY
    if (proxy !== undefined) {
      ig.state.proxyUrl = process.env.IG_PROXY;
    }
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD)
    
    //Get object from database
    await getObject(id, async (err, object) => {
        if (err) {
            console.log(err)
            return
        } else {
            //Get image and caption
            const file = object.post.image.data
            const caption = object.post.caption

            //Upload the photo to IG
            const publishResult = await ig.publish.photo({
                file: file,
                caption: caption
            })
            console.log(publishResult)
            //If object has a first comment, add comment under new post
            if (object.firstComment != '') {
                const mediaId = publishResult.media.pk
                addComment(mediaId, object.firstComment)
                    .then(() => {
                        console.log("Commented successfully.")
                        //Delete the object after it has been successfully posted
                        deletePostedObject(publishResult.status, id)
                    })
                    .catch((reason) => {
                        console.log(reason)
                    })
            } else {
                //Delete the object after it has been successfully posted
                deletePostedObject(publishResult.status, id)
            }
        }
    })
}

/* ------------------------- Delete object if status ok -------------------------------------- 
 * @param {String} status         The status of the photo upload request.
 * @param {Int}    id             The id of the schedule info object.
 */
function deletePostedObject(status, id) {
    if (status == 'ok') {
        deleteObject(id, (err, _) => {
            if (err) {
                console.log("error deleting object from DB after posting to IG")
            }
        })
    }
}

module.exports = uploadPhoto