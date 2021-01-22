//Storing the images chosen from user
const playerImg = document.querySelector('.boardcontainer__playerimg');


//Get button, for dices and for players
const diceImg = document.querySelector('#dice1');
const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
const dice6P1 = document.querySelector('.bordercontainer__rolledsixhuman')
const dice6P2 = document.querySelector('.bordercontainer__rolledsixmachine')
let trapMessage = document.querySelector('.message');
const numberOfTiles = 32;
let winnerOfTheGame = [];

//Sounds
const gotTheme = new Audio('/sounds/GOT_theme.mp3');

//Starting position for players
let player1Postion = 1;
let player2Postion = 1;
let originalState = document.querySelector('#grid_1');

//These values are used to recognize the different traps
const gridTile = ['#grid_6', '#grid_10', '#grid_15', '#grid_20', '#grid_29'];


//
window.addEventListener('load', (event) => {
    //  gotTheme.play();
    diceImg.innerHTML = `<img class="dice__player1" src="/images/1x/dice1_1.png" alt="image of dice when the page is loaded">`;
});


//New testing

let playersTurn = true;


diceImg.addEventListener('click', rolleDiceNumber);

function rolleDiceNumber(event) {
    if (!playersTurn && typeof event !== 'undefined') {
        return
    }
    let diceRoll = Math.floor(Math.random() * 6) + 1;
    diceImg.innerHTML = `<img class="dice__player1" src="/images/1x/dice1_${diceRoll}.png alt="image of the dice when the user clicking">`;

    if (playersTurn) {
        playersTurn = false;
        movePlayer1(diceRoll);

        if (diceRoll === 6) {
            playersTurn = true;
            player1Rolled6(diceRoll);
        } else {
            setTimeout(() => {
                rolleDiceNumber();
            }, 1600);
        }
    } else {
        playersTurn = true;
        moveAi(diceRoll);
        aIRolled6(diceRoll)
    }
};


/**
 * 
 Retrieving the name, image and the image for gamepawn the user has selected from local storage,
 and displaying it for the user.
 */

function characterRetrived() {
    let faceRetrieved = localStorage.getItem('character');
    let infoAboutFaces = JSON.parse(faceRetrieved);

    playerImg.innerHTML += `<div class="boardcontainer__player1">
                                <img class="boardcontainer__imgplayer1" src="${infoAboutFaces[0].image}" alt="Image of the character the user has chosen">
                                <p data-name="${infoAboutFaces[0].name}">${infoAboutFaces[0].name}</p>
                            </div>
                            <div class="boardcontainer__player2">
                                <img class="boardcontainer__imgplayer1" src="${infoAboutFaces[1].image}" alt="Image of the character the user has chosen as opponent">
                                <p data-name="${infoAboutFaces[1].name}">${infoAboutFaces[1].name}</p>
                            </div>`;
    player1.innerHTML = `<img class="player1pawn" src="${infoAboutFaces[0].gamePawn}" alt="image of the pawn for the player">`;
    player2.innerHTML = `<img class="player2pawn" src="${infoAboutFaces[1].gamePawn}" alt="Image of the pawn for the opponent/AI">`;
};

characterRetrived();


//Function to move the player, gets the diceroll from function rollDice
function movePlayer1(diceRoll) {
    player1Postion += diceRoll;
    let newGridId = '#grid_' + player1Postion;

    if (playerIsWinner(player1Postion)) {
        document.querySelector('#grid_32').appendChild(player1);

        diceImg.removeEventListener('click', rolleDiceNumber);

        setTimeout(() => {
            window.location.href = "/html/winnerpage.html";
            localStorage.setItem('Winner', 0);
        }, 1300);
    } else {
        document.querySelector(newGridId).appendChild(player1);
    }
    checkForTrapsPlayer(newGridId, player1Postion);
};

movePlayer1(0);





function playerIsWinner(playerPosition) {
    return playerPosition >= numberOfTiles
}





//Function to move the player, gets the diceroll from function rollDice
function moveAi(diceRoll2) {
    player2Postion += diceRoll2;
    let newGridId = '#grid_' + player2Postion;

    if (playerIsWinner(player2Postion)) {
        document.querySelector('#grid_32').appendChild(player2);
        diceImg.removeEventListener('click', rolleDiceNumber);
        setTimeout(() => {
            window.location.href = "/html/winnerpage.html";
            localStorage.setItem('Winner', 1);
        }, 1300);
    } else {
        document.querySelector(newGridId).appendChild(player2);
    }
    checkForTrapsAi(newGridId);
};

moveAi(0);




function checkForTrapsPlayer(updatedGridId) {
    let trap = gridTile.includes(updatedGridId);
    if (trap) {
        messageForTraps();

        setTimeout(() => {
            player1Postion = 1
            originalState.appendChild(player1)
        }, 1000);


    }
};



function checkForTrapsAi(updateTile) {
    let trap = gridTile.includes(updateTile);
    if (trap) {

        messageForTraps();

        setTimeout(() => {
            player2Postion = 1
            originalState.appendChild(player2)
        }, 1000);
    }
};




function messageForTraps() {
    trapMessage.innerHTML = `<p class="message-txt">You stepped on a 
                             trap. Move back to square one</p>`;

    setTimeout(() => {
        trapMessage.innerHTML = '';
    }, 1000);
};




// User has rolled 6 and gets a new chance to roll the dice
function player1Rolled6(rollingDice) {
    if (rollingDice === 6) {
        dice6P1.innerHTML = `<p class="message-txt">You rolled a six, throw the dice again`

        setTimeout(() => {
            dice6P1.innerHTML = '';
        }, 3000);
    }
};




function aIRolled6(machineRoll) {
    if (machineRoll === 6) {
        dice6P2.innerHTML = `<p class="message-txt">Machine rolled a six, throw the dice again`
        playersTurn = false;
        setTimeout(() => {
            rolleDiceNumber();
            dice6P2.innerHTML = '';
        }, 3000);
    }
};

