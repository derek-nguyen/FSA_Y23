// create a text parser that returns an array and removes all special characters
// uniformally formatted - no numbers, no punctuations

function parseText(text) {
    let cleanedText = text.replace(/[,']/g, "").toLowerCase()
    let resultArray = cleanedText.split(" ")
    return resultArray
}

// markov chain
function generateWordPairs(text) {
    let resultObject = {}
    const wordCorpus = parseText(text) // === array 

    // assign assign key value pairs
    for (let i = 0; i < wordCorpus.length - 1; i++) {
        let currentWord = wordCorpus[i] //you
        let nextWord = wordCorpus[i + 1] //and

        if (resultObject[currentWord] === undefined) {
            resultObject[currentWord] = [nextWord]
        } else {
            resultObject[currentWord].push(nextWord) // if the following words are duplicate then add it to the same key
        }
    };
    return resultObject
}

// Create a function writeLine that takes a Markov Chain (object) and a length of words n and returns a line of poetry.
function writeLine(text, words = 1) {
    const markovChain = generateWordPairs(text)
    let poetryLine = ""
    // create a helper function that takes a word and randomly chooses a word from its Markov chain array
    function chooseRandomWord(markovChain) {
        const markovWordsArr = Object.keys(markovChain)
        let randomWordNumber = Math.floor(Math.random() * markovWordsArr.length)
        let randomWord = markovWordsArr[randomWordNumber]
        return randomWord
    }

    // loop through the markovChain to look for the keys returned by chooseRandomWord and add to poetryLine

    for (let wordCount = 0; wordCount < words;) {

        let matchFound = false;

        // returns the first match of random word in the markov chain
        for (let key in markovChain) {
            if (key === chooseRandomWord(markovChain)) {
                poetryLine += markovChain[key] + " "
                matchFound = true;
                break;
            }
        }
        // if the current index does not return a match then rerun the loop
        if (matchFound === false) {
            continue;
        } wordCount++
    }
    return poetryLine
}

// Set up function generatePoem to accept two parameters (wordCorpus, lines)
const wordCorpus = "Ever since I left the city, you, you, you You and me we just don't get along";

function generatePoem(wordCorpus, lines = 1, wordsPerLine = 0) {
    let poem = ""
    for (let i = 0; i < lines; i++) {
        poem += writeLine(wordCorpus, wordsPerLine) + '\n'
    }
    return poem
}

console.log(generatePoem(wordCorpus, 5, 5))