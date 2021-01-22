const heading = document.querySelector('.container');
const imgOfWinner = document.querySelector('.winnerImg');
const resetBtn = document.querySelector('.resetgame__btn');

function retirevedFromLocalStorage() {
    let charaters = JSON.parse(localStorage.getItem('character'));
    let winner = localStorage.getItem('Winner');
    let getWinner = charaters[winner];
    heading.innerHTML = `<h1 class="container__heading1">${getWinner.name} is the winner</h1>`;
    imgOfWinner.innerHTML = `<img class="winnerimg__character" src="${getWinner.image}"> alt="image of the character that won"`;
}
retirevedFromLocalStorage();



resetBtn.addEventListener('click', resetGame);

function resetGame() {
    window.localStorage.clear();
    window.location.href = "/html/frontpage.html";
}




