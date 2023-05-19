// File to create sub-routes

const express = require('express');
const tagsRouter = express.Router();

tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");

    next();
});


const {
    getAllTags,
    getPostsByTagName
} = require('../db')


// tagsRouter.get('/', async (req, res) => {
//     const tags = await getAllTags();

//     res.send({
//         tags: [tags]
//     });

// });


// curl http://localhost:3000/api/tags/\#happy/posts 
tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    const tagName = req.params.tagName;
    const encodedTagName = encodeURIComponent(req.params.tagName)
    // console.log(encodedTagName)

    
    try {
        // use our method to get posts by tag name from the db
        // send out an object to the client {posts: // the posts}

        const posts = await getPostsByTagName(encodedTagName)
        res.send({ posts });

    } catch ({ name, message }) {
        next({ name, message });
    }
});

module.exports = tagsRouter;