const { error } = require('console');
const {
    client,
    getAllUsers,
    createUser,
    updateUser
} = require('./index');


// Function should call a query which drops all tables from our database

async function createInitialUsers() {
    try {
        console.log('Starting to create users...')

        await createUser({ username: 'albert', password: 'bertie99' });
        await createUser({ username: 'sandra', password: '2sandy4me' });
        await createUser({ username: 'glamgal', password: 'soglam' });

        console.log('Finished creating users!');
    } catch (err) {
        console.error('Error creating users!');
        throw err;
    }
}

async function dropTables() {
    try {
        await client.query(`
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
    } catch (err) {
        throw err;
    }
}

async function testDB() {
    try {
        console.log('Starting to test database...')
        // connect the client to the database, finally

        const users = await getAllUsers();
        // console.log('Result:', users);

        console.log("Calling updateUser on users[0]")
        const updateUserResult = await updateUser(users[0].id, {
            name: "Newname Sogood",
            location: "Lesterville, KY"
        });

        // console.log('Result: ', updateUserResult)

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