import { getCharacters } from "/JS/got_JSON.js";

const listOfCharacters = getCharacters;

console.log(listOfCharacters)

const img = document.querySelector('#character');
const playerPawns = document.querySelector('.board')


function characterRetrived () {
    let faceRetrieved = JSON.parse(localStorage.getItem('url'));
    console.log(faceRetrieved)
    

    img.innerHTML = `<div>
                        <img src="${faceRetrieved[1]}">
                        <p>${faceRetrieved[0]}</p>
                    </div>`;
                    
    showPawn(faceRetrieved)
}

characterRetrived()


function showPawn(faces) {
    switch(faces[0]) {
        case 'Alys Arryn': 
            playerPawns.innerHTML = `<img src="/images/1x/arryn_pawn.png">`
        break;

        case 'Artys I Arryn':
            playerPawns.innerHTML = `<img src="/images/1x/arryn_pawn.png">`
        break;

        case 'Jaime Lannister': 
            playerPawns.innerHTML = `<img src="/images/1x/lannister_pawn.png">`
        break;
        
        case 'Tyrion Lannister': 
            playerPawns.innerHTML = `<img src="/images/1x/lannister_pawn.png">`
            console.log(playerPawns.innerHTML)
        break;
         
        case 'Myrcella Baratheon':
            playerPawns.innerHTML = `<img src="/images/1x/baratheon_pawn.png">`
        break;

        case 'Ormund Baratheon': 
            playerPawns.innerHTML = `<img src="/images/1x/baratheon_pawn.png">`
        break;

        case 'Rhaenys Targaryen':
            playerPawns.innerHTML = `<img src="/images/1x/targeryan_pawn.png">`
            console.log( playerPawns.innerHTML)
        break;

        case 'Daenerys Targaryen':
            playerPawns.innerHTML = `<img src="/images/1x/targeryan_pawn.png">`
        break;

        case 'Theon Greyjoy':
            playerPawns.innerHTML = `<img src="/images/1x/greyjoy_pawn.png">`
        break;

        case 'Euron Greyjoy':
            playerPawns.innerHTML = `<img src="/images/1x/greyjoy_pawn.png">`
            console.log(playerPawns.innerHTML)
        break;


    }

}



