window.addEventListener('DOMContentLoaded', () => {
    const boxs = Array.from(document.querySelectorAll('.grid-container > div'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    var turn = 0;

    let board = [10, 5, 5, 5, 5, 5, 10, 5, 5, 5, 5, 5];
    let currentPlayer = 'X';
    let isGameActive = true;

    const initBoard = () => {
        boxs.forEach((box) => {
            box.style.backgroundColor = '#ffffffcc';
            box.innerHTML = board[box.id-1];
        })
        document.querySelector('.baseO > p').innerHTML = 0;
        document.querySelector('.baseX > p').innerHTML = 0;
        currentPlayer = 'X';
        playerDisplay.innerText = currentPlayer;
    }

    initBoard();

    const addIfNull = (s) => {
        if (s == 'X') {
            for (let x = 7; x <= 11; x++) {
                console.log('X');
                boxs[x].innerHTML = 1;
            }
            document.querySelector('.baseX > p').innerHTML -= 5;
        }
        if (s == 'O') {
            for (let x = 1; x <= 5; x++) {
                console.log('O');
                boxs[x].innerHTML = 1;
            }
            document.querySelector('.baseO > p').innerHTML -= 5;
        }
    }

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';
 
    const nextIndexByT = (t, x) => {
        var nextIndex = +t + +x;
        if (nextIndex >= 13) {
            nextIndex = (nextIndex - 12);
        }
        if (nextIndex <= 0) {
            nextIndex = 12 + nextIndex;
        }
        return String(nextIndex);
    }

    const toString = (x) => {
        if (x == 0) {
            return "0";
        }
        return String(x);
    }

    const isEmptyBoard = (xs) => {
        if (xs == 'X') {
            console.log('X');
            for (let x = 8; x <= 11; x++) {
                console.log(x + " " + boxs[x].innerHTML);
                if (boxs[x].innerHTML != '' && boxs[x].innerHTML != 0) {
                    return false;
                }
            }
            return true;
        }
        if (xs == 'O') {
            console.log('O');
            for (let x = 1; x <= 5; x++) {
                console.log(x + " " + boxs[x].innerHTML);
                if (boxs[x].innerHTML != '' && boxs[x].innerHTML != 0) {
                    return false;
                }
            }
            return true;
        }
    }

    const updateBoard = (index, direction) => {
        // console.log(index.id + " " + direction.id);
        var total = index.innerHTML;
        if (currentPlayer == 'X') {
            var t = 1;
            if (Number(direction.id) < Number(index.id)) {
                t = -1;
            }
            if (Number(direction.id) == 1) {
                t = 1;
            }
            var currentIndex = index.id;
            var firstIndex = index.id;
            while (true) {
                var nextIndex = nextIndexByT(currentIndex, t);
                // console.log(currentIndex);
                document.getElementById(String(nextIndex)).innerHTML++;
                document.getElementById(String(firstIndex)).innerHTML--;
                currentIndex = nextIndex;
                total--;
                // console.log(total + " " + currentIndex + " " + document.getElementById(String(currentIndex)).innerHTML);
                if (total == 0) {
                    var nextIndex = nextIndexByT(currentIndex, t);
                    if (nextIndex == 1 | nextIndex == 7) {
                        break;
                    }
                    else {
                        var new_total = document.getElementById(String(nextIndex)).innerHTML;
                        if (new_total != 0) {
                            total = new_total;
                            currentIndex = nextIndex;
                            firstIndex = currentIndex;
                            continue;
                        }
                        else {
                            var d = 0;
                            while (document.getElementById(String(nextIndex)).innerHTML == 0
                                && document.getElementById(String(nextIndexByT(nextIndex, t))).innerHTML != 0) {
                                    if (d == 0 && (nextIndexByT(nextIndex, t) == 1 || nextIndexByT(nextIndex, t) == 7)) {
                                        // console.log("BREAK");
                                        break;
                                    }
                                    d++;
                                    var tt = Number(document.querySelector('.baseX > p').innerHTML) + Number(document.getElementById(String(nextIndexByT(nextIndex, t))).innerHTML);
                                    // console.log("HELLO");
                                    document.querySelector('.baseX > p').innerHTML = tt;
                                    // console.log(nextIndexByT(nextIndex, t));
                                    document.getElementById(toString(nextIndexByT(nextIndex, t))).innerHTML = 0;
                                    // console.log(nextIndex);
                                    nextIndex = nextIndexByT(nextIndexByT(nextIndex, t), t);
                                    // console.log(nextIndex);
                                }
                            break;
                        }
                    }

                }
                
            }
        }

        if (currentPlayer == 'O') {
            var t = 1;
            if (Number(direction.id) < Number(index.id) || (Number(direction.id == 1))) {
                t = -1;
            }
            // console.log(t);
            var currentIndex = index.id;
            var firstIndex = index.id;
            while (true) {
                var nextIndex = nextIndexByT(currentIndex, t);
                // console.log(currentIndex);
                document.getElementById(String(nextIndex)).innerHTML++;
                document.getElementById(String(firstIndex)).innerHTML--;
                currentIndex = nextIndex;
                total--;
                // console.log(total + " " + currentIndex + " " + document.getElementById(String(currentIndex)).innerHTML);
                if (total == 0) {
                    var nextIndex = nextIndexByT(currentIndex, t);
                    if (nextIndex == 1 | nextIndex == 7) {
                        break;
                    }
                    else {
                        var new_total = document.getElementById(String(nextIndex)).innerHTML;
                        if (new_total != 0) {
                            total = new_total;
                            currentIndex = nextIndex;
                            firstIndex = currentIndex;
                            continue;
                        }
                        else {
                            var d = 0;
                            while (document.getElementById(String(nextIndex)).innerHTML == 0
                                && document.getElementById(toString(nextIndexByT(nextIndex, t))).innerHTML != 0) {
                                    if (d == 0 && (nextIndexByT(nextIndex, t) == 1 || nextIndexByT(nextIndex, t) == 7)) {
                                        // console.log("BREAK");
                                        break;
                                    }
                                    d++;
                                    var tt = Number(document.querySelector('.baseO > p').innerHTML) + Number(document.getElementById(String(nextIndexByT(nextIndex, t))).innerHTML);
                                    // console.log("HELLO");
                                    document.querySelector('.baseO > p').innerHTML = tt;
                                    document.getElementById(String(nextIndexByT(nextIndex, t))).innerHTML = 0;
                                    // console.log(nextIndex);
                                    // console.log("t" + " " + t);
                                    nextIndex = nextIndexByT(nextIndexByT(nextIndex, t), t);
                                    // console.log(nextIndex);
                                }
                            break;
                        }
                    }

                }
                
            }
        }
    }

    function handleResultValidation() {
        let roundWon = false;
    }

    const resetBoard = {

    }

    const announce = (type) => {
        switch (type) {
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO"> O </span> won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX"> X </span> won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    }

    const isValidAction = (box) => {
        return true;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
        if (isEmptyBoard(currentPlayer)) {
            console.log("EMPTY");
            addIfNull(currentPlayer);
        }
    }

    var prev = null;
    var direction = document.getElementById('a1');

    const userAction = (box, index) => {
        // console.log(box.id);
        if (currentPlayer == "X") {
            var flag = false;
            if (turn == 1) {
                if (box.id > 1 && box.id < 7) {
                    return;
                }
                else if ((box.id == 1 && prev.id == 12) | (box.id == 7 && prev.id == 8)) {
                    flag = true;
                }
            }
            if (box.id < 8 && flag == false) {
                return;
            }
        }
        if (currentPlayer == "O") {
            var flag = false;
            if (turn == 1) {
                if (box.id > 7) {
                    return;
                }
                else if ((box.id == 1 && prev.id == 2) | (box.id == 7 && prev.id == 6)) {
                    flag = true;
                }
            }
            if (box.id > 7 && flag == false) {
                return;
            }
        }
        if (box == prev) {
            box.style.backgroundColor = '#ffffffcc';
            turn = 0;
            prev = null;
            return;
        }
        if (turn == 0) {
            if (box.innerHTML == 0 || box.id == 1 | box.id == 7) {
                return;
            }
        }
        turn++;
        box.style.backgroundColor = 'yellow';
        
        // console.log(box.id + " " + turn);
        if (turn == 1) {
            prev = box;
        }
        if (turn == 2) {
            direction = box;
            
            if (isValidAction(box) && isGameActive) {
                // console.log(prev.id + " " + direction.id);
                updateBoard(prev, direction);
                // handleResultValidation();
                changePlayer();
                prev = null;
                turn = 0;
                boxs.forEach((boxx) => {
                    boxx.style.backgroundColor = '#ffffffcc';
                });
            }

        }
    }

    boxs.forEach((box, index) => {
        var a1, b1;
        
        box.addEventListener('mouseenter', () => {
            if (currentPlayer == 'X') {
                a1 = 8;
                b1 = 12;
            }
            else {
                a1 = 2;
                b1 = 6;
            }
            if (turn == 0 && box.id >= a1 && box.id <= b1) {
                box.style.backgroundColor = '#888888';
            }
        });
        box.addEventListener('mouseleave', () => {
            if (currentPlayer == 'X') {
                a1 = 8;
                b1 = 12;
            }
            else {
                a1 = 2;
                b1 = 6;
            }
            if (turn == 0 && box.id >= a1 && box.id <= b1) {
                box.style.backgroundColor = '#ffffffcc';
            }
        });

        box.addEventListener('click', () => {
            userAction(box, index);
        });
    })

    resetButton.addEventListener('click', initBoard);  
})