const target = document.createElement("img");// for target file

const hitAudio = document.createElement("audio");// for target file
hitAudio.autoplay = "autoplay";
bgAudio.autoplay = "autoplay";

let randWidth = 0; // for target file
let randHeight = 0; // for target file

let currentTargetSize = 0;// for target file
let constTargetSpeed = 0.05;// for target file

let targetSpeed = 100;// for target file

const targetHit = () => {// for target file
    score++
    target.remove();
    hitAudio.src = "audio/hit.mp3"
    scoreboard.innerHTML = score;
    clearInterval(timer);
    spawnTarget();
    gameLevel();
}

const moveUp = () => {// for target file
    if (currentTargetSize > 1.05) {
        clearInterval(interval);
        moveDown();
        return;
    };
    target.style.transform = "scale("+ currentTargetSize +")";
    currentTargetSize += constTargetSpeed;
}

const moveDown = () => {// for target file
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

const spawnTarget = () => { // for target file
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

target.addEventListener("click", targetHit);// for target file

