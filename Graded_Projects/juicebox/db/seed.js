const { error } = require('console');
const {
    client,
    getAllUsers,
    createUser,
} = require('./index');


// Function should call a query which drops all tables from our database

async function createInitialUsers() {
    try {
        console.log('Starting to create users...')

        const albert = await createUser({ username: 'albert', password: 'bertie99' });

        console.log(albert);

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
            password varchar(255) NOT NULL
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
        console.log('getAllUsers', users);
    } catch (err) {
        console.error('Error testing database!')
        console.error(err);
    }
}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());