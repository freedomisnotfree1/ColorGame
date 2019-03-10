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
var isPlayerWin = "";
var gameStatus = "";
var clickEventHandlerStatus = "initial";




async function runGame() {
    resizeCanvas();
    resizeMarginLeft();
    resizeMarginTop();


    var c = document.getElementById("myCanvas");
    var containerElement = document.getElementById("container");
    var ctx = c.getContext("2d");
    elemLeft = c.offsetLeft;
    elemTop = c.offsetTop;
    var playerClickedCellRow = [];
    var playerClickedCellCol = [];
    playerClickedCell.push(playerClickedCellRow);
    playerClickedCell.push(playerClickedCellCol);

    
    
    var initailLevel = 2;
    
    for (var currentLevel = initailLevel; currentLevel < 37; currentLevel++) {
        drawCellFrame(ctx, c.width, c.height);
        var highlightCellList = randomGenerateHighlightCellList(currentLevel);
        drawHighlightCellList(ctx, highlightCellList);
        await countDown();
        drawCellFrame(ctx, c.width, c.height);
        displayText();
        addClickListener(containerElement, ctx);
        await checkPalyerInput(currentLevel, highlightCellList);
        await finalization();


        while (gameStatus === "waiting") {
            await sleep(100);
        }
        if (gameStatus === "restart") {	
            currentLevel = initailLevel - 1;
        }
    }
}


function resizeCanvas() {

    /// get computed style for image
    var img = document.getElementById('textContainer');
    var cs = getComputedStyle(img);

    /// these will return dimensions in *pixel* regardless of what
    /// you originally specified for image:
    var width = parseInt(cs.getPropertyValue('width'), 10);
    var height = parseInt(cs.getPropertyValue('height'), 10);

    /// now use this as width and height for your canvas element:
    var canvas = document.getElementById('myCanvas');

    canvas.width = width;
    canvas.height = height;
}

function resizeMarginLeft() {
    var tmp = document.getElementById('container');
    var containerComputedStyle = getComputedStyle(tmp);

    tmp = document.getElementById('myCanvas');
    var canvasComputedStyle = getComputedStyle(tmp);

    var containerWidth = parseInt(containerComputedStyle.getPropertyValue('width'), 10);
    var canvasWidth = parseInt(canvasComputedStyle.getPropertyValue('width'), 10);


    var canvas = document.getElementById('myCanvas');
    var textContainer = document.getElementById('textContainer');

    var diff = ((containerWidth - canvasWidth) / 2) + "px";
    canvas.style.marginLeft = diff;
    textContainer.style.marginLeft = diff;
}

function resizeMarginTop() {
    var tmp = document.getElementById('container');
    var containerComputedStyle = getComputedStyle(tmp);

    tmp = document.getElementById('myCanvas');
    var canvasComputedStyle = getComputedStyle(tmp);

    var containerHeight = parseInt(containerComputedStyle.getPropertyValue('height'), 10);
    var canvasHeight = parseInt(canvasComputedStyle.getPropertyValue('height'), 10);


    var canvas = document.getElementById('myCanvas');
    var textContainer = document.getElementById('textContainer');

    var diff = ((containerHeight - canvasHeight) / 2) + "px";
    canvas.style.marginTop = diff;
    textContainer.style.marginTop = diff;
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
    var element = document.getElementById("textDown");
    element.innerHTML = "請點紅色格子的位置";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function countDown() {
    var element = document.getElementById("textMiddle");
    element.innerHTML = "3";
    await sleep(1000);
    element.innerHTML = "2";
    await sleep(1000);
    element.innerHTML = "1";
    await sleep(1000);
    element.innerHTML = "";
}

function addClickListener(canvas, ctx) {
    if (clickEventHandlerStatus === "initial") {

        canvas.addEventListener('click', function (event) {
            if (clickEventHandlerStatus === "enable") {

                clickNum++;

                var x = event.pageX - elemLeft,
                    y = event.pageY - elemTop;

                var clickedRow = Math.floor(y / CELL_HEIGHT);
                var clickedCol = Math.floor(x / CELL_WIDTH);
                drawClickedCell(ctx, clickedRow, clickedCol)
                var cell = [clickedRow, clickedCol]
                playerClickedCell[0].push(clickedRow);
                playerClickedCell[1].push(clickedCol);

            }
        }, false);
        clickEventHandlerStatus = "enable";

    } else if (clickEventHandlerStatus === "disable") {
        clickEventHandlerStatus = "enable";
    }
}

async function checkPalyerInput(level, highlightCellList) {
    var isWaitingInput = true;
    var checkedNum = 0;
    var highlightCellListForCompare = copy(highlightCellList);
    while (isWaitingInput) {
        await sleep(200);
        if (clickNum > checkedNum) {
            console.log("test");

            var result = ifClickedRightCell(
                highlightCellListForCompare,
                playerClickedCell[0][checkedNum],
                playerClickedCell[1][checkedNum])
            if (result) {
                removeParticularElement(
                    highlightCellListForCompare,
                    playerClickedCell[0][checkedNum],
                    playerClickedCell[1][checkedNum]);

                checkedNum++;

                if (checkedNum >= level) {
                    isWaitingInput = false;
                    isPlayerWin = true;
                }
            } else {
                isWaitingInput = false;
                isPlayerWin = false;
            }
        }
    }
}

function startNextlevel() {
    alert("開始了");
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


async function finalization() {
    clickEventHandlerStatus = "disable";

    // Reinitailize playerClickedCell
    playerClickedCell = [];
    var playerClickedCellRow = [];
    var playerClickedCellCol = [];
    playerClickedCell.push(playerClickedCellRow);
    playerClickedCell.push(playerClickedCellCol);

    //TODO: show gameover or youwin
    if (isPlayerWin === true) {
        console.log("YOU WIN!");
        
        var element = document.getElementById("textMiddle");
        element.innerHTML = "YOU WIN!";

        var element2 = document.getElementById("textDown");
        element2.innerHTML = "<button class=\"nextLevelButton\" onclick=\"nextLevel();\">Next</button>";
    } else if (isPlayerWin === false) {
        
        var element = document.getElementById("textMiddle");
        element.innerHTML = "Oh No!";

        var element2 = document.getElementById("textDown");
        element2.innerHTML = "<button class=\"nextLevelButton\" onclick=\"restartGame();\">Restart</button>";

    }

    // misc.
    gameStatus = "waiting";
    clickNum = 0;
}

function restartGame() {
    gameStatus = "restart";
}

function nextLevel() {
    gameStatus = "nextLevel";
}