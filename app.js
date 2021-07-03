const game = {
    entryForm: {
        viewer: document.querySelector("#entry"),
        playerOne: document.querySelector("#input-p1"),
        playerTwo: document.querySelector("#input-p2"),
        playButton: document.querySelector("#btn-play")
    },
    history: {
        viewer: document.querySelector("#history"),
        data: document.querySelector("#history-data"),
        playerOne: {
            name: document.querySelector("#col-p1"),
            scores: []
        },
        playerTwo: {
            name: document.querySelector("#col-p2"),
            scores: []
        },
        timestamp: [],
        winners: []
    },
    viewer: document.querySelector("#game"),
    isGameOver: false,
    winner: "",
    
    winningScoreOptions: [5,6,7,8,9,10,11,12,13,14,15],
    winningScoreSelect: document.querySelector("#winning-score"),
    defaultWinningScore: 5,
    winningScore: 5,

    winByOptions: [1,2,3,4,5],
    winBySelect: document.querySelector("#win-by"),
    defaultWinBy: 2,
    winBy: 2,
    
    resetButton: document.querySelector("#btn-reset"),
    playerOne: {
        score: 0,
        name: "Player One",
        button: document.querySelector("#btn-p1"),
        display: document.querySelector("#display-p1")
    },
    playerTwo: {
        score: 0,
        name: "Player Two",
        button: document.querySelector("#btn-p2"),
        display: document.querySelector("#display-p2")
    }
};

game.playerOne.button.addEventListener("click", function(){
    updateScores(game.playerOne,game.playerTwo);
});
game.playerTwo.button.addEventListener("click", function(){
    updateScores(game.playerTwo,game.playerOne);
});
game.resetButton.addEventListener("click", function(){
    gameInit();
});
game.entryForm.playButton.addEventListener("click", function(){
    gameEntry();
});
game.winningScoreSelect.addEventListener("change",function(){
    game.winningScore = parseInt(game.winningScoreSelect.value);
    reset();
});
game.winBySelect.addEventListener("change",function(){
    game.winBy = parseInt(game.winBySelect.value);
    reset();
});

function updateScores(player, opponent){
    if(!game.isGameOver){
        player.score++;
        let hasWonBy = player.score-opponent.score >= game.winBy;
        if(player.score>=game.winningScore && hasWonBy){
            game.isGameOver = true;
            player.display.classList.add("has-text-success");
            opponent.display.classList.add("has-text-danger");
            player.button.disabled = true;
            opponent.button.disabled = true;
            game.winner = player.name;
            updateHistory();
        }
        if(player.score + opponent.score === 1){
            game.resetButton.disabled = false;
            game.winningScoreSelect.disabled = !game.resetButton.disabled;
            game.winBySelect.disabled = !game.resetButton.disabled;
        }
        player.display.textContent = player.score;
    }
}

function reset(isGameReset){
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

        game.winBy = game.defaultWinBy;
        game.winBySelect.value = game.winBy;
        game.winBySelect.disabled = false;
    }else{
        game.winningScore = parseInt(game.winningScoreSelect.value);
        game.winBy = parseInt(game.winBySelect.value);
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
    game.winBySelect.textContent = "";
    for(let o of game.winByOptions){
        const opt = document.createElement("option");
        opt.value = o;
        opt.textContent = o;
        game.winBySelect.append(opt);
    }
    reset(true);
}

function gameEntry(){
    if(game.entryForm.playerOne.value){
        game.playerOne.name = game.entryForm.playerOne.value;
    }
    if(game.entryForm.playerTwo.value){
        game.playerTwo.name = game.entryForm.playerTwo.value;
    }
    game.entryForm.viewer.classList.toggle("is-hidden");
    game.viewer.classList.toggle("is-hidden");

    gameInit();
}

function updateHistory(){
    game.history.winners.push(game.winner);
    game.history.timestamp.push((new Date()).toLocaleTimeString());
    game.history.playerOne.scores.push(game.playerOne.score);
    game.history.playerTwo.scores.push(game.playerTwo.score);
    game.history.playerOne.name.textContent = game.playerOne.name.slice(0,2)+game.playerOne.name.slice(game.playerOne.name.length-1);
    game.history.playerTwo.name.textContent = game.playerTwo.name.slice(0,2)+game.playerTwo.name.slice(game.playerTwo.name.length-1);


    game.history.data.innerHTML="";
    for(let i=0; i<game.history.winners.length; i++){
        const tr = document.createElement("tr");
        const tdNum = document.createElement("td");
        const tdTime = document.createElement("td");
        const tdP1 = document.createElement("td");
        const tdP2 = document.createElement("td");
        const tdWinner = document.createElement("td");

        tdNum.textContent = i+1;
        tdTime.textContent = game.history.timestamp[i];
        tdP1.textContent = game.history.playerOne.scores[i];
        tdP2.textContent = game.history.playerTwo.scores[i];
        tdWinner.textContent = game.history.winners[i];

        tr.append(tdNum,tdTime,tdP1,tdP2, tdWinner);
        game.history.data.appendChild(tr);
    }
    game.history.viewer.classList.remove("is-hidden");
}