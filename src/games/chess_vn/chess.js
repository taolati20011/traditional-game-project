// Insert image to chess board
function coloring   () {
    const colors = document.querySelectorAll('.box');

    colors.forEach(color => {

        getId = color.id;
        arr = Array.from(getId);
        a = arr[arr.length - 1]*1;
        arr.shift();
        if (arr.length == 4) {
            a += (arr[0] * 10 + arr[1])*1;
        }
        else {
            a += (arr[0])*1;
        }
        a -= 1;

        if (a % 2 == 0) {
            color.style.backgroundColor = 'rgb(240, 201, 150)';
        }
        if (a % 2 !== 0) {
            color.style.backgroundColor = 'rgb(100, 75, 43)';
        }
    });
}

// Insert image
function insertImage() {

    document.querySelectorAll('.box').forEach(image => {
        // console.log(image.innerText);

        if (image.innerText.length !== 0) {
            t = image.innerText.substring(1);
            image.innerHTML = `${image.innerText} <img class='allimg' src="./img1/${t}.png" alt="">`
            image.style.cursor = 'pointer'
        }
    })
}

// function removeMoveRangeWhenMeetFriendlyElement() {
//     document.querySelectorAll('.box').forEach(chess => {
//         if (chess.style.backgroundColor == 'pink') {
//             document.querySelectorAll('.box').forEach(box1 => {
//                 if (box1.style.backgroundColor == 'green' && box1.innerText.length !== 0) {
//                     greenText = box1.innerText;
//                     pinkText = chess.innerText;

//                     pinkColor = ((Array.from(pinkText)).shift()).toString();
//                     greenColor = ((Array.from(greenText)).shift()).toString();

//                     getId = box1.id;
//                     arr = Array.from(getId);
//                     a = arr[arr.length - 1]*1;
//                     arr.shift();
//                     if (arr.length == 4) {
//                         a += (arr[0] * 10 + arr[1])*1;
//                     }
//                     else {
//                         a += (arr[0])*1;
//                     }
//                     a -= 1;

//                     if (a % 2 == 0 && pinkColor == greenColor) {
//                         box1.style.backgroundColor = 'rgb(240, 201, 150)';
//                     }
//                     if (a % 2 !== 0 && pinkColor == greenColor) {
//                         box1.style.backgroundColor = 'rgb(100, 75, 43)';
//                     }
//                 }
//             })
//         }
//     })
// }

function renderMath(value, type) {
    // console.log(value);
    if (value <= 0) {
        return;
    }
    const boxRender = document.getElementById(`b${value}`);
    if (boxRender == null) {
        return;
    }
    if (type === boxRender.innerHTML[0]) {
        return;
    }
    document.getElementById(`b${value}`).style.backgroundColor = 'yellow'
}

function move() {
    tog = 1;
    document.querySelectorAll('.box').forEach(item => {
        item.addEventListener('click', function() {
            // Delete the opposite element
            if (item.style.backgroundColor == 'green' && item.innerText.length == 0) {
                tog = tog + 1;
            }
            else if (item.style.backgroundColor == 'green' && item.innerText.length !== 0) {
                document.querySelectorAll('.box').forEach(i => {
                    if (i.style.backgroundColor == 'pink') {
                        pinkId = i.id;
                        pinkText = i.innerText;

                        document.getElementById(pinkId).innerText = '';
                        item.innerText = pinkText;
                        coloring();
                        insertImage();
                        tog = tog + 1;
                    }
                })
                tog = tog + 1;
            }
            else if (item.style.backgroundColor == 'yellow' && item.innerText.length != 0) {
                document.querySelectorAll('.box').forEach(i => {
                    if (i.style.backgroundColor == 'pink') {
                        pinkId = i.id;
                        pinkText = i.innerText;

                        document.getElementById(pinkId).innerText = '';
                        item.innerText = pinkText;
                        coloring();
                        insertImage();
                    }
                })
                tog = tog + 1;
            }

            getId = item.id;
            arr = Array.from(getId);
            a = arr[arr.length - 1]*1;
            aside = a;
            arr.shift();
            // console.log(arr);
            if (arr.length == 4) {
                a += ((arr[0] * 10 + arr[1]*1)*1) * 100;
                aup = arr[0] * 1000 + arr[1] * 100 ;
            }
            else {
                a += (arr[0])*1 * 100;
                aup = arr[0] * 100 ;
            }

            // Function to display the available paths for all pieces

            function whosTurn(toggle) {
                if (item.innerText !== 0 && Array.from(item.innerText)[0] == toggle) {
                    t = item.innerText.substring(1);
                    t = t * 1;
                    for (let i = 1; i <= t; i++) {
                        // console.log(i);
                        const boxRender = document.getElementById(`b${a + i * 100}`);
                        if (boxRender == null) {
                            break;
                        }
                        if ((a + i * 100) < 1200 && document.getElementById(`b${a + i * 100}`).innerHTML == 0) {
                            document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                        }
                        else if ((a + i * 100) < 1200 && document.getElementById(`b${a + i * 100}`).innerHTML !== 0) {
                            if (i == 1 && boxRender.innerText[1] !== '0') {
                                const other = item.innerText[0] === 'W' ? 'W' : "B";
                                if (boxRender.innerText[0] === other) {
                                    const value = boxRender.innerText[1] * 1;
                                    renderMath(a + ((t + value) % 10) * 100 + 100, other);
                                    renderMath(a + (t * value % 10) * 100 + 100, other);
                                    if (t > value) {
                                        renderMath(a + (t - value) * 100 + 100, other);
                                        renderMath(a + ((t / value) | 0) * 100 + 100, other);
                                        renderMath(a + (t % value) * 100 + 100, other);
                                    }
                                }
                            }
                            // document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                            break
                        }
                    }

                    for (let i = 1; i <= t; i++) {
                        // console.log(i);
                        const boxRender = document.getElementById(`b${a - i * 100}`);
                        if (boxRender == null) {
                            break;
                        }
                        if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                            document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                        }
                        else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                            if (i == 1 && boxRender.innerText[1] !== '0') {
                                const other = item.innerText[0] === 'W' ? 'W' : "B";
                                if (boxRender.innerText[0] === other) {
                                    const value = boxRender.innerText[1] * 1;
                                    renderMath(a - ((t + value) % 10) * 100 - 100, other);
                                    renderMath(a - (t * value % 10) * 100 - 100, other);
                                    if (t > value) {
                                        renderMath(a - (t - value) * 100 - 100, other);
                                        renderMath(a - ((t / value) | 0) * 100 - 100, other);
                                        renderMath(a - (t % value) * 100 - 100, other);
                                    }
                                }
                            }
                            // document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                            break
                        }
                    }

                    for (let i = 1; i <= t; i++) {
                        // console.log(i);
                        const boxRender = document.getElementById(`b${a + i}`);
                        if (boxRender == null) {
                            break;
                        }
                        if ((a + i) < (aup + 12) && document.getElementById(`b${a + i}`).innerText == 0) {
                            document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                        }
                        else if ((a + i) < (aup + 12) && document.getElementById(`b${a + i}`).innerText !== 0) {
                            if (i == 1 && boxRender.innerText[1] !== '0') {
                                const other = item.innerText[0] === 'W' ? 'W' : "B";
                                if (boxRender.innerText[0] === other) {
                                    const value = boxRender.innerText[1] * 1;
                                    renderMath(a + ((t + value) % 10) + 1, other);
                                    renderMath(a + (t * value % 10) + 1, other);
                                    if (t > value) {
                                        renderMath(a + (t - value) + 1, other);
                                        renderMath(a + ((t / value) | 0) + 1, other);
                                        renderMath(a + (t % value) + 1, other);
                                    }
                                }
                            }
                            // document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                            break
                        }
                    }

                    for (let i = 1; i <= t; i++) {
                        // console.log(i);
                        const boxRender = document.getElementById(`b${a - i}`);
                        if (boxRender == null) {
                            break;
                        }
                        // console.log(a-i, " ", aup);
                        if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText == 0) {
                            // console.log(22);
                            document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                        }
                        else if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText !== 0) {
                            if (i == 1 && boxRender.innerText[1] !== '0') {
                                const other = item.innerText[0] === 'W' ? 'W' : "B";
                                if (boxRender.innerText[0] === other) {
                                    const value = boxRender.innerText[1] * 1;
                                    renderMath(a - ((t + value) % 10) - 1, other);
                                    renderMath(a - (t * value % 10) - 1, other);
                                    if (t > value) {
                                        renderMath(a - (t - value) - 1, other);
                                        renderMath(a - ((t / value) | 0) - 1, other);
                                        renderMath(a - (t % value) - 1, other);
                                    }
                                }
                            }
                            // document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                            break
                        }
                    }



                    for (let i = 1; i <= t; i++) {
                        // console.log(i);
                        const boxRender = document.getElementById(`b${a + i * 100 + i}`);
                        if (boxRender == null) {
                            break;
                        }
                        if (i < (1200 - aup) / 100 && i < 12 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                            document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                        }
                        else if (i < (1200 - aup) / 100 && i < 12 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                            if (i == 1 && boxRender.innerText[1] !== '0') {
                                const other = item.innerText[0] === 'W' ? 'W' : "B";
                                if (boxRender.innerText[0] === other) {
                                    const value = boxRender.innerText[1] * 1;
                                    renderMath(a + ((t + value) % 10) * 101 + 101, other);
                                    renderMath(a + (t * value % 10) * 101 + 101, other);
                                    if (t > value) {
                                        renderMath(a + (t - value) * 101 + 101, other);
                                        renderMath(a + ((t / value) | 0) * 101 + 101, other);
                                        renderMath(a + (t % value) * 101 + 101, other);
                                    }
                                }
                            }
                            // document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                            break
                        }
                    }


                    for (let i = 1; i <= t; i++) {
                        // console.log(i);
                        const boxRender = document.getElementById(`b${a - i * 100 + i}`);
                        if (boxRender == null) {
                            break;
                        }
                        if (i < aup / 100 && i < 12 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                            document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                        }
                        else if (i < aup / 100 && i < 12 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                            if (i == 1 && boxRender.innerText[1] !== '0') {
                                const other = item.innerText[0] === 'W' ? 'W' : "B";
                                if (boxRender.innerText[0] === other) {
                                    const value = boxRender.innerText[1] * 1;
                                    renderMath(a - ((t + value) % 10) * 99 - 99, other);
                                    renderMath(a - (t * value % 10) * 99 - 99, other);
                                    if (t > value) {
                                        renderMath(a - (t - value) * 99 - 99, other);
                                        renderMath(a - ((t / value) | 0) * 99 - 99, other);
                                        renderMath(a - (t % value) * 99 - 99, other);
                                    }
                                }
                            }
                            // document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                            break
                        }
                    }


                    for (let i = 1; i <= t; i++) {
                        // console.log(i);
                        const boxRender = document.getElementById(`b${a + i * 100 - i}`);
                        if (boxRender == null) {
                            break;
                        }
                        if (i < (1200 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                            document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                        }
                        else if (i < (1200 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                            if (i == 1 && boxRender.innerText[1] !== '0') {
                                const other = item.innerText[0] === 'W' ? 'W' : "B";
                                if (boxRender.innerText[0] === other) {
                                    const value = boxRender.innerText[1] * 1;
                                    renderMath(a + ((t + value) % 10) * 99 + 99, other);
                                    renderMath(a + (t * value % 10) * 99 + 99, other);
                                    if (t > value) {
                                        renderMath(a + (t - value) * 99 + 99, other);
                                        renderMath(a + ((t / value) | 0) * 99 + 99, other);
                                        renderMath(a + (t % value) * 99 + 99, other);
                                    }
                                }
                            }
                            // document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                            break
                        }

                    }


                    for (let i = 1; i <= t; i++) {
                        // console.log(i);
                        const boxRender = document.getElementById(`b${a - i * 100 - i}`);
                        if (boxRender == null) {
                            break;
                        }
                        if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                            document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                        }
                        else if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                            if (i == 1 && boxRender.innerText[1] !== '0') {
                                const other = item.innerText[0] === 'W' ? 'W' : "B";
                                if (boxRender.innerText[0] === other) {
                                    const value = boxRender.innerText[1] * 1;
                                    renderMath(a - ((t + value) % 10) * 101 - 101, other);
                                    renderMath(a - (t * value % 10) * 101 - 101, other);
                                    if (t > value) {
                                        renderMath(a - (t - value) * 101 - 101, other);
                                        renderMath(a - ((t / value) | 0) * 101 - 101, other);
                                        renderMath(a - (t % value) * 101 - 101, other);
                                    }
                                }
                            }
                            // document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                            break
                        }
                    }



                    item.style.backgroundColor = 'pink';

                }
            }

            if (tog % 2 !== 0) {
                document.getElementById('tog').innerText = "White's Turn"
                whosTurn('W')
            }
            if (tog % 2 == 0) {
                document.getElementById('tog').innerText = "Black's Turn"
                whosTurn('B')
            }

            numOfKings = 0

            document.querySelectorAll('.box').forEach(win => {
                if (win.innerText == 'W0' || win.innerText == 'B0') {
                    numOfKings += 1
                }
    
            })
    
            if (numOfKings == 1) {
                setTimeout(() => {
                    // console.log(`${toggle}`) 
                    if (tog % 2 == 0) {
                        alert('White Wins !!')
                        location.reload()
                    }
                    else if (tog % 2 !== 0) {
                        alert('Black Wins !!')
                        location.reload()
                    }
                }, 100)
            }
        })
    })
}

// function isWin() {
//     const blackO = document.getElementById(`b205`);
//     const whiteO = document.getElementById(`b1005`);
//     if (blackO == null) {
//         alert('White Wins !!');
//         location.reload;
//     }
//     if (whiteO == null) {
//         alert('Black Wins !!');
//         location.reload;
//     }
// }

function handleMove() {
    document.querySelectorAll('.box').forEach(chess => {
        chess.addEventListener('click', function () {
            if (chess.style.backgroundColor == 'pink') {
                pinkId = chess.id;
                pinkText = chess.innerText;
    
                document.querySelectorAll('.box').forEach(test => {
                    test.addEventListener('click', function() {
                        if (test.style.backgroundColor == 'green' && test.innerText.length == 0) {
                            document.getElementById(pinkId).innerText = ''
                            test.innerText = pinkText;
                            coloring();
                            insertImage();
                        }
                        // console.log(test.style.backgroundColor);
                        if (test.style.backgroundColor == 'yellow' && test.innerText.length != 0
                        && chess.innerText[0] != test.innerText[0]) {
                            const t = chess.i
                            document.getElementById(pinkId).innerText = ''
                            test.innerText = pinkText;
                            coloring();
                            insertImage();
                        }
                    })
                })
            }
        })
    })

    z = 0
    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('click', function() {
            z = z + 1;
            if (z % 2 == 0 && box.style.backgroundColor !== 'green'
            && box.style.backgroundColor !== 'yellow') {
                coloring();
            } 
        })
    }) 
}

window.addEventListener('DOMContentLoaded', () => {
    coloring();
    insertImage();
    move();
    handleMove();
});

