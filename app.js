const game = {
    isGameOver: false,
    defaultWinningScore: 5,
    winningScore: 3,
    winningScoreOptions: [3,5,8,11],
    winningScoreSelect: document.querySelector("#winningScore"),
    resetButton: document.querySelector("#btnReset"),
    playerOne: {
        score: 0,
        name: "Player One",
        button: document.querySelector("#btnPlayerOne"),
        display: document.querySelector("#p1Display")
    },
    playerTwo: {
        score: 0,
        name: "Player Two",
        button: document.querySelector("#btnPlayerTwo"),
        display: document.querySelector("#p2Display")
    }
};

game.playerOne.button.addEventListener("click", function(){
    updateScores(game.playerOne,game.playerTwo);
});
game.playerTwo.button.addEventListener("click", function(){
    updateScores(game.playerTwo,game.playerOne);
});

function updateScores(player, opponent){
    if(!game.isGameOver){
        player.score++;
        if(game.winningScore==player.score){
            game.isGameOver = true;
            player.display.classList.add("has-text-success");
            opponent.display.classList.add("has-text-danger");
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        if(player.score + opponent.score === 1){
            game.resetButton.disabled = false;
            game.winningScoreSelect.disabled = !game.resetButton.disabled;
        }
        player.display.textContent = player.score;
    }
}

game.resetButton.addEventListener("click", function(){
    gameInit();
});

game.winningScoreSelect.addEventListener("change",function(){
    game.winningScore = parseInt(game.winningScoreSelect.value);
    reset();
});

function reset(isGameReset){
    console.log("Winning Score: ", game.winningScore);
    for(let p of [game.playerOne, game.playerTwo]){
        p.score=0;
        p.display.textContent=0;
        p.button.innerHTML = "+1 " +p.name;
        p.display.classList.remove("has-text-success", "has-text-danger");
        p.button.disabled = false;
    }
    if (isGameReset){
        game.winningScore = game.defaultWinningScore;
        game.winningScoreSelect.value = game.winningScore;
        game.winningScoreSelect.disabled = false;
    }else{
        game.winningScore = parseInt(game.winningScoreSelect.value);
    }
    game.isGameOver = false;
    game.resetButton.disabled = game.winningScore===game.defaultWinningScore;
}

function gameInit(){
    game.winningScoreSelect.textContent = "";
    for(let o of game.winningScoreOptions){
        const opt = document.createElement("option");
        opt.value = o;
        opt.textContent = o;
        game.winningScoreSelect.append(opt);
    }
    reset(true);
}

gameInit();