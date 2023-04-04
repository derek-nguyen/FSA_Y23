// let sentence = "I am a keeper with some real rhythms";
// let words = sentence.split(" ");

// for (let i = 0; )

let string = "I am a keeper with some real rhythms"

let words = string.split(" ")
let veryRandom = ""
let currentVowelCount = 0

for (let i = 0; i < words.length; i++){ // i is currently at index 0 
    
    let newCurrentWord = words[i] // newCurrentWord = "The"
    // let currentWord = words[i] // currentWord = "The" for the first loop
    // let countOfVowels = 0 // setting count of vowels to 0
    // veryRandom += newCurrentWord;
    // create a loop to check for individual characters in each word for vowels
    for (let j = 0; j < newCurrentWord.length; j++){ // j index is 2 "e"
        if (newCurrentWord[j] === "a" || newCurrentWord[j] === "e" || newCurrentWord[j] === "i" || newCurrentWord[j] === "o") {
            currentVowelCount += 1;
        }
    }

    let newVowelCount = 0
    // need to compare old vowel count with new vowel count
    if (currentVowelCount > newVowelCount){
        currentVowelCount = newVowelCount;
        
        veryRandom = newCurrentWord
    }
    

}

// console.log(currentVowelCount, veryRandom)

console.log(veryRandom)

// [2,5,3,4,8]