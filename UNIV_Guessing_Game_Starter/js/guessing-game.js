/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "npm test".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/


// A number between 1-100 will be randomly generated and is the winning number.

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

// const winningNumber = getRandomIntInclusive(0,100)
const winningNumber = getRandomIntInclusive(1, 100)

// The player inputs their guess in a text input field and then submits their guess.

const guessInput = document.getElementById('inputField')
const submitGuessBtn = document.getElementById('submitGuessBtn')
const guessList = document.querySelectorAll('.guesses .guess')

// const mainTitle = document.querySelector('#main-title')
const helperResponse = document.querySelector('#helper-response')

let storeGuesses = [] //stores the current guesses

submitGuessBtn.addEventListener('click', function () {
    const guessIntParsed = parseInt(guessInput.value)
    if (isNaN(guessIntParsed) || guessIntParsed === 0 || guessIntParsed > 100) {
        helperResponse.innerHTML = "Incorrect input, only numbers between 1-100"
    } else if (guessIntParsed === winningNumber) {
        helperResponse.innerHTML = "YOU WIN!"
        guessInput.setAttribute('disabled', 'true')
        submitGuessBtn.setAttribute('disabled', 'true')
    } else if (storeGuesses.includes(guessInput.value)) {
        helperResponse.innerHTML = "You've already guessed this number. Try again" 
    } else {
        // loop through current guesses and add new guess to open guess slot
        for (let i = 0; i < guessList.length; i++) {
            if (guessList[i].innerHTML === '-') {
                guessList[i].innerHTML = guessInput.value
                storeGuesses.push(guessInput.value)
                break
            }
        }

        // give the player a hint after each guess, helping them know whether to guess lower or higher and how close they are.
        if (guessIntParsed > winningNumber) {
            helperResponse.innerHTML = 'Wrong guess, try a lower number'
        } else if (guessIntParsed < winningNumber) {
            helperResponse.innerHTML = 'Wrong guess, try a higher number'
        }

        // After five unsuccessful guesses, the game is over, and the player loses.
        if (storeGuesses.length === 5) {
            helperResponse.innerHTML = `YOU LOST, THE NUMBER WAS ${winningNumber}!! REFRESH TO START AGAIN`
            guessInput.setAttribute('disabled', 'true')
            submitGuessBtn.setAttribute('disabled', 'true')
        }
    }
    guessInput.value = ''
});



