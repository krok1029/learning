var maxCols = 50;
var maxRows = 30;
let nowR = 1;
let nowC = 1;
let nodeArr = [];
let currentR = 1;
let currentC = 1;
let $ = $;
class Node {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.cell = '#r' + row + 'c' + col;
    this.dir = [37, 38, 39, 40];
  }

  // 37:left 38:up 39:right 40:down
  throw(code) {
    const isNumber = (element) => element == code;
    const index = this.dir.findIndex(isNumber);
    this.dir.splice(index, 1);
  }

  nextCell(dir) {
    let next = '';
    let row = this.row;
    let col = this.col;
    let nextR = row;
    let nextC = col;
    // 37:left 38:up 39:right 40:down
    switch (dir) {
      case 37:
        nextC = col - 1;
        break;
      case 38:
        nextR = row - 1;
        break;
      case 39:
        nextC = col + 1;
        break;
      case 40:
        nextR = row + 1;
        break;
    }
    next = '#r' + nextR + 'c' + nextC;
    if (nextC == 0 || nextR == 0) return 'false';
    return next;
  }
}
function createNode(row, col) {
  let noden = new Node(row, col);
  // 37:left 38:up 39:right 40:down
  if (row == 1) {
    noden.throw(38);
  }
  if (row == maxRows) {
    noden.throw(40);
  }
  if (col == 1) {
    noden.throw(37);
  }
  if (col == maxCols) {
    noden.throw(39);
  }
  return noden;
}
function randomDir(node) {
  const length = node.dir.length;
  let ranNum = getRandom(length);
  return node.dir[ranNum];
}
function getRandom(x) {
  return Math.floor(Math.random() * x);
}
function nextCell(dir) {
  let next = '';
  let row = nodeArr[nodeArr.length - 1].row;
  let col = nodeArr[nodeArr.length - 1].col;
  let nextR = row;
  let nextC = col;
  // 37:left 38:up 39:right 40:down
  switch (dir) {
    case 37:
      nextC = col - 1;
      break;
    case 38:
      nextR = row - 1;
      break;
    case 39:
      nextC = col + 1;
      break;
    case 40:
      nextR = row + 1;
      break;
  }
  next = '#r' + nextR + 'c' + nextC;

  // console.log("dir: ",dir," nextR: ",nextR," nextC: ",nextC, " row: ",row," col: ",col)
  if (nextC == 0 || nextR == 0) return 'false';
  return next;
}
function checkVaild(dir) {
  let next = nextCell(dir);
  if ($(next).hasClass('path')) {
    nodeArr[nodeArr.length - 1].throw(dir);
    // console.log("dir :",dir,"cell:",nodeArr[nodeArr.length-1].row,nodeArr[nodeArr.length-1].col)
  }
  return $(next).hasClass('path');
}
function createPath(dir) {
  let row = nodeArr[nodeArr.length - 1].row;
  let col = nodeArr[nodeArr.length - 1].col;
  let method = 0;
  let newdir = 0;
  // 37:left 38:up 39:right 40:down
  switch (dir) {
    case 37:
      col = currentC - 1;
      method = 1;
      newdir = 39;
      break;
    case 38:
      row = currentR - 1;
      method = 2;
      newdir = 40;
      break;
    case 39:
      col = currentC + 1;
      method = 3;
      newdir = 37;
      break;
    case 40:
      row = currentR + 1;
      method = 4;
      newdir = 38;
      break;
  }
  RemoveWall2(row, col, nodeArr[nodeArr.length - 1].cell, method);
  const newnode = createNode(row, col);
  nodeArr[nodeArr.length - 1].throw(dir);
  newnode.throw(newdir);
  nodeArr.push(newnode);
  // console.log("has push array: ",nodeArr)
  currentC = col;
  currentR = row;
  // console.log(row,col,dir,nodeArr[nodeArr.length-1]);
}
function RemoveWall2(newrow, newcol, oldcell, method) {
  const newcell = '#r' + newrow + 'c' + newcol;
  if (method == 4) {
    $(newcell).css('border-top-style', 'hidden');
  } else if (method == 2) {
    $(oldcell).css('border-top-style', 'hidden');
  } else if (method == 1) {
    $(newcell).css('border-right-style', 'hidden');
  } else if (method == 3) {
    $(oldcell).css('border-right-style', 'hidden');
  }

  $(newcell).addClass('path');
  // console.log("rm  ",newrow, newcol,oldcell,method)
}
function CreateMaze2() {
  const allPoint = maxCols * maxRows;
  let checkedPoint = 0;
  let dir;

  let startnode = createNode(currentR, currentC);

  checkedPoint++;
  nodeArr.push(startnode);
  dir = randomDir(nodeArr[nodeArr.length - 1]);
  if (!checkVaild(dir)) {
    createPath(dir);
    checkedPoint++;
    // console.log(checkedPoint)
    $('#r1c1').addClass('path');
  }

  while (checkedPoint < allPoint) {
    dir = randomDir(nodeArr[nodeArr.length - 1]);
    if (!checkVaild(dir)) {
      createPath(dir);
      checkedPoint++;
    } else {
      if (nodeArr[nodeArr.length - 1].dir.length == 0) {
        nodeArr.pop();
        currentR = nodeArr[nodeArr.length - 1].row;
        currentC = nodeArr[nodeArr.length - 1].col;
      }
    }
  }
  setStartPoint();
  setEndPoint();
}

function CreateGrid() {
  var innerHTMLString = '';
  innerHTMLString = '<table>';
  for (var theRow = 1; theRow <= maxRows; theRow++) {
    innerHTMLString += '<tr>';
    for (var theCol = 1; theCol <= maxCols; theCol++) {
      innerHTMLString += '<td id="r';
      innerHTMLString += theRow;
      innerHTMLString += 'c';
      innerHTMLString += theCol;
      innerHTMLString += '"></td>';
    }
    innerHTMLString += '</tr>';
  }
  innerHTMLString += '</table>';
  $('#maze-grid').html(innerHTMLString);
}

function setStartPoint() {
  let start = '#r' + 1 + 'c' + 1;
  $(start).html('<small id = "start">start</small>');
  $(start).css('background', 'wheat');
  nowC = 1;
  nowR = 1;
}
function setEndPoint() {
  let r = 0;
  let c = 0;

  r = getRandom(maxRows) + 1;
  c = getRandom(maxCols) + 1;
  // console.log(wallCount(r,c));
  while (wallCount(r, c) < 1000) {
    r = getRandom(maxRows) + 1;
    c = getRandom(maxCols) + 1;
    if (wallCount(r, c) == 3 && (r != 1 || c != 1)) {
      let end = '#r' + r + 'c' + c;
      $(end).html('<small id="end">end</small>');

      break;
    }
  }
}
function wallCount(row, col) {
  let cell = '#r' + row + 'c' + col;
  let nowR2 = row + 1;
  let count = 4;
  //上通
  if ($(cell).css('border-top-style') == 'hidden') {
    count--;
  }
  //下通
  //$('#r'+nowR2+'c'+nowC).css("border-top-style")=="hidden"
  if ($('#r' + nowR2 + 'c' + col).css('border-top-style') == 'hidden') {
    count--;
  }
  //右通
  if ($(cell).css('border-right-style') == 'hidden') {
    count--;
  }
  //左通
  if ($(cell).prev().css('border-right-style') == 'hidden') {
    count--;
  }
  return count;
}
// function CreateMaze() {
// 	for (var theRow = 1; theRow <= maxRows; theRow++) {
// 		for (var theCol = 1; theCol <= maxCols; theCol++) {
// 			RemoveWall(theRow, theCol);
// 		}
//     }
//     setStartPoint();
//     setEndPoint();
// }
// function RemoveWall(row, col) {
// 	var cell = '#r'+row+'c'+col;
// 	// A north wall would cause a gap to be created so just remove easterly wall.
// 	if (row === 1) {
// 		if (col === maxCols)
// 			return;
// 		$(cell).css("border-left-style", "hidden");
// 	}
// 	else if (col === maxCols) {
// 		$(cell).css("border-top-style", "hidden");
// 	}
// 	else {
// 		if (Math.random() >= 0.5) {
// 			$(cell).css("border-top-style", "hidden");
// 		} else {
// 			$(cell).css("border-right-style", "hidden");
// 		}
// 	}
// }
function restart() {
  nodeArr = [];
  nowR = 1;
  nowC = 1;
  currentR = 1;
  currentC = 1;
  CreateGrid();
  CreateMaze2();
  $('#info').text('');
}

function up() {
  if (nowR == 1) return;
  var cell = '#r' + nowR + 'c' + nowC;
  //$(cell).css("border-top-style", "hidden");
  if ($(cell).css('border-top-style') == 'hidden') {
    nowR -= 1;

    $(cell)
      .css('background', 'none')
      .parent()
      .prev()
      .find('#r' + nowR + 'c' + nowC)
      .css('background', 'lightblue');
  }
}
function down() {
  if (nowR == maxRows) return;
  var cell = '#r' + nowR + 'c' + nowC;
  let nowR2 = nowR + 1;
  if ($('#r' + nowR2 + 'c' + nowC).css('border-top-style') == 'hidden') {
    nowR += 1;
    $(cell)
      .css('background', 'none')
      .parent()
      .next()
      .find('#r' + nowR + 'c' + nowC)
      .css('background', 'lightblue');
  }
}
function right() {
  if (nowC == maxCols) return;
  var cell = '#r' + nowR + 'c' + nowC;
  //    $(cell).css("border-right-style", "hidden");
  if ($(cell).css('border-right-style') == 'hidden') {
    $(cell).css('background', 'none').next().css('background', 'lightblue');
    nowC += 1;
  }
}
function left() {
  if (nowC == 1) return;
  var cell = '#r' + nowR + 'c' + nowC;
  if ($(cell).prev().css('border-right-style') == 'hidden') {
    $(cell).css('background', 'none').prev().css('background', 'lightblue');
    nowC -= 1;
  }
}
function pointCheck(cell) {
  cell = '#r' + nowR + 'c' + nowC;
  // console.log($(cell).html())
  if ($(cell).html() === '<small id="start">start</small>') {
    $(cell).css('background', 'wheat');
  }
  if ($(cell).html() === '<small id="end">end</small>') {
    $(cell).css('background', 'violet');
    $('#info').text('Great!!!');
  }
}
$(document).on('keydown', function (e) {
  let code = e.which;
  // console.log(code)
  switch (code) {
    case 37:
      left();
      break;
    case 38:
      up();
      break;
    case 39:
      right();
      break;
    case 40:
      down();
      break;
  }
  const cell = '#r' + nowR + 'c' + nowC;
  pointCheck(cell);
});
$(document).ready(function () {
  restart();
});
