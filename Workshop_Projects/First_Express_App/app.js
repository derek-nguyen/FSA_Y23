const express = require('express');

const app = express();

const port = 1337;

app.listen(port, () => {
    console.log(`server listening`)
})

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to our Pet Store! Feel free to look around</h1>`)
})

app.get('/puppies', (req, res) => {
    res.send(`<h1>Second page</h1><img src="https://www.rd.com/wp-content/uploads/2021/03/GettyImages-1133605325-scaled-e1617227898456.jpg?fit=696,463" alt=""></img> `)
})

app.get('/kittens', (req, res) => {
    res.send(`<h1>Second page</h1><img src="https://www.rd.com/wp-content/uploads/2021/04/GettyImages-138468381-scaled-e1619028416767.jpg" alt=""></img> `)
})

