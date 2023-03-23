// Code to increment coffee count by 1 when clicking the image

const coffeeImage = document.querySelector('.coffee-image')
const collectedCoffee = document.querySelector('.collected-coffee')
const coffeePerSecond = document.getElementById('coffee-per-second')


// adds 1 coffee per click
coffeeImage.addEventListener('click', function () {
    collectedCoffee.innerText = (parseInt(collectedCoffee.innerText) + 1).toString();
});


// Basic Coffee Roast Machine
const buyBasicCoffeeMachine = document.getElementById('basic-coffee-machine')
const collectedBasicCoffeeMachine = document.getElementById('basic-coffee-qty')

buyBasicCoffeeMachine.addEventListener('click', function () {
    if (parseInt(collectedCoffee.innerText) < 15) {
        alert("Not enough coffee to purchase this producer")
    } else {
        collectedBasicCoffeeMachine.innerText = (parseInt(collectedBasicCoffeeMachine.innerText) + 1);
        coffeePerSecond.innerText = parseInt(coffeePerSecond.innerText) + 1;
        collectedCoffee.innerText = parseInt(collectedCoffee.innerText) - 15;
    }

});

// French Press machine
const buyFrenchPress = document.getElementById('french-press-machine')
const collectedFrenchPressMachine = document.getElementById('french-qty')

buyFrenchPress.addEventListener('click', function () {
    if (parseInt(collectedCoffee.innerText) < 50) {
        alert("Not enough coffee to purchase this producer")
    } else {
        collectedFrenchPressMachine.innerText = (parseInt(collectedFrenchPressMachine.innerText) + 1);
        coffeePerSecond.innerText = parseInt(coffeePerSecond.innerText) + 2;
        collectedCoffee.innerText = parseInt(collectedCoffee.innerText) - 50;
    }
});

// French Press machine
const buyMrCoffeeMachine = document.getElementById('mr-coffee-machine')
const collectedMrCoffeeMachine = document.getElementById('mr-coffee-qty')

buyMrCoffeeMachine.addEventListener('click', function () {
    if (parseInt(collectedCoffee.innerText) < 100) {
        alert("Not enough coffee to purchase this producer")
    } else {
        collectedMrCoffeeMachine.innerText = (parseInt(collectedMrCoffeeMachine.innerText) + 1);
        coffeePerSecond.innerText = parseInt(coffeePerSecond.innerText) + 3;
        collectedCoffee.innerText = parseInt(collectedCoffee.innerText) - 100;
    }
});

// Function to update CollectedCoffee by "n" coffee per second
setInterval(
    function coffeeIntervalUpdate(){
        if (parseInt(coffeePerSecond.innerText) !== 0){
            collectedCoffee.innerText = parseInt(coffeePerSecond.innerText) + parseInt(collectedCoffee.innerText)
        };
    }
,1000)



