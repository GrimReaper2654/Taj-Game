/*
INFO

*/


// Variables
const player = {
    name: "Terrorist Tom",
    
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





// Game functions
function playerTurn() {

}

function enemyTurn() {

}




function game() {
    
}







// Main code




