const heading = document.querySelector('.container');
const imgOfWinner = document.querySelector('.winnerImg');

function retirevedFromLocalStorage() {
    let retrieveWinner = localStorage.getItem('Winner');
    let getWinner = JSON.parse(retrieveWinner);

    heading.innerHTML = `<h1 class="container__heading1">${getWinner[0].name} is the winner</h1>`;
    imgOfWinner.innerHTML = `<img class="winnerimg__character" src="${getWinner[0].img}">`;
}



retirevedFromLocalStorage();




