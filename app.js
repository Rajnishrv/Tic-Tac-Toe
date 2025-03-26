let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn")
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")

let turnO = true; //playerX, playerO
let draw = 0;
let leastDraw = true;

// Play win sound
const playWinSound = () => {
    const winSound = document.getElementById('winSound');
    winSound.play();
}
// Play draw sound
const playDrawSound = () => {
    const drawSound = document.getElementById('drawSound');
    drawSound.play();
}
// click sound
const clickSound = () => {
    const winSound = document.getElementById('clickSound');
    winSound.play();
}
// start sound
const startSound = () => {
    const winSound = document.getElementById('startSound');
    winSound.play();
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const resetGame = () => {
    turnO = true;
    draw = 0;
    leastDraw = true;
    enableBoxes()
    startSound(); //click sound
    msgContainer.classList.add("hide")

}
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerHTML = "O"
            clickSound(); // click sound
            turnO = false;
            draw = draw + 1;
        } else {
            box.innerHTML = "X"
            clickSound(); // click sound
            turnO = true;
            draw = draw + 1;
        }
        box.disabled = true;
        checkWinner();
        if (draw === 9 && leastDraw) {
            matchDraw();
        }
    })
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                leastDraw = false;
                showWinner(pos1Val)
                
            }
        }
    }
}

const showWinner = (winner) => {
    playWinSound(); // Play the sound
    msg.innerText = `Congratulations, Winner is ${winner}`
    msgContainer.classList.remove("hide")
    disableBoxes();
}

const matchDraw = () => {
    playDrawSound(); // Play sound on draw
    msg.innerText = "Match Draw"
    msgContainer.classList.remove("hide")
    disableBoxes();
}