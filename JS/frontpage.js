import { getCharacters } from "/JS/got_JSON.js";

let storeImg = [];
const getCharaterFaces = document.querySelector('.container_characters');
const face = document.querySelector('#chosenFace');
const opponents = document.querySelector('#opponent')
let characterChosen = false;
let starting = false;




getCharacters.forEach(element => {
    getCharaterFaces.innerHTML += `<div>
                                        <img class="face-images" data-id="${element.Id}" data-name="${element.Name}" src="${element.image}">
                                    </div>`
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
            setTimeout(() => {
                window.location.href = "/html/games.html";
                console.log('redirect')
            }, 1000);
        }
    }
};


function seeChosenCharacter(image, nameOfcharacter) {
    face.innerHTML = `<div id="test12">
                                    <img src="${image}">
                                    <p>You chose ${nameOfcharacter}</p>
                          </div>`;
};

function displayOpponent(image, nameOfcharacter) {
    opponents.innerHTML = `<div id="test12">
                                    <img src="${image}">
                                    <p>You chose ${nameOfcharacter}</p>
                          </div>`;


};