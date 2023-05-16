// File to create sub-routes
const jwt = require('jsonwebtoken');
require('dotenv').config();

// console.log(process.env.JWT_SECRET);

const express = require('express');
const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");

    next();
});


const { getAllUsers, getUserByUsername } = require('../db')

usersRouter.get('/', async (req, res) => {
    const users = await getAllUsers();

    res.send({
        users: [users]
    });
});

usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    // console.log(username, password);

    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password"
        });
    }

    try {
        const user = await getUserByUsername(username);
        console.log(user);

        if (user && user.password == password) {
            res.send({ message: "you're logged in" });
        
        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }

    } catch (err) {
        console.log(err);
        next(err);
    }
});

module.exports = usersRouter;