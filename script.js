const container = document.querySelector(".container");
const cursor = document.querySelector(".cursor");

const target = document.createElement("img");
const hitAudio = document.createElement("audio");
const bgAudio = document.createElement("audio");
const getReady = document.createElement("div");

const scoreboard = document.querySelector("#score");
const scoreTitle = document.querySelector(".score-title");

const levelboard = document.querySelector("#level");
const levelTitle = document.querySelector(".level-title")

const button = document.querySelector(".button");
const title = document.querySelector(".title");
const lives = document.querySelector(".container-lives");

let randWidth = 0;
let randHeight = 0;
let score = 0;
let health = 4;
let interval;
let timer;


let currentTargetSize = 0;// for target file
let constTargetSpeed = 0.05;// for target file

let levelLabel = 1;
let level = 4500;
let targetSpeed = 100;// for target file

getReady.classList = "get-ready";
getReady.innerHTML = "Get Ready!"

target.src = "images/target.png";
target.classList = "target";

hitAudio.autoplay = "autoplay";
bgAudio.autoplay = "autoplay";

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

const targetHit = () => {
    score++
    target.remove();
    hitAudio.src = "audio/hit.mp3"
    scoreboard.innerHTML = score;
    clearInterval(timer);
    spawnTarget();
    gameLevel();
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

const moveUp = () => {
    if (currentTargetSize > 1.05) {
        clearInterval(interval);
        moveDown();
        return;
    };
    target.style.transform = "scale("+ currentTargetSize +")";
    currentTargetSize += constTargetSpeed;
}

const moveDown = () => {
    interval = setInterval(() => {
        if (currentTargetSize <= 0) {
            spawnTarget();
            bgAudio.src = "audio/lose-life.wav"
            health--;
            lives.lastChild.remove()
        }
        
        if (health == 0) {
            levelLabel = 1
            target.remove();
            levelboard.innerHTML = levelLabel;
            button.style.display = "block";
            title.style.display = "block";
            scoreTitle.style.display = "none";
            container.style.cursor = "auto";
            cursor.style.display = "none";
            lives.style.display = "flex";
            levelTitle.style.display = "none";
            clearInterval(interval);
            clearInterval(timer);
        }
        currentTargetSize -= constTargetSpeed;
        target.style.transform = "scale("+ currentTargetSize +")";
    }, targetSpeed)
}

const spawnTarget = () => {
    currentTargetSize = 0;
    clearInterval(interval);
    document.querySelector(".container").append(target);
    randWidth = Math.floor(Math.random() * 700);
    randHeight = Math.floor(Math.random() * 450);
    target.style.left = randWidth + "px";
    target.style.top = randHeight + "px";
    target.style.transform = "scale(0)";
    interval = setInterval(moveUp, targetSpeed);
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
target.addEventListener("click", targetHit);
button.addEventListener("click", startGame);