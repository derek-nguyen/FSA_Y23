// best practice is to add all utility functions into this file that the entire application will use

const { Client } = require('pg');

const client = new Client('postgres://localhost:5432/juicebox-dev')

async function createUser({ username, password, name, location }) {
    try {
        const result = await client.query(`
            INSERT INTO users (username, password, name, location)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (username) DO NOTHING 
            RETURNING *;
        `, [username, password, name, location]);

        return result.rows;
    } catch (err) {
        throw err;
    }
}

async function updateUser(id, fields = {}) {
    // build the set string
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

    // return early if this is called without fields
    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [user] } = await client.query(`
            UPDATE users
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
          `, Object.values(fields));

        return user;
    } catch (error) {
        throw error;
    }
}

async function getAllUsers() {
    const { rows } = await client.query(`
        SELECT *
        FROM users;
        `);

    return rows;
}

async function createPost({ authorId, title, content }) {
    try {
        const result = await client.query(`
            INSERT INTO posts ("authorId", title, content)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [authorId, title, content]);

        return result.rows;
    } catch (err) {
        throw err;
    }

}

async function updatePost(id, fields = {}) {
    // build the set string
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

    // return early if this is called without fields
    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [post] } = await client.query(`
            UPDATE posts
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
          `, Object.values(fields));

        return post;
    } catch (error) {
        throw error;
    }
}

async function getAllPosts() {
    try {
        const { rows } = await client.query(`
            SELECT * FROM posts;
        `);
        return rows;
    } catch (err) {
        throw err
    }
}

async function getPostsByUser(userId) {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM posts
            WHERE "authorId" = ${userId};
        `);
        return rows;
    } catch (err) {
        throw err
    }
}

async function getUserById(userId) {
    try {
        const { rows: [user] } = await client.query(`
            SELECT *
            FROM users
            WHERE id = ${userId};
        `);
        // return user;
        if (user) {
            delete user.password;
            const [userPost] = await getPostsByUser(user.id);
            user.posts = userPost;

            return user;
        } else {
            return
        }

    } catch (err) {
        throw err
    }
}

// getPostsByUser(1)
//     .then(data => console.log(data))
//     .catch(err => {throw err})

module.exports = {
    client,
    getAllUsers,
    createUser,
    updateUser,
    createPost,
    getAllPosts,
    updatePost,
    getUserById,
}