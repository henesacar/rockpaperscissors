const rock = document.querySelector(".rock");
rock.addEventListener("click", playRound.bind(null, "rock"));

const paper = document.querySelector(".paper");
paper.addEventListener("click", playRound.bind(null, "paper"));

const scissors = document.querySelector(".scissors");
scissors.addEventListener("click", playRound.bind(null, "scissors"));

const container = document.querySelector(".container");

const div = document.createElement("div");
container.appendChild(div);
div.classList.toggle("scores");

const player = document.createElement("p");
player.textContent = `Player Score: 0`;
div.appendChild(player);
player.classList.add("fs-2", "text", "d-inline-block", "text-white", "bg-dark", "mt-5", "pe-5");

const comp = document.createElement("p");
comp.textContent = `Computer Score: 0`;
div.appendChild(comp);
comp.classList.add("fs-2", "text", "d-inline-block", "text-white", "bg-dark", "mt-5", "ps-5");

const feed = document.createElement("p");
feed.classList.add("fs-2", "text");
div.appendChild(feed);

const restart = document.createElement("button");
restart.setAttribute("type", "button");
restart.textContent = "Restart";
div.appendChild(restart);
restart.style.display = "none";
restart.classList.add("btn", "btn-primary", "btn-lg");

let pScore = 0;
let cScore = 0;

function computerPlay() {
    const rando = Math.floor(Math.random() * 3) + 1;
    switch (rando) {
        case 1:
            return "rock"
        case 2:
            return "paper"
        case 3:
            return "scissors"
    }
}

function playRound(playerChoice) {
    const computerChoice = computerPlay().toLowerCase()
    const choice = playerChoice.toLowerCase()
    let score;
    if (choice === "rock" && computerChoice === "paper") {
        score = -1;
    } else if (choice === "rock" && computerChoice === "scissors") {
        score = 1
    } else if (choice === "paper" && computerChoice === "rock") {
        score = 1
    } else if (choice === "paper" && computerChoice === "scissors") {
        score = -1
    } else if (choice === "scissors" && computerChoice === "rock") {
        score = -1
    } else if (choice === "scissors" && computerChoice === "paper") {
        score = 1
    } else if ((choice === "rock" && computerChoice === "rock") || (choice === "paper" && computerChoice === "paper") || (choice === "scissors" && computerChoice === "scissors")) {
        score = 0
    }
    scoreboard(score);
}

function scoreboard(stats) {

    if (stats === -1) {
        feed.textContent = "You've lost this round";
        if (!feed.classList.replace("text-warning", "text-danger")) {
            feed.classList.add("text-danger");
        }
        cScore++;
        comp.textContent = "Computer Score: " + cScore;
        winner(cScore);
    } else if (stats === 1) {
        feed.textContent = "You've won this round";
        if (!feed.classList.replace("text-danger", "text-warning")) {
            feed.classList.add("text-warning");
        }
        pScore++;
        player.textContent = "Player Score: " + pScore;
        winner(pScore);
    } else if (stats === 0) {
        feed.textContent = "This round has ended with a draw";
        if (!feed.classList.replace("text-warning", "text-info")) {
            feed.classList.replace("text-danger", "text-info");
        }
    }
}

function winner(score) {
    if (score === 5 && pScore === 5) {
        feed.textContent = "Congratulations. You've won the game. Click button to start again"
        if (!feed.classList.replace("text-warning", "text-info")) {
            feed.classList.replace("text-danger", "text-info");
        }
        restart.style.display = "block";
        rock.style.display = "none";
        paper.style.display = "none";
        scissors.style.display = "none";
        restart.addEventListener("click", clearBoard);
    } else if (score === 5 && cScore === 5) {
        feed.textContent = "Sorry. You've lost the game.Click button to start again";
        if (!feed.classList.replace("text-warning", "text-info")) {
            feed.classList.replace("text-danger", "text-info");
        }
        restart.style.display = "block";
        rock.style.display = "none";
        paper.style.display = "none";
        scissors.style.display = "none";
        restart.addEventListener("click", clearBoard);
    }
}

function clearBoard() {
    pScore = 0;
    cScore = 0;
    feed.textContent = "Game has restarted";
    comp.textContent = "Computer Score: " + cScore;
    player.textContent = "Player Score: " + pScore;
    rock.style.display = "inline";
    paper.style.display = "inline";
    scissors.style.display = "inline";
    restart.style.display = "none";
}
