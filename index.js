function runGame() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var elemLeft = c.offsetLeft;
    var elemTop = c.offsetTop;
    var clickNum = 0;

    c.addEventListener('click', function (event) {
        clickNum++;

        var x = event.pageX - elemLeft,
            y = event.pageY - elemTop;

        var clickedRow = Math.floor(y / CELL_HEIGHT);
        var clickedCol = Math.floor(x / CELL_WIDTH);
        drawClickedCell(ctx, clickedRow, clickedCol)

    }, false);




    // for (var currentLevel = 3; currentLevel < 37; currentLevel++) {

    var currentLevel = 3;
    ctx.clearRect(0, 0, c.width, c.height);
    drawCellFrame(ctx);
    var HighlightCellList = randomGenerateHighlightCellList(currentLevel);
    drawHighlightCellList(ctx, HighlightCellList);
    // drawHighlightCellList(HighlightCellList);




    console.log("f")
    // }
}
var COL_NUM = 6;
var ROW_NUM = 6;

var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 600;

var CELL_WIDTH = CANVAS_WIDTH / COL_NUM;
var CELL_HEIGHT = CANVAS_HEIGHT / ROW_NUM;


function drawCellFrame(ctx) {
    //ctx.moveTo(0, 0);
    //ctx.lineTo(200, 100);

    //var hightlightedCellCol = 3;
    //var hightlightedCellRow = 2;
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