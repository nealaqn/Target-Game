const container = document.querySelector(".container");
const cursor = document.querySelector(".cursor");

const bgAudio = document.createElement("audio");
const getReady = document.createElement("div");

const scoreboard = document.querySelector("#score");
const scoreTitle = document.querySelector(".score-title");

const levelboard = document.querySelector("#level");
const levelTitle = document.querySelector(".level-title")

const button = document.querySelector(".button");
const title = document.querySelector(".title");
const lives = document.querySelector(".container-lives");

let score = 0;
let health = 4;
let interval;
let timer;

let levelLabel = 1;
let level = 4500;

getReady.classList = "get-ready";
getReady.innerHTML = "Get Ready!"

target.src = "images/target.png";
target.classList = "target";

const appendLives = () => {
    lives.innerHTML = "";
    for(let i = 0; i < 4; i++) {
        const life = document.createElement("img");
        life.src = "images/heart.png";
        life.classList = "heart";
        document.querySelector(".container-lives").append(life);
    }
}

const moveCursor = (e) => {
    let cursorX = e.clientX - container.getBoundingClientRect().left - 22;
    let cursorY = e.clientY - container.getBoundingClientRect().top - 28;
    cursor.style.transform = 'translate(' + cursorX + 'px,' + cursorY + 'px)';
}

const gameLevel = () => {
    if (score == 10) {
        bgAudio.src = "audio/level-up.mp3"
        levelLabel++;
        levelboard.innerHTML = levelLabel;
        level = 3600;
        targetSpeed = 80;
    } else if (score == 20) {
        bgAudio.src = "audio/level-up.mp3"
        levelLabel++;
        levelboard.innerHTML = levelLabel;
        level = 2700;
        targetSpeed = 60;
    } else if (score == 40) {
        bgAudio.src = "audio/level-up.mp3"
        levelLabel++;
        levelboard.innerHTML = levelLabel;
        level = 1800;
        targetSpeed = 40;
    } else if (score == 70) {
        bgAudio.src = "audio/level-up.mp3"
        levelLabel++;
        levelboard.innerHTML = levelLabel;
        level = 1100;
        targetSpeed = 25;
    }
}

const startGame = () => {
    score = 0;
    health = 4;
    level = 4500;
    targetSpeed = 100;
    scoreboard.innerHTML = score;
    levelboard.innerHTML = levelLabel;
    button.style.display = "none";
    title.style.display = "none";
    levelTitle.style.display = "block";
    scoreTitle.style.display = "block";
    container.style.cursor = "none";
    cursor.style.display = "block";
    lives.style.display = "flex";
    appendLives();
    timer = setInterval(spawnTarget, level);
    bgAudio.src = "audio/rizz-sounds.mp3"
    document.querySelector(".container").append(getReady);
}

container.addEventListener("mousemove", moveCursor);
button.addEventListener("click", startGame);