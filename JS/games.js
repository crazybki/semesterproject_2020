//Storing the images chosen from user
const playerImg = document.querySelector('.boardcontainer__playerimg');


//Get button, for dices and for players
const diceBtnPlayer = document.querySelector('#btn_dice');
const diceBtnMachine = document.querySelector('#btn_dice2');
const diceEl = document.querySelector('#dice1');
const diceEl2 = document.querySelector('#dice2');
const player1 = document.querySelector('#player1');
const dice6P1 = document.querySelector('.bordercontainer__rolledsixhuman')
const dice6P2 = document.querySelector('.bordercontainer__rolledsixmachine')
const movepawn = document.querySelector('.player1pawn');
const movepawn1 = document.querySelector('.player2pawn');
const player2 = document.querySelector('#player2');
let trapMessage = document.querySelector('.message');
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
    gotTheme.play();
    diceEl.innerHTML = `<img class="dice__player1" src="/images/1x/dice1_1.png">`;
});


//New testing

let playersTurn = false;
let machineTurn = false;

diceEl.addEventListener('click', rolleDiceNumber);

function rolleDiceNumber() {
    let diceRoll = Math.floor(Math.random() * 6) + 1;
    console.log(diceRoll)
    diceEl.innerHTML = `<img class="dice__player1" src="/images/1x/dice1_${diceRoll}.png">`;

    if (!playersTurn) {
        playersTurn = true;
        movePlayer1(diceRoll);
        player1Rolled6(diceRoll);
    } else {
        machineTurn = true;
        playersTurn = false;
        movePlayer2(diceRoll);
        machineRolled6(diceRoll)
    }
};

//New testing



/**
 * 
 Retrieving the name, image and the image for gamepawn the user has selected from local storage,
 and displaying it for the user.
 */

function characterRetrived() {
    let faceRetrieved = localStorage.getItem('character');
    let infoAboutFaces = JSON.parse(faceRetrieved);

    playerImg.innerHTML += `<div class="boardcontainer__player1">
                                <img class="boardcontainer__imgplayer1" src="${infoAboutFaces[0].image}">
                                <p data-name="${infoAboutFaces[0].name}">${infoAboutFaces[0].name}</p>
                            </div>
                            <div class="boardcontainer__player2">
                                <img class="boardcontainer__imgplayer1" src="${infoAboutFaces[1].image}">
                                <p data-name="${infoAboutFaces[1].name}">${infoAboutFaces[1].name}</p>
                            </div>`;
    player1.innerHTML = `<img class="player1pawn" src="${infoAboutFaces[0].gamePawn}">`;
    player2.innerHTML = `<img class="player2pawn" src="${infoAboutFaces[1].gamePawn}">`;
};

characterRetrived();


//Function to move the player, gets the diceroll from function rollDice
function movePlayer1(diceRoll) {
    player1Postion += diceRoll;
    let newGridId = '#grid_' + player1Postion;

    if (player1Postion >= 32) {
        document.querySelector('#grid_32').appendChild(player1);

        setTimeout(() => {
            window.location.href = "/html/winnerpage.html"
            let player1Img = document.querySelector('.boardcontainer__player1 img');
            let player1Name = document.querySelector('.boardcontainer__player2 p');
            let imgSrc = player1Img.src;
            let dataName = player1Name.dataset.name;
            let playerObject = { img: imgSrc, name: dataName }
            winnerOfTheGame.push(playerObject);
            localStorage.setItem('Winner', JSON.stringify(winnerOfTheGame));
        }, 1500);
    } else {
        document.querySelector(newGridId).appendChild(player1);
    }
    checkForTrapsP1(newGridId, player1Postion);
};

movePlayer1(0);



//Function to move the player, gets the diceroll from function rollDice
function movePlayer2(diceRoll2) {
    player2Postion += diceRoll2;
    let newGridId = '#grid_' + player2Postion;

    if (player2Postion >= 32) {
        document.querySelector('#grid_32').appendChild(player2);

        setTimeout(() => {
            window.location.href = "/html/winnerpage.html";
            let player2Img = document.querySelector('.boardcontainer__player2 img');
            let player2Name = document.querySelector('.boardcontainer__player2 p');
            let imgSrc2 = player2Img.src;
            let dataName2 = player2Name.dataset.name;
            let player2Object = { img: imgSrc2, name: dataName2 }
            winnerOfTheGame.push(player2Object);
            localStorage.setItem('Winner', JSON.stringify(winnerOfTheGame));
        }, 1500);
    } else {
        document.querySelector(newGridId).appendChild(player2);
    }
    checkForTrapsP2(newGridId);
};

movePlayer2(0);


function checkForTrapsP1(updatedGridId, pos) {
    let trap = gridTile.includes(updatedGridId);
    if (trap) {
        trap1();

        setTimeout(() => {
            player1Postion = 1
            originalState.appendChild(player1)
        }, 1300);


    }
};

function checkForTrapsP2(updateTile) {
    let trap = gridTile.includes(updateTile);
    if (trap) {

        trap1();

        setTimeout(() => {
            player2Postion = 1
            originalState.appendChild(player2)
        }, 1300);
    }
};


function trap1() {
    trapMessage.innerHTML = `<p class="message-txt">You stepped on a 
                             trap. Move back to square one</p>`;

    setTimeout(() => {
        trapMessage.innerHTML = '';
    }, 1800);
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


function machineRolled6(machineRoll) {
    if (machineRoll === 6) {
        dice6P2.innerHTML = `<p class="message-txt">You rolled a six, throw the dice again`

        setTimeout(() => {
            dice6P2.innerHTML = '';
        }, 3000);
    }
};

