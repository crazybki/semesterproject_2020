import { getCharacters } from "/JS/got_JSON.js";


const getCharaterFaces = document.querySelector('.container__characters');
const face = document.querySelector('#chosenFace');
const opponents = document.querySelector('#opponent');
const counterElement = document.querySelector('.chosenCharaters-countdown');
const introElement = document.querySelector('.introtxt');
const chooseCharacterElement = document.querySelector('.pageintro-txt');
const info = document.querySelector('.chosencharacters__info')

//
let storeImg = [];
let counter = 10;
let characterChosen = false;
let starting = false;



//Function for intro txt

function infoAboutGame() {
    introElement.innerHTML = `<h2 class="introtxt__head2">Winter is coming!</h2> 
                              <p class="introtxt__message">Your mission is to take the iron throne
                              in the Red Keep. You must arrive before your opponent to the 
                              throne. The road is dangerous and treacherous, so be carefull, and 
                              look out for traps.</p> 
                              
                              <p class="introtxt__charactherchosen">Choose your charachters</p>`
}

infoAboutGame();






// Retrieving all characthers for the gamer to choose from
getCharacters.forEach(element => {
    getCharaterFaces.innerHTML += `<div class="face__card">
                                        <img class="face-images" data-gamepawn="${element.pawn}" 
                                        data-name="${element.Name}" src="${element.image}">
                                        <p class="face-names">${element.Name}</p>
                                    </div>`;
});





const images = document.querySelectorAll('.face-images');

images.forEach(buttons => {
    buttons.addEventListener('click', characterIsChosen)
});

//




function characterIsChosen() {
    if (!starting) {
        let img = this.src;
        let imgUrl = img.slice(21, 60);
        let name = this.dataset.name;
        let game_piece = this.dataset.gamepawn;

        let arr = { name: name, image: imgUrl, gamePawn: game_piece };

        storeImg.push(arr);
        console.log(storeImg);

        introElement.remove();
        chooseCharacterElement.innerHTML = `<p class="pageintro-msg">vs</p>`

        localStorage.setItem('character', JSON.stringify(storeImg));

        if (!characterChosen) {
            player1Chosen(img, name);
            characterChosen = true;
        } else {
            starting = true;
            player2Chosen(img, name);
            gameStarting();
            setTimeout(() => {
                window.location.href = "/html/games.html";
            }, 12000);
        }
    }
};


function player1Chosen(image, nameOfcharacter) {
    face.innerHTML = `<div class="chosencharacters_player1">
                                    <img class="player1" src="${image}">
                                    <p class="names">${nameOfcharacter}</p>
                          </div>`;
    info.innerHTML = `<div class="chosencharacter_opponent">Choose your opponents</div>`
};

function player2Chosen(image, nameOfcharacter) {
    opponents.innerHTML = `<div class="chosencharacters_player2">
                                    <img class="player2" src="${image}">
                                    <p class="names">${nameOfcharacter}</p>
                          </div>`;
    info.innerHTML = '';
};


function gameStarting() {

    const countDown = setInterval(() => {
        if (counter <= 0) {
            clearInterval(countDown)

        } else {
            counter--;
            counterElement.innerHTML = `<span class="counter">Game begins in ${counter}</span>`;
        }

    }, 1000);
}