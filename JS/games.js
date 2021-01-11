import { getCharacters } from "/JS/got_JSON.js";

const listOfCharacters = getCharacters;

//Storing the images chosen from user
const playerImg = document.querySelector('.boardcontainer__playerimg');


//Get button, for dices and for players
const diceBtnPlayer = document.querySelector('#btn_dice');
const diceBtnMachine = document.querySelector('#btn_dice2');
const diceEl = document.querySelector('#dice1');
const diceEl2 = document.querySelector('#dice2');
const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
let trapMessage = document.querySelector('.message');
diceBtnMachine.disabled = true;

//Sounds
const rolledSixSound = new Audio('/sounds/playerRolled6.wav')
const playerWinsGame = new Audio('/sounds/playerwin.wav');
const gotTheme = new Audio('/sounds/GOT_theme.mp3');

//Starting position for players
let player1Postion = 1;
let player2Postion = 1;
let originalState = document.querySelector('#grid_1');

//These values are used to recognize the different traps
const gridTile = ['#grid_6', '#grid_10', '#grid_15', '#grid_20', '#grid_29'];


//
window.addEventListener('load', (event) => {
    async function loader() {
        try {
            gotTheme.play();
            diceEl.innerHTML = `<img src="/images/1x/dice1_1.png">`;
            diceEl2.innerHTML = `<img src="/images/1x/dice2_1.png">`;
        }
        catch (error) {
            console.log('Error has accoured')
        }
    }
    loader()
});


/**
 * 
 Retrieving the name, image and the image for gamepawn the user has selected from local storage,
 and displaying it for the user.
 */

function characterRetrived() {
    let faceRetrieved = localStorage.getItem('character');
    let infoAboutFaces = JSON.parse(faceRetrieved);

    playerImg.innerHTML += `<div class="boardcontainer-images1">
                                <img src="${infoAboutFaces[0].image}">
                                <p>${infoAboutFaces[0].name}</p>
                            </div>
                            <div class="boardcontainer-images2S">
                                <img src="${infoAboutFaces[1].image}">
                                <p>${infoAboutFaces[1].name}</p>
                            </div>`;

    player1.innerHTML = `<img class="player1pawn" src="${infoAboutFaces[0].gamePawn}">`;
    player2.innerHTML = `<img class="player2pawn" src="${infoAboutFaces[1].gamePawn}">`;
};

characterRetrived();



//Event listener for rolling the dice
diceBtnPlayer.addEventListener('click', rollDice);
diceBtnMachine.addEventListener('click', rollDiceMachine);


function rollDice(e) {

    e.preventDefault();
    let diceRoll = Math.floor(Math.random() * 6) + 1;
    diceEl.innerHTML = `<img src="/images/1x/dice1_${diceRoll}.png">`;

    if (rollDice) {
        diceBtnPlayer.disabled = true;
        diceBtnMachine.disabled = false;
    } else {
        diceBtnPlayer.disabled = true;
    }
    movePlayer1(diceRoll);
    player1Rolled6(diceRoll)
};

function rollDiceMachine(e) {

    e.preventDefault();
    let diceRoll2 = Math.floor(Math.random() * 6) + 1;
    diceEl2.innerHTML = `<img src="/images/1x/dice2_${diceRoll2}.png">`;

    if (rollDiceMachine) {
        diceBtnMachine.disabled = true;
        diceBtnPlayer.disabled = false;
    } else {
        diceBtnMachine.disabled = false;
    }
    movePlayer2(diceRoll2);
    machineRolled6(diceRoll2)
};


//Function to move the player, gets the diceroll from function rollDice
function movePlayer1(diceRoll) {
    player1Postion += diceRoll;
    let newGridId = '#grid_' + player1Postion;

    if (player1Postion >= 31) {
        document.querySelector('#grid_31').appendChild(player1);
        //window.location.href = "/html/winnerpage.html"
        console.log('Player 1 is the winner')
        playerWinsGame.play();
    } else {
        document.querySelector(newGridId).appendChild(player1);
    }
    checkForTrapsP1(newGridId);
};

movePlayer1(0);


//Function to move the player, gets the diceroll from function rollDice
function movePlayer2(diceRoll2) {

    player2Postion += diceRoll2;
    let newGridId = '#grid_' + player2Postion;

    if (player2Postion >= 31) {
        document.querySelector('#grid_31').appendChild(player2);
        // window.location.href = "/html/winnerpage.html"
        console.log('player 2 is the winner');
        playerWinsGame.play();
    } else {
        document.querySelector(newGridId).appendChild(player2);
    }
    checkForTrapsP2(newGridId);


};

movePlayer2(0);



function checkForTrapsP1(updatedGridId) {
    let trap = gridTile.includes(updatedGridId);

    if (trap) {
        trap1();

        setTimeout(() => {
            player1Postion = 1
            originalState.appendChild(player1)
        }, 1800);

        console.log('player1 ' + updatedGridId)
    }
}

function checkForTrapsP2(updateTile) {
    let trap = gridTile.includes(updateTile);
    if (trap) {

        trap1();

        setTimeout(() => {
            player2Postion = 1
            originalState.appendChild(player2)
        }, 1800);
        console.log('player2 ' + updateTile)
    }
}


function trap1() {
    trapMessage.innerHTML = `<p class="message-txt">Ooh no, you stepped on a 
                             trap, move back to square one</p>`;

    setTimeout(() => {
        trapMessage.innerHTML = '';
    }, 4000);
}



// User has rolled 6 and gets a new chance to roll the dice
function player1Rolled6(rollingDice) {
    if (rollingDice === 6) {
        diceBtnPlayer.disabled = false;
        diceBtnMachine.disabled = true;
        rolledSixSound.play();
    }
}

function machineRolled6(machineRoll) {
    if (machineRoll === 6) {
        diceBtnPlayer.disabled = true;
        diceBtnMachine.disabled = false;
        rolledSixSound.play();
    }
}