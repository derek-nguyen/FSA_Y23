// File to create sub-routes
const express = require('express');
const postsRouter = express.Router();

const { requireUser } = require('./utils');
const { createPost } = require('../db')


postsRouter.use((req, res, next) => {
    console.log("A request is being made to /posts");

    next();
});


postsRouter.post('/', requireUser, async (req, res, next) => {
    const { title, content, tags = "" } = req.body;

    // Will remove white spaces then split will return the string into an array by spaces
    const tagArr = tags.trim().split(/\s+/);
    const postData = {};

    // only send tags if there are some to send
    if (tagArr.length) {
        postData.tags = tagArr;
    }

    // Successful post creation: curl http://localhost:3000/api/posts -X POST -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsYmVydCIsInBhc3N3b3JkIjoiYmVydGllOTkiLCJpZCI6MSwiaWF0IjoxNjg0MzkyMjE4fQ.X71901BcLrSvKOTckzYC9xHA4QJ3HGFNqSXPctKIKE0' -H 'Content-Type: application/json' -d '{"title": "test post", "content": "how is this?", "tags": " #once #twice    #happy"}'
    // Failed post creation: curl http://localhost:3000/api/posts -X POST -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsYmVydCIsInBhc3N3b3JkIjoiYmVydGllOTkiLCJpZCI6MSwiaWF0IjoxNjg0MzkyMjE4fQ.X71901BcLrSvKOTckzYC9xHA4QJ3HGFNqSXPctKIKE0' -H 'Content-Type: application/json' -d '{"title": "test post", "tags": " #once #twice    #happy"}'
    try {
        postData.authorId = req.user.id;
        postData.title = title;
        postData.content = content;

        console.log(postData.authorId);

        const post = await createPost(postData);

        res.send(post);
    } catch ({ name, message }) {
        next({ name, message })
    }

    res.send({ message: 'Under construction' });
});

const {
    getAllPosts,
    updatePost,
    getPostById
} = require('../db')

postsRouter.get('/', async (req, res) => {
    const posts = await getAllPosts();

    res.send({
        posts: [posts]
    });

});

postsRouter.patch('/:postId', requireUser, async (req, res, next) => {
    const { postId } = req.params;
    const { title, content, tags } = req.body;

    console.log("postId: ", postId,"postTitle: ", title,"postContent: ", content,tags);
    const updateFields = {};

    if (tags && tags.length > 0) {
        updateFields.tags = tags.trim().split(/\s+/);
    }

    if (title) {
        updateFields.title = title;
    }

    if (content) {
        updateFields.content = content;
    }

    try {
        const originalPost = await getPostById(postId);
        // console.log(originalPost);
        console.log(updateFields);
        // Ensuring post to update is owned by user tryng to update
        if (originalPost.author.id === req.user.id) {
            const updatedPost = await updatePost(postId, updateFields);

            console.log(updatePost);
            res.send({ post: updatedPost });
        } else {
            next({
                name: 'UnauthorizedUserError',
                message: 'You cannot update a post that is not yours'
            });
        }

    } catch {
        console.log('Error sending patch request')
    }

    
});


module.exports = postsRouter;