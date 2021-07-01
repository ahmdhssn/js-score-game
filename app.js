// const p1 = {
//     score: 0,
//     button: document.querySelector('#p1Button'),
//     display: document.querySelector('#p1Display')
// }
// const p2 = {
//     score: 0,
//     button: document.querySelector('#p2Button'),
//     display: document.querySelector('#p2Display')
// }

// const resetButton = document.querySelector('#reset');
// const winningScoreSelect = document.querySelector('#playto');
// let winningScore = 3;
// let isGameOver = false;

// function updateScores(player, opponent) {
//     if (!isGameOver) {
//         player.score += 1;
//         if (player.score === winningScore) {
//             isGameOver = true;
//             player.display.classList.add('has-text-success');
//             opponent.display.classList.add('has-text-danger');
//             player.button.disabled = true;
//             opponent.button.disabled = true;
//         }
//         player.display.textContent = player.score;
//     }
// }


// p1.button.addEventListener('click', function () {
//     updateScores(p1, p2)
// })
// p2.button.addEventListener('click', function () {
//     updateScores(p2, p1)
// })


// winningScoreSelect.addEventListener('change', function () {
//     winningScore = parseInt(this.value);
//     reset();
// })

// resetButton.addEventListener('click', reset)

// function reset() {
//     isGameOver = false;
//     for (let p of [p1, p2]) {
//         p.score = 0;
//         p.display.textContent = 0;
//         p.display.classList.remove('has-text-success', 'has-text-danger');
//         p.button.disabled = false;
//     }
// }

let p1Score = 0;
let p2Score = 0;
let defaultWinningScore = 5;
let winningScore = defaultWinningScore;
let isGameOver = false;

const p1Display = document.querySelector("#p1Display");
const p2Display = document.querySelector("#p2Display");
const playTo = document.querySelector("#winningScore");
const p1Button = document.querySelector("#btnPlayerOne");
const p2Button = document.querySelector("#btnPlayerTwo");
const resetButton = document.querySelector("#btnReset");

p1Button.addEventListener("click", (e)=>{
    console.log("isGameOver: ", isGameOver);
    if(!isGameOver){
        p1Score++;
        if(winningScore==p1Score){
            isGameOver = true;
            p1Display.classList.add("has-text-success");
            p2Display.classList.add("has-text-danger");
        }
        p1Display.textContent = p1Score;
    }
});
p2Button.addEventListener("click", (e)=>{
        console.log("isGameOver: ", isGameOver);
    if(!isGameOver){
        p2Score++;
        if(winningScore==p2Score){
            isGameOver = true;
            p1Display.classList.add("has-text-danger");
            p2Display.classList.add("has-text-success");
        }
        p2Display.textContent = p2Score;
    }
});
resetButton.addEventListener("click", ()=>{
    winningScore = defaultWinningScore;
    reset();
});

playTo.addEventListener("change",function(){
    winningScore = parseInt(this.value);
    reset();
});

function reset(){
    console.log("Winning Score: ", winningScore);
    p1Score = 0;
    p2Score = 0;
    p1Display.textContent = 0;
    p2Display.textContent = 0;
    p1Display.classList.remove("loserScore", "winnerScore");
    p2Display.classList.remove("loserScore", "winnerScore");
    playTo.value = winningScore;
    isGameOver = false;
}
