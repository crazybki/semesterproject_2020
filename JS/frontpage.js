import { getCharacters } from "/JS/got_JSON.js";


const getCharaterFaces = document.querySelector('.container_characters');
const face = document.querySelector('.chosenFace');

getCharacters.forEach(element => {
    getCharaterFaces.innerHTML += `<div>
                                        <img class="face-images" data-id="${element.Id}" data-name="${element.Name}" src="${element.image}">
                                    </div>`
});





const images = document.querySelectorAll('.face-images');

images.forEach(buttons => {
    buttons.addEventListener('click', characterIsChosen)
});


function characterIsChosen() {
    const img = this.src;
    const imgUrl = img.slice(21,60);
    let name = this.dataset.name;    

    let arr = [name, imgUrl];
    console.log(arr)


    
    let storeCharacther = localStorage.setItem('url', JSON.stringify(arr));
    face.innerHTML = `<p>You chose ${name}</p>`;



    setTimeout(() => {

        if(storeCharacther !== null) {
            location.href = "/html/games.html";
        }
    }, 4000);

};