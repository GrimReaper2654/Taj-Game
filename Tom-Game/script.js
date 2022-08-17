/*
INFO

*/


// Variables
const player = {
    name: "Terrorist Tom",
    
}

const settings = {
    maxLevels: 50,
}

var playerStats = {
    health: 100,
}

var playerInventory = {
    weapons: {
        slot1: "empty",
        slot2: "empty",
        slot3: "empty",
        slot4: "empty",
    }

}

var currentLevel = 0




const intro = `You wake up in a dark room. All you can remember is your name: ${player.name}.<br><br>`


// Functions

// Initialization of the game
function init() {
    showText("text", intro)
}







function showText(id, text) {
    document.getElementById(id).innerHTML = text;
}
function addText(id, text) {
    document.getElementById(id).innerHTML = document.getElementById("text").innerHTML + text;
}
function hideText(id) {
    document.getElementById(id).style.display = "block"
}
function unhideText(id) {
    document.getElementById(id).style.display = "block"
}

function showOptions() {

}

function playerDeath(enemy){ // Need to finish death message and add an option to restart the game
    showText(`You were killed by ${enemy}`)
}





// Game functions
function playerTurn() {

}

function enemyTurn() {

    
    game()
}





function game() {
    if (playerStats.health > 0) {
        playerTurn()
        enemyTurn()
    } else if (currentLevel > player.maxLevels) { // Need to finish and also improve victory message
        console.log("You have finished the game!")
    } else {
        playerDeath()
    }
}







// Main code




