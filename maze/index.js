var maxCols = 10;
var maxRows = 10;
let nowR = 1;
let nowC = 1;
function CreateGrid() {
	var innerHTMLString = "";
	innerHTMLString = '<table>';
	for (var theRow = 1; theRow <= maxRows; theRow++) {
		innerHTMLString += '<tr>';
		for (var theCol = 1; theCol <= maxCols; theCol++) {
			innerHTMLString += '<td id=\"r';
			innerHTMLString += theRow;
			innerHTMLString += 'c';
			innerHTMLString += theCol;
			innerHTMLString += '\"></td>';
		}
		innerHTMLString += '</tr>';
	}
	innerHTMLString += '</table>';
	$('#maze-grid').html(innerHTMLString);
}

function RemoveWall(row, col) {
	var cell = '#r'+row+'c'+col;
	// A north wall would cause a gap to be created so just remove easterly wall.
	if (row === 1) {
		if (col === maxCols)
			return;
		$(cell).css("border-right-style", "hidden");
	}
	else if (col === maxCols) {
		$(cell).css("border-top-style", "hidden");
	}
	else {
		if (Math.random() >= 0.5) {
			$(cell).css("border-top-style", "hidden");
		} else {
			$(cell).css("border-right-style", "hidden");
		}
	}
}
function setStartPoint(){
    let start = '#r1c1';
    $(start).html('<small>start</small>')
    $(start).css("background","lightblue")
    nowC = 1;
    nowR = 1;
}
function setEndPoint(){
    const r =  getRandomInt(1,maxRows);
    const c = getRandomInt(1,maxCols);
    let end = '#r'+r+'c'+c;
    $(end).html('<small>end</small>');
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
  }
function CreateMaze() {
	for (var theRow = 1; theRow <= maxRows; theRow++) {
		for (var theCol = 1; theCol <= maxCols; theCol++) {
			RemoveWall(theRow, theCol);
		}
    }
    setStartPoint();
    setEndPoint();
}

function restart(){
    CreateGrid();
    CreateMaze();
}


function up(){
    if(nowR==1) return;
    var cell = '#r'+nowR+'c'+nowC;
    nowR-=1;
    $(cell).css("background","none").parent().prev().find('#r'+nowR+'c'+nowC).css("background","lightblue");
}
function down(){
    if(nowR==maxRows) return;
    var cell = '#r'+nowR+'c'+nowC;
    nowR+=1;
    $(cell).css("background","none").parent().next().find('#r'+nowR+'c'+nowC).css("background","lightblue");
}
function right(){
    if(nowC==maxCols) return;
	var cell = '#r'+nowR+'c'+nowC;
    $(cell).css("background","none").next().css("background","lightblue");
    nowC+=1;
}
function left(){
    if(nowC==1) return;
    var cell = '#r'+nowR+'c'+nowC;
    $(cell).css("background","none").prev().css("background","lightblue");
    nowC-=1;
}
$(document).ready(function () { CreateGrid(); });