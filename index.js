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

    var currentLevel = 1;
    drawCellFrame(ctx, c.width, c.height);
    var HighlightCellList = randomGenerateHighlightCellList(currentLevel);
    drawHighlightCellList(ctx, HighlightCellList);
    await countDown();
    drawCellFrame(ctx, c.width, c.height);
    displayText();
    addClickListener(c, ctx);
    await checkPalyerInput();


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

async function checkPalyerInput() {
    var waitingInput = true;
    var checkedNum = 0;
    while (waitingInput) {
        await sleep(200);
        if (clickNum > checkedNum) {
            if () {

            }
            checkedNum++;
        }
    }
}