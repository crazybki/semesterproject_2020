import { gotCharacters } from "/JS/got_JSON.js";

const heroPage = document.querySelector('.mission');


function missionStatement() {
    heroPage.innerHTML = `<p>Winter is coming! You have been chosen to warn the kingdoms, 
                             that the winter king is coming. You must reach the destination before the hordes 
                             of the winter zombies reaches the kingdoms before you.</p>

                            <p>Be aware! The path to the kingdoms is long and dangerous. 
                            There will be challenges on the way, you must resolve quick and fast or go back, 
                            and rethink your strategy.We are all depending upon you.</p>
                            
                          <p>Are you ready?</p>`
}

missionStatement();

//Elements for choosing characters
const charactersVimpels = document.querySelector('.container_charactherflags');
const characters = document.querySelector('.container_characters');
const missionBtn = document.querySelector('.mission-btn');

/**When clicking the button characters and flags of families appears
 * It also removes the former html and button. Gets the info from got_JSON file
 */

missionBtn.addEventListener('click', chooseCharacters);

function chooseCharacters() {

    heroPage.innerHTML = ``;
    missionBtn.remove();

    gotCharacters.forEach(element => {

        characters.innerHTML += `<img src="${element.image}">`

        if ( element.charactherFlag !== null) {
            return charactersVimpels.innerHTML += `<img class="characters_flag" src="${element.charactherFlag}">`;
        }
        console.log(element.image);
    });
}

