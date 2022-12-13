const boardGame = document.getElementById("board");
const levelOptionEl = document.getElementById("level-option");
const gameContainerEl = document.getElementById("game-container");
const startGameEl = document.getElementById("start-game");
const startGameButton = document.getElementById("btn-start-game");
const cardToCompare = [];
const backFaceImage = "https://bfa.github.io/solitaire-js/img/card_back_bg.png";
const listCards = [
];
let count = 0;
let score = 0;
let move = 0;
let freezeClic = false;
var totalSecond = 0;
let joker = {
    src:"./cards/joker.png",
    title: "joker",
};
let gameSizes = {
    1: {
        row: 4,
        col: 4,
        pair: 8,
        cardWidth: "10vw",
        cardHeight: "23vh",
    },
    2: {
        row: 6,
        col: 6,
        pair: 18,
        cardWidth: "7vw",
        cardHeight: "15.5vh",
    },
    3: {
        row: 7,
        col: 8,
        pair: 28,
        cardWidth: "6vw",
        cardHeight: "13vh",
    },
};

initializeData(listCards,"heart");
initializeData(listCards,"diamond");
initializeData(listCards,"spade");
initializeData(listCards,"clover");

document.addEventListener("click", freezeClicFn, true);
/**
 * khi bấm vào button, sẽ lấy level đã chọn, màn hình hiện ra và bắt đầu bấm giờ
 */
startGameButton.addEventListener('click', function () {
    starTimer();
    level = Number(levelOptionEl.value);
    startGameEl.style.display = 'none';
    gameContainerEl.style.display = 'flex';
    gameStart(level);
});

function flip(element) {
    let currCard = event.currentTarget;
    
    if (currCard === cardToCompare[0]) {
        //cardToCompare.length = 0;
        return;
    } else {
        element.classList.toggle("memory-card-flip");
        cardToCompare.push(currCard);
    }
    //compare 2 cards
    if (cardToCompare.length === 2) {
        disableClicksFor5s();
        setTimeout(() =>{
            if (cardToCompare[0].children[0].src == cardToCompare[1].children[0].src) {
                disable(cardToCompare[0]);
                disable(cardToCompare[1]);
                document.getElementById("score-board").innerHTML =`Score: ${++score}`;
                if (score === (gameSizes[level].pair)) {
                    setTimeout(() => {
                        if(confirm("GAME OVER! Do you want to play again?"
                            )){
                            location.reload();
                        } else return;
                    }, 300);
                }
             } else {
                 cardToCompare[0].classList.remove('memory-card-flip');
                 cardToCompare[1].classList.remove('memory-card-flip');
            }
            document.getElementById("move-count").innerHTML = `Move count: ${++move}`;
            cardToCompare.length = 0;
        },700);//Comparing time
    }
}

function gameStart(level) {
    let size = gameSizes[level];
    let copiedListCards = [...listCards];
    //copiedListCards = [...listCards, ...listCards];
    shuffle(copiedListCards);
    let slicedListcards = copiedListCards.slice(0, gameSizes[level].pair);
    let ingameListcards = [...slicedListcards, ...slicedListcards];
    shuffle(ingameListcards);
    boardGame.style.gridTemplateColumns = `repeat(${size.col}, ${size.cardWidth})`;
    boardGame.style.gridTemplateRows = `repeat(${size.row},${size.cardHeight})`;
    console.log(size.cardHeight)

    for (let index = 0; index < ingameListcards.length; index++) {
        boardGame.innerHTML += 
        `<div class="memory-card" onclick="flip(this)">
            <img src="${ingameListcards[index].src}" class="front-face">
            <img src="${backFaceImage}" class="back-face">
        </div>`
    }
}

function initializeData(array, suit) {
    for (let i = 1; i <= 13; i++) {
        array.push({ 
            src: './cards/' + suit +'s/' + i + suit + '.png', 
            title: i + " " + suit
         })
    }
}

function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex = 0;

    while(currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex--);
        [array[currentIndex], array[randomIndex]] = 
        [array[randomIndex], array[currentIndex]]
    }
    return array;
}


function disable(element) {
    element.innerHTML = "";
    element.classList.remove("memory-card");
    element.classList.add("disable-card");
}

function freezeClicFn(e) {
    if (freezeClic) {
      e.stopPropagation();
      e.preventDefault();
    }
}

function disableClicksFor5s() {
    freezeClic = true;
    setTimeout(() => {
      freezeClic = false;
    }, 1000);
}

/*create timer*/
function check(value) {
    if (value < 10) {
        return "0" + value;
    } else return value;
}

function counter() {
    ++totalSecond;
    document.getElementById("hour").innerHTML = check(parseInt(totalSecond / 3600), 10);
    document.getElementById("minute").innerHTML = check(parseInt(totalSecond / 60 % 60), 10);
    document.getElementById("second").innerHTML = check(totalSecond % 60);
}

function starTimer() {
    setInterval(counter, 1000);
}

