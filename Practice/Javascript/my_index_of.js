// creates a function that takes three argumeents
// default index is set at 0 if no other values are provided

function myIndexOf(source, searchValue, startIdx = 0) {

    // looks through each character position starting at startidx 
    // will stop the loop if the character is greater than or equal to the length of source
    for (let i = startIdx; i < source.length; i++) {

        // for each iteration, an if else statement will check to see if the string created from slice matches the given searchValue parameter
        // if true, then it will return the character of the loop that passes the condition. Else it will return -1
        if (source.slice(i, i + searchValue.length) === searchValue) {
            return i;
        }
    }

    return -1;
}

console.log(myIndexOf("twice", "c"))