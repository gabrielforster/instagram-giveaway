const instaTouch = require('instatouch');
const fs = require('fs');
require('dotenv').config();

/*
this function gets the comments from a instagram post
*/

async function collectComments() {
    try {
        const options = { 
            count: 100, //count should be the amount of comments present on the post
            session: process.env.INSTAGRAM_SESSION_ID,
        };

        /* instaTouch.comments needs an string of the "id" of the post, it's present on the instagram link. So https://www.instagram.com/p/B7wOyffArc5/ -> post id  = 'B7wOyffArc5' */
        const comments = await instaTouch.comments('B7wOyffArc5'/*<-- Here you need to put the link of the instagram post*/, options);
        return(comments.collector);
    } catch (error) {
        console.log(error);
    }
}

const pickWin = (comments) => {
    const pickAComment = Math.floor(Math.random() * comments.length)
    const picked = comments[pickAComment]
    console.log(picked)
    return(picked)
}

const saveWinner = (winner) => {
    fs.writeFile('winner.json', JSON.stringify(winner, null, 1), function(err){
        if (err) console.log(err)
    })
}

async function main () {
    const commentsCollected = await collectComments()
    const pickedWinner = pickWin(commentsCollected)
    saveWinner(pickedWinner)
}

main()