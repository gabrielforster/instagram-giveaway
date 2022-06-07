const instaTouch = require('instatouch');
/*
this function gets the comments from a instagram post
*/

async function collectComments(postId) {
    try {
        const options = { 
            count: 100, //count should be the amount of comments present on the post
            session: process.env.INSTAGRAM_SESSION_ID,
        };

        /* instaTouch.comments needs an string of the "id" of the post, it's present on the instagram link. So https://www.instagram.com/p/B7wOyffArc5/ -> post id  = 'B7wOyffArc5' */
        const comments = await instaTouch.comments(postId/*<-- Here you need to put the link of the instagram post*/, options);
        console.log('collectComments', comments.collector)
        return(comments.collector);
    } catch (error) {
        console.log(error);
    }
}

const pickWin = (comments) => {
    const pickAComment = Math.floor(Math.random() * comments.length)
    const picked = comments[pickAComment]
    return(picked)
}

 async function sorter (postId) {
    const commentsCollected = await collectComments(postId)
    const pickedWinner = pickWin(commentsCollected)
    return pickedWinner
}

module.exports = sorter