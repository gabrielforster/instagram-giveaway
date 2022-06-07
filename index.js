const express = require('express')
const app = express()
app.use(express.json())

const sorter = require('./sorter.js')

//B7wOyffArc5
app.get('/:id', async (req, res) => {
    const postId = req.params.id
    const sorted = await sorter(postId)
    winner = {
        id: postId,
        sortedAt: new Date().toLocaleDateString(),
        postWinner: sorted
    }
    res.json(winner)
})

app.listen(
    3000,
    () => {
        console.log(
            '\nServer running on port 3000!',
            '\nVisit localhost:3000/{postId} to get the winner of the post'
            )
    }
)