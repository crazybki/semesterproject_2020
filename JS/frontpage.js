import { getCharacters } from "/JS/got_JSON.js";

let storeImg = [];
const getCharaterFaces = document.querySelector('.container_characters');
const face = document.querySelector('#chosenFace');
const opponents = document.querySelector('#opponent');
const counterElement = document.querySelector('.chosenCharaters-countdown');
let counter = 10;
let characterChosen = false;
let starting = false;




getCharacters.forEach(element => {
    getCharaterFaces.innerHTML += `<div>
                                        <img class="face-images" data-id="${element.Id}" data-name="${element.Name}" src="${element.image}">
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

        let arr = { name: name, image: imgUrl }

        storeImg.push(arr)

        localStorage.setItem('character', JSON.stringify(storeImg));

        if (!characterChosen) {
            seeChosenCharacter(img, name);
            characterChosen = true;
        } else {
            starting = true;
            displayOpponent(img, name);
            gameStarting();
            setTimeout(() => {
                window.location.href = "/html/games.html";
            }, 11000);
        }
    }
};


function seeChosenCharacter(image, nameOfcharacter) {
    face.innerHTML = `<div class="player1">
                                    <img src="${image}">
                                    <p>You chose ${nameOfcharacter}</p>
                          </div>`;
};

function displayOpponent(image, nameOfcharacter) {
    opponents.innerHTML = `<div class="player2">
                                    <img src="${image}">
                                    <p>Your opponent ${nameOfcharacter}</p>
                          </div>`;
};


function gameStarting() {

    const countDown = setInterval(() => {
        if (counter <= 0) {
            clearInterval(countDown)
            counterElement.innerHTML = `<p>Games begin</p>`;
        } else {
            counter--;
            counterElement.innerHTML = `<span>${counter}</span>`;
        }

    }, 1000);
}