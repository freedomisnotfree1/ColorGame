var COL_NUM = 6;
var ROW_NUM = 6;

var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 600;

var CELL_WIDTH = CANVAS_WIDTH / COL_NUM;
var CELL_HEIGHT = CANVAS_HEIGHT / ROW_NUM;

var playerClickedCell = [];
var clickNum = 0;
var elemLeft = 0;
var elemTop = 0;



async function runGame() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    elemLeft = c.offsetLeft;
    elemTop = c.offsetTop;
    var playerClickedCellRow = [];
    var playerClickedCellCol = []
    playerClickedCell.push(playerClickedCellRow);
    playerClickedCell.push(playerClickedCellCol);


    // for (var currentLevel = 3; currentLevel < 37; currentLevel++) {

    var currentLevel = 2;
    drawCellFrame(ctx, c.width, c.height);
    var highlightCellList = randomGenerateHighlightCellList(currentLevel);
    drawHighlightCellList(ctx, highlightCellList);
    await countDown();
    drawCellFrame(ctx, c.width, c.height);
    displayText();
    addClickListener(c, ctx);
    await checkPalyerInput(currentLevel, highlightCellList);


    // drawHighlightCellList(HighlightCellList);




    console.log("f")
    // }
}


function drawCellFrame(ctx, cWidth, cHeight) {
    //ctx.moveTo(0, 0);
    //ctx.lineTo(200, 100);

    //var hightlightedCellCol = 3;
    //var hightlightedCellRow = 2;

    ctx.clearRect(0, 0, cWidth, cHeight);

    for (var col = 0; col < COL_NUM; col++) {
        for (var row = 0; row < ROW_NUM; row++) {
            ctx.beginPath();
            ctx.rect(CELL_WIDTH * col, CELL_HEIGHT * row, CELL_WIDTH, CELL_HEIGHT);
            ctx.stroke();
            //if (hightlightedCellCol == col &&
            //    hightlightedCellRow == row) {
            //    ctx.fillStyle = "red";
            //    ctx.fill();
            //}
        }
    }
}

function randomGenerateHighlightCellList(level) {
    var HighlightCellListRow = [];
    var HighlightCellListCol = [];
    for (var i = 0; i < level; i++) {
        var isDuplicated = true;
        var randRow = 0;
        var randCol = 0;
        while (isDuplicated) {
            isDuplicated = false;

            randRow = Math.round(Math.random() * (ROW_NUM - 1));
            randCol = Math.round(Math.random() * (COL_NUM - 1));
            // randRow = 0;
            // randCol = 0;

            if (HighlightCellListRow.length > 0) {
                for (var j = 0; j < HighlightCellListRow.length; j++) {
                    if (HighlightCellListRow[j] == randRow &&
                        HighlightCellListCol[j] == randCol) {
                        isDuplicated = true;
                        break;
                    }
                }
            }
        }

        HighlightCellListRow.push(randRow);
        HighlightCellListCol.push(randCol);
    }
    var HighlightCellList = [HighlightCellListRow, HighlightCellListCol];
    return HighlightCellList;
}

function drawHighlightCell(ctx, row, col) {
    ctx.beginPath();
    ctx.rect(CELL_WIDTH * col, CELL_HEIGHT * row, CELL_WIDTH, CELL_HEIGHT);

    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
}

function drawHighlightCellList(ctx, HighlightCellList) {
    for (var i = 0; i < HighlightCellList[0].length; i++) {
        drawHighlightCell(ctx, HighlightCellList[0][i], HighlightCellList[1][i])
    }
}


function drawClickedCell(ctx, row, col) {
    ctx.beginPath();
    ctx.rect(CELL_WIDTH * col, CELL_HEIGHT * row, CELL_WIDTH, CELL_HEIGHT);

    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();
}

function displayText() {
    var element = document.getElementById("text");
    element.innerHTML = "請點紅色格子的位置";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function countDown() {
    var element = document.getElementById("text");
    element.innerHTML = "3";
    await sleep(1000);
    element.innerHTML = "2";
    await sleep(1000);
    element.innerHTML = "1";
    await sleep(1000);
}

function addClickListener(canvas, ctx) {
    canvas.addEventListener('click', function (event) {
        clickNum++;

        var x = event.pageX - elemLeft,
            y = event.pageY - elemTop;

        var clickedRow = Math.floor(y / CELL_HEIGHT);
        var clickedCol = Math.floor(x / CELL_WIDTH);
        drawClickedCell(ctx, clickedRow, clickedCol)
        var cell = [clickedRow, clickedCol]
        playerClickedCell[0].push(clickedRow);
        playerClickedCell[1].push(clickedCol);
    }, false);
}

async function checkPalyerInput(level, highlightCellList) {
    var isWaitingInput = true;
    var checkedNum = 0;
    var highlightCellListForCompare = copy(highlightCellList);
    while (isWaitingInput) {
        await sleep(200);
        if (clickNum > checkedNum) {
            console.log("test");
            if (ifClickedRightCell(
                    highlightCellListForCompare,
                    playerClickedCell[0][checkedNum],
                    playerClickedCell[1][checkedNum])) {

                checkedNum++;

                removeParticularElement(
                    highlightCellListForCompare,
                    playerClickedCell[0][checkedNum],
                    playerClickedCell[1][checkedNum]);
                if (checkedNum >= level) {
                    isWaitingInput = false;
                    //  顯示 win this round
                    console.log("YOU WIN!");

                    // start nextlevel
                }
            } else {
                isWaitingInput = false;

                // 顯示ＧＡＭＥＯＶＥＲ
                console.log("GAME OVER!");

                // RESTART
            }
        }
    }
}

function ifClickedRightCell(highlightCellListForCompare, row, col) {
    var isRight = false;
    var length = highlightCellListForCompare.length;
    for (var i = 0; i < length; i++) {

        if (highlightCellListForCompare[0][i] === row &&
            highlightCellListForCompare[1][i] === col) {
            isRight = true;
            break;
        }
    }

    return isRight;
}

function removeParticularElement(highlightCellListForCompare, row, col) {
    var index = -1;
    for (var i = 0; i < highlightCellListForCompare[0].length; i++) {
        if (highlightCellListForCompare[0][i] === row &&
            highlightCellListForCompare[1][i] === col) {
            index = i;
            break;
        }
    }

    if (index === -1) {
        highlightCellListForCompare[0].splice(index, 1);
        highlightCellListForCompare[1].splice(index, 1);
    } else {
        console.log("index !== -1");
    }
}

function copy(o) {
    var output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
        v = o[key];
        output[key] = (typeof v === "object") ? copy(v) : v;
    }
    return output;
}