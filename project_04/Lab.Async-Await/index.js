const { readFile } = require('fs').promises;

const mostFrequentWord = (text) => {
  const words = text.toLowerCase().match(/[^_\W]+/g);
  const tally = {};
  let mostFrequentWord = null;
  
  words.forEach(word => {
    tally[word] = (tally[word] || 0) + 1 ;
    if(!tally[mostFrequentWord] || tally[word] > tally[mostFrequentWord])
      mostFrequentWord = word;
  });
  return mostFrequentWord;
}

const findPassword = async () => {
  // step 1
  try {
    // const poem1 = await readFile('poems/starting-poem.txt','utf-8'); //Step 1: Assign bunch of words from start-poem.txt to poem1
    const poem1 = await readFile('poem/starting-poem.txt','utf-8'); //Step 1: Assign bunch of words from start-poem.txt to poem1
  } catch (error) {
    console.log('Something went wrong when loading poem1', error.stack)
  }
  
  const frequenctWordPoem1 = mostFrequentWord(poem1);

  // step 2
  const poem2 = await readFile(`poems/${frequenctWordPoem1}.txt`,'utf-8') 
  const frequenctWordPoem2 = mostFrequentWord(poem2) 
  // frequenctWordPoem2 = "you"

  // step 3
  const poem3 = await readFile(`poems/${frequenctWordPoem2}.txt`,'utf-8')
  const frequenctWordPoem3 = mostFrequentWord(poem3)
  console.log(frequenctWordPoem3)

  //ouput of frequentWordPoem3 = love
  // "love" is the secret word

}

findPassword();

