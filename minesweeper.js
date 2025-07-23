game = document.getElementById("grid");
reset = document.getElementById("reset");
reveal = document.getElementById("reveal");
state = document.getElementById("state");
dev = document.getElementById("developer");
flag = document.getElementById("getFlag");
checkWin = document.getElementById("checkWin");
let flagMode = false;
let rows = 10;
let columns = 10;
let count = 15;
let bombCount = 0;

//Research
window.onload = function () {
  createGame();
  generateBombs();
  updateBombCount();
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
      td.addEventListener("click", checkCell);
      var mine = document.createAttribute("mineData");
      var flag = document.createAttribute("flagData");
      var isRevealed = document.createAttribute("isRevealedData");
      flag.value = "false";
      mine.value = "false";
      isRevealed.value = "false";
      td.setAttributeNode(flag);
      td.setAttributeNode(mine);
      td.setAttributeNode(isRevealed);
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
      cell.setAttribute("isRevealedData", "false");
      cell.setAttribute("flagData", "false");
      cell.className = "cell"; // Reset class list
    }
  }
  checkWin.innerText = "Check";
  bombCount = 0;
  state.innerHTML = '<span class="status-text">Ready to Play</span>';
  generateBombs();
  updateBombCount();
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
        bombCount += 1;
      }
    }
  }
}

// Update bomb count display
function updateBombCount() {
  var bombCountDisplay = document.getElementById("bomb-count");
  if (bombCountDisplay) {
    bombCountDisplay.innerText = bombCount;
  }
}
//Research with self
function checkCell(e, row, column) {
  checkWin.innerText = "Check";
  var statusText = state.querySelector(".status-text")
    ? state.querySelector(".status-text").innerText
    : state.innerText;
  if (
    statusText === "You Lose!" ||
    statusText === "You Won!" ||
    statusText === "Revealed!"
  ) {
    console.log("inner");
    state.innerHTML = '<span class="status-text">Ready to Play</span>';
    resetGame();
    return;
  }
  let cell = e.target;
  if (cell.innerText == "🚩") {
    console.log("check");
    cell.innerText = "";
  } else if (flagMode && cell.innerText == "") {
    cell.setAttribute("flagData", "true");
    cell.innerText = "🚩";
  } else {
    if (
      cell.getAttribute("mineData") == "true" &&
      cell.getAttribute("flagData") === "true"
    ) {
      cell.innerText = "";
      return;
    }
    if (cell.getAttribute("mineData") == "true") {
      console.log("This Change 'You Lose': CheckCell  ");
      state.innerHTML = '<span class="status-text">You Lose!</span>';
      revealGame();
    } else {
      cell.setAttribute("isRevealedData", "true");
      cell.style.backgroundColor = "green";
      let position = cell.id.split(".");
      let row = position[0];
      let column = position[1];
      row = parseInt(row);
      column = parseInt(column);
      var numberOfBombs = checkAround(row, column);
      if (numberOfBombs == 0) {
        spread(row, column);
      } else {
        cell.innerText = numberOfBombs;
        cell.classList.add("number-" + numberOfBombs);
      }
    }
  }
  didYouWin();
}

function spread(row, column) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let rx = row + i;
      let ry = column + j;
      if (i === 0 && j === 0) {
        continue;
      }
      if (rx > 0 && ry > 0 && rx <= rows && ry <= columns) {
        var cell = document.getElementById(rx + "." + ry);
        if (
          cell.getAttribute("flagData") === "false" &&
          cell.getAttribute("isRevealedData") === "false"
        ) {
          let = bombsAround = checkAround(rx, ry);
          if (bombsAround === 0) {
            cell.innerText = "";
            cell.style.backgroundColor = "green";
            cell.setAttribute("isRevealedData", "true");
            spread(rx, ry);
          } else {
            cell.innerText = bombsAround;
            cell.style.backgroundColor = "green";
            cell.setAttribute("isRevealedData", "true");
            cell.classList.add("number-" + bombsAround);
          }
        }
      }
    }
  }
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
        cell.classList.add("number-" + numberOfBombs);
      }
      if (numberOfBombs == 0) {
        spread(i, j);
      }
    }
  }
  checkWin.innerText = "Check";
  console.log("Title 'You Lose': revealGame");
  state.innerHTML = '<span class="status-text">Revealed!</span>';
}
function enableflag() {
  flagMode = !flagMode;
  if (flagMode) {
    flag.innerHTML =
      '<span class="btn-icon">🚩</span><span class="btn-text">ON</span>';
    flag.classList.add("active");
  } else {
    flag.innerHTML =
      '<span class="btn-icon">🚩</span><span class="btn-text">Flag Mode</span>';
    flag.classList.remove("active");
  }
}
function didYouWin() {
  var win = 0;
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      var cell = document.getElementById(i + "." + j);
      if (
        cell.getAttribute("mineData") === "true" &&
        cell.getAttribute("flagData") === "true"
      ) {
        win += 1;
        console.log(win);
      }
    }
  }
  if (win === bombCount) {
    state.innerHTML = '<span class="status-text">You Won!</span>';
    flag.innerHTML =
      '<span class="btn-icon">🎉</span><span class="btn-text">You Win!</span>';
  }
}
reset.addEventListener("keypress", a);
reset.addEventListener("click", resetGame);
reveal.addEventListener("click", revealGame);
dev.addEventListener("click", devGame);
flag.addEventListener("click", enableflag);
checkWin.addEventListener("click", didYouWin);
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
