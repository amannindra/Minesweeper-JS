game = document.getElementById("grid");
reset = document.getElementById("reset");
reveal = document.getElementById("reveal");
var testMode = false;
let rows = 10;
let columns = 10;
let count = 10;
createGame();
generateBombs();
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
      var mine = document.createAttribute("data-mine");
      var isRevealed = document.createAttribute("data-is-revealed");
      isRevealed.value = "false";
      mine.value = "false";
      td.setAttributeNode(isRevealed);
      td.setAttributeNode(mine);
      game.append(td);
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function resetGame() {
  for(let i=1;i<=rows; i++){
    for(let j=1; j <= columns; j++){
      window[i+"."+j].setAttribute("data-mine","false");
      window[i+"."+j].style.backgroundColor = "red";
    }
  }
  generateBombs();
}
function generateBombs() {
  var percentage = (count / (rows * columns)) * 100;
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      var p = getRandomInt(rows * columns);
      console.log("The random: " + p + ", the percentage: " + percentage);
      if (p <= percentage) {
        console.log("test");
        window[i+"."+j].style.backgroundColor = "black";
        window[i+"."+j].setAttribute("data-mine","true");
      }
    }
  }
}
function revealGame(e) {
  for(let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++){
      var s = window[i+"."+j];
      if(s.getAttribute("data-mine")=="false"){
        for(var k = -1; k <= 1; k++) {
          for(var l = -1; l <= 1; l++){
            
          }
        }
      }
    }

  }
}
reset.addEventListener("click", resetGame);
reveal.addEventListener("click", revealGame);


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
*/
/* Sources

https://stackoverflow.com/questions/45208347/create-a-10x10-field-of-cells
https://stackoverflow.com/questions/57550082/creating-a-16x16-grid-using-javascript

*/
