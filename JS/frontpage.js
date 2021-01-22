import { getCharacters } from "/JS/got_JSON.js";


const getCharaterFaces = document.querySelector('.containercharacters__images');
const face = document.querySelector('.chosenCharaters__chosenFace');
const opponents = document.querySelector('.chosenCharaters__opponent');
const counterElement = document.querySelector('.chosenCharaters__countdown');
const introElement = document.querySelector('.container__introtxt');
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
    getCharaterFaces.innerHTML += `<div class="containercharacters__cards">
                                        <img class="containercharacters__faces" data-gamepawn="${element.pawn}" alt="images of the characters the user can choose from" 
                                        data-name="${element.Name}" src="${element.image}">
                                        <p class="face-names">${element.Name}</p>
                                    </div>`;
});





const images = document.querySelectorAll('.containercharacters__faces');

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

        let localStorageInfo = {
            name: name,
            image: imgUrl,
            gamePawn: game_piece
        };

        storeImg.push(localStorageInfo);
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
            }, 11000);
        }
    }
};


function player1Chosen(image, nameOfcharacter) {
    face.innerHTML = `<div class="chosencharacters_player1">
                                    <img class="player1" src="${image}" alt="image of the user chose">
                                    <p class="names">${nameOfcharacter}</p>
                          </div>`;
    info.innerHTML = `<div class="chosencharacter_enemy">Choose your opponents</div>`
};

function player2Chosen(image, nameOfcharacter) {
    opponents.innerHTML = `<div class="chosencharacters_player2">
                                    <img class="player2" src="${image}" alt="image of the user chose as opponent">
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