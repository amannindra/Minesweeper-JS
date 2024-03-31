game = document.getElementById("grid");
reset = document.getElementById("reset");
reveal = document.getElementById("reveal");
state = document.getElementById("state");
dev = document.getElementById("developer");
var testMode = false;
let rows = 10;
let columns = 10;
let count = 10;

//Research
window.onload = function () {
  createGame();
  generateBombs();
};

//Tried making this function for 3 hours. I was so close. Ended using Chatgpt to fix it.
function createGame() {
  num = 1;
  game.style.setProperty("--grid-rows", rows.toString());
  game.style.setProperty("--grid-columns", columns.toString());
  for (var x = 1; x <= rows; x++) {
    for (var y = 1; y <= columns; y++) {
      const td = document.createElement("div");
      td.classList.add("cell");
      td.textContent = "";
      td.id = x + "." + y;
      td.addEventListener("click", checkTile);
      var mine = document.createAttribute("mineData");
      var isRevealed = document.createAttribute("revealData");
      isRevealed.value = "false";
      mine.value = "false";
      td.setAttributeNode(isRevealed);
      td.setAttributeNode(mine);
      game.append(td);
    }
  }
}
//Research
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
//Self
function resetGame() {
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      let cell = document.getElementById(i + "." + j);
      cell.setAttribute("mineData", "false");
      cell.style.backgroundColor = "#ADD8E6";
      cell.innerText = "";
    }
  }
  state.innerText = "Play Game";
  generateBombs();
}
//Self
function generateBombs() {
  var percentage = (count / (rows * columns)) * 100;
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      var p = getRandomInt(rows * columns);
      if (p <= percentage) {
        let cell = document.getElementById(i + "." + j);
        cell.setAttribute("mineData", "true");
      }
    }
  }
}
//Research with self
function checkTile(e, row, column) {
  let tile = e.target;
  if (tile.getAttribute("mineData") == "true") {
    state.innerText = "You Lose!";
    //resetGame();
  } else {
    tile.style.backgroundColor = "green";
    let position = tile.id.split(".");
    let row = position[0];
    let column = position[1];
    row = parseInt(row);
    column = parseInt(column);
    var numberOfBombs = checkAround(row, column);
    if (numberOfBombs == 0) {
      tile.innerText = numberOfBombs;
      spread(row, column);
    } else {
      tile.innerText = numberOfBombs;
    }
  }
}

function spread(row, column) {
  return;
}
//self, research, and chatgpt fix
function check(row, column) {
  //console.log(typeof row);
  //console.log(typeof column);
  var cell = document.getElementById(row + "." + column);
  if (cell && cell.getAttribute("mineData") === "true") {
    return true;
  }
  return false;
}
//research, chatgpt fix
function checkAround(row, column) {
  //console.log(row + "." + column);
  var amount = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      let rx = row + i;
      let ry = column + j;
      if (rx > 0 && ry > 0 && rx <= rows && ry <= columns) {
        if (check(rx, ry)) {
          amount += 1;
        }
      }
    }
  }
  return amount;
}
//self
function devGame(e) {
  var num = 1;
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      var cell = document.getElementById(i + "." + j);
      if (cell.getAttribute("mineData") == "true") {
        cell.innerText = "💣";
        cell.style.backgroundColor = "red";
      } else {
        cell.innerText = num;
      }
      num += 1;
    }
  }
}
function a() {
  alert("hi");
}

//Developer functions
//self
function revealGame() {
  console.log("Opened devGame");
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      var cell = document.getElementById(i + "." + j);
      var numberOfBombs = checkAround(i, j);
      if (cell.getAttribute("mineData") === "true") {
        cell.innerText = "💣";
        cell.style.backgroundColor = "red";
      } else {
        cell.innerText = numberOfBombs;
        cell.style.backgroundColor = "green";
      }
      if (numberOfBombs == 0) {
        spread(i, j);
      }
    }
  }
}

reset.addEventListener("keypress", a);
reset.addEventListener("click", resetGame);
reveal.addEventListener("click", revealGame);
dev.addEventListener("click", devGame);
/*
function generateBombs(){
  var done = false;
  var percentage = count/(rows*columns)*100
  for(let i = 1; i <= rows*columns; i++){
    var p = getRandomInt(rows*columns);
    console.log("The random: " + p + ", the percentage: " + percentage);
    if(p <= percentage){
      console.log('test');
      window["c"+ i].style.backgroundColor = "black";
    }
  }
}*/

/*
function createGame() {
  game.style.setProperty("--grid-rows", rows.toString());
  game.style.setProperty("--grid-columns", columns.toString());
  //let num = 1;
  let rownum = 1;
  for (let x = 0; x < rows; x++) {
    const tr = document.createElement("tr");
    tr.classList.add("row" + rownum);

    for (let y = 0; y < columns; y++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = "c" + (y + 1);
      //num += 1;
      tr.appendChild(cell);
      //game.appendChild(cell);
    }
    game.appendChild(tr);
    rownum += 1;
  }
}/*

/*function createGame() {
  /*
  num = 1; 
  for (var x = 0; x < rows; x++) {
    const tr = document.createElement("tr");
    tr.classList.add("row");
    for (var y = 0; y < columns; y++) {
      const td = document.createElement("div");
      td.classList.add("cell");
      td.text = "";
      td.id = "c"+ num;
      num += 1;
      tr.style
      tr.append(td);
    }
    game.append(tr);
  }*/

/*

function createCell(x, y) {
  const td = document.createElement("div");
  td.classList.add("cell");
  td.text = "";
  td.dataset.row = x;
  td.dataset.column = y;
}


/*
function checkAround(row, column) {
  var amount = 0;
  if (check(row + 1, column)) {
    console.log("top");
    amount += 1;
  }
  if (check(row + 1, column - 1)) {
    console.log("top left");
    amount += 1;
  }
  if (check(row + 1, column + 1)) {
    console.log("top right");
    amount += 1;
  }
  if (check(row - 1, column)) {
    console.log("bottom");
    amount += 1;
  }
  if (check(row - 1, column - 1)) {
    console.log("bottom left");
    amount += 1;
  }
  if (check(row - 1, column + 1)) {
    console.log("bottom right");
    amount += 1;
  }
  if (check(row, column + 1)) {
    console.log("right");
    amount += 1;
  }
  if (check(row, column - 1)) {
    console.log("left");
    amount += 1;
  }
  return amount;
}*/

/* Sources

https://stackoverflow.com/questions/45208347/create-a-10x10-field-of-cells
https://stackoverflow.com/questions/57550082/creating-a-16x16-grid-using-javascript
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Aligning_items_in_a_flex_container
https://www.youtube.com/watch?v=AfhfAxKFP-s
https://slicker.me/javascript/mine/minesweeper.htm
*/
