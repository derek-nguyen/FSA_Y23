

function mySlice(originalString, startIdx = 0, endIdx = originalString.length) {
    // default start index is 0
    // default end index is the length of the string
    let newString = "" //creates an empty string which will be used to append characters that meets our for loop

    // loops starts at the index of loop if given a value for startIdx else defaults at 0
    // first loop will run if condition is met: if current position is less than the end index (defaults to length of string)
    // and character position is less than the length of the string
    for (let i = startIdx; i < endIdx && i < originalString.length; i++) {
        
        // the loop will add all values that passes the condition to newString
        newString += originalString[i]
    }
    return newString;
}



