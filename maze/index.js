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
    let r = 0;
    let c = 0;

    r =  getRandomInt(1,maxRows);
    c = getRandomInt(1,maxCols);
    // console.log(wallCount(r,c));
    while(1){
        r =  getRandomInt(1,maxRows);
        c = getRandomInt(1,maxCols);
        // console.log(wallCount(r,c));
        if(wallCount(r,c)==3 && (r!=1 || c !=1)){
            let end = '#r'+r+'c'+c;
            $(end).html('<small>end</small>');
            
            break;
        }
        
    }

    // const r =  getRandomInt(1,maxRows);
    // const c = getRandomInt(1,maxCols);
    // let end = '#r'+r+'c'+c;
    // $(end).html('<small>end</small>');
}
function wallCount(row,col){
    let cell = '#r'+row+'c'+col;
    let nowR2 = row+1;
    let count = 4;
    //上通
    if($(cell).css("border-top-style")=="hidden"){
        count--;
    }
    //下通
    //$('#r'+nowR2+'c'+nowC).css("border-top-style")=="hidden"
    if($('#r'+nowR2+'c'+col).css("border-top-style")=="hidden"){
        count--;
    }
    //右通
    if($(cell).css("border-right-style")=="hidden"){
        count--;
    }
    //左通
    if($(cell).prev().css("border-right-style")=="hidden"){
        count--;
    }
    return count;
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
    //$(cell).css("border-top-style", "hidden");
    if($(cell).css("border-top-style")=="hidden"){

        $(cell).css("background","none").parent().prev().find('#r'+nowR+'c'+nowC).css("background","lightblue");
    }
}
function down(){
    if(nowR==maxRows) return;
    var cell = '#r'+nowR+'c'+nowC;
    nowR2 = nowR+1;
    if($('#r'+nowR2+'c'+nowC).css("border-top-style")=="hidden"){
        nowR+=1;
        $(cell).css("background","none").parent().next().find('#r'+nowR+'c'+nowC).css("background","lightblue");
    }
}
function right(){
    if(nowC==maxCols) return;
    var cell = '#r'+nowR+'c'+nowC;
//    $(cell).css("border-right-style", "hidden");
    if( $(cell).css("border-right-style")=="hidden"){

        $(cell).css("background","none").next().css("background","lightblue");
        nowC+=1;
    }
}
function left(){
    if(nowC==1) return;
    var cell = '#r'+nowR+'c'+nowC;
    if( $(cell).prev().css("border-right-style")=="hidden"){

        $(cell).css("background","none").prev().css("background","lightblue");
        nowC-=1;
    }
}
$(document).ready(function () { restart(); });