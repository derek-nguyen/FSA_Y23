const { error } = require('console');
const {
    client,
    getAllUsers,
    createUser,
    updateUser,
    createPost,
    getAllPosts,
    updatePost,
    getUserById,
} = require('./index');


// Function should call a query which drops all tables from our database

async function createInitialUsers() {
    try {
        console.log('Starting to create users...')

        await createUser({
            username: 'albert',
            password: 'bertie99',
            name: 'Al Bert',
            location: 'Sidney, Australia'
        });
        await createUser({
            username: 'sandra',
            password: '2sandy4me',
            name: 'Just Sandra',
            location: 'Ain\'t tellin\''
        });
        await createUser({
            username: 'glamgal',
            password: 'soglam',
            name: 'Joshua',
            location: 'Upper East Side'
        });

        console.log('Finished creating users!');
    } catch (err) {
        console.error('Error creating users!');
        throw err;
    }
}

async function createInitialPosts() {
    try {
        const [albert, sandra, glamgal] = await getAllUsers();

        await createPost({
            authorId: albert.id,
            title: "First Post",
            content: "This is my first post. I hope I love writing blogs as much as I love writing them."
        });

        await createPost({
            authorId: sandra.id,
            title: "How does this work?",
            content: "Seriously, does this even do anything?"
        });

        await createPost({
            authorId: glamgal.id,
            title: "Living the Glam Life",
            content: "Do you even? I swear that half of you are posing."
        });

        // a couple more
    } catch (error) {
        throw error;
    }
}

async function dropTables() {
    try {
        await client.query(`
            DROP TABLE IF EXISTS posts;
            DROP TABLE IF EXISTS users;
        `);

        console.log('Finished dropping tables');
    } catch (err) {
        console.error('Error dropping tables');
        throw err;
    }
}

async function createTables() {
    try {
        console.log('Starting to build tables...')

        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL,
            name VARCHAR(255),
            location VARCHAR(255),
            active BOOLEAN DEFAULT true
        );
        `);

        await client.query(`
            CREATE TABLE posts (
                id SERIAL PRIMARY KEY,
                "authorId" INTEGER REFERENCES users(id) NOT NULL,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                active BOOLEAN DEFAULT true
            );
            `);

        console.log('Finished building tables!')
    } catch (err) {
        console.error('Error building tables')
        throw err;
    }
}

async function rebuildDB() {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialPosts();
    } catch (err) {
        throw err;
    }
}

async function testDB() {
    try {
        console.log('Starting to test database...')
        // connect the client to the database, finally

        const users = await getAllUsers();

        console.log("Calling updateUser on users[0]")
        const updateUserResult = await updateUser(users[0].id, {
            name: "Newname Sogood",
            location: "Lesterville, KY"
        });

        console.log('Calling getAllPosts');
        const posts = await getAllPosts();
        // console.log("All Posts Result: ", posts)

        console.log('Calling updatePost on posts[0]');
        const updatePostResult = await updatePost(posts[0].id, {
            title: "New Title",
            content: "Updated Content"
        });
        console.log('Post Update Result ', updatePostResult);

        console.log('Calling getUserbyId')
        const albert = await getUserById(users[0].id);
        console.log('User Result: ', albert);


        console.log('Finished database tests')
    } catch (err) {
        console.error('Error testing database!')
        console.error(err);
    }
}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());