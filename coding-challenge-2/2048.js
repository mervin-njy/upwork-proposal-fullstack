"use strict";

////////////////////--------------------------------------------------------------------------------------------
// VARIABLES ---------------------------------------------------------------------------------------------------
// base variables to access DOM
const body = document.querySelector("body");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const instructButton = document.querySelector(".instruction");
const fillTilesButton = document.querySelector(".fill-tiles");
// access classes and elements that can be reset
let board = null;
let allTiles = [];
let instruction = document.querySelector(".instructions");
let fillTiles = false; // fill tiles true => display tiles up to 2048 ++, fale => back to randomized starting
let dropdown = null;
let score = document.querySelector("#score").innerHTML;
let bestScore = document.querySelector("#best-score").innerHTML;
let gameState = true;
// colour palette picker - [2, 4, 8.... >2048, emptyTileCol, board/borderCol]
const colourPalettes = {
  default: [
    "#F1F5F7", // 2 + later font colors
    "#D3DBDF", // 4
    "#BFCBD0", // 8
    "#A7B5BA", // 16
    "#98A4A9", // 32
    "#8B969B", // 64
    "#7C888C", // 128
    "#636E72", // 256
    "#485154", // 512
    "#2D3436", // 1024
    "#161B1D", // >= 2048 + earlier font colors #390E06
    "#A2A9AC", // 0
    "#22282A", // border colour
  ],
  red: [
    "#F1E4E4", // 2 + later font colors
    "#EED6D6", // 4
    "#E7C1C1", // 8
    "#DCA8A8", // 16
    "#D19090", // 32
    "#C47D7D", // 64
    "#A76060", // 128
    "#904E4E", // 256
    "#7A3C3C", // 512
    "#652C2C", // 1024
    "#491C1C", // >= 2048 + earlier font colors #390E06
    "#BFA49F", // 0
    "#582B2B", // border colour
  ],
  orange: [
    "#FFECE5", // 2 + later font colors
    "#FAD7C9", // 4
    "#EBB8A4", // 8
    "#DCA690", // 16
    "#CB957F", // 32
    "#B8816D", // 64
    "#A5705C", // 128
    "#95614E", // 256
    "#7F5343", // 512
    "#6F4636", // 1024
    "#603A2D", // >= 2048 + earlier font colors
    "#BDB0A7", // 0
    "#453228", // border colour
  ],
  yellow: [
    "#FFF9D3", // 2 + later font colors
    "#FFF4AF", // 4
    "#FFEF86", // 8
    "#F1E176", // 16
    "#E1D263", // 32
    "#CBBE5E", // 64
    "#B8AD56", // 128
    "#ACA35A", // 256
    "#9F954F", // 512
    "#988D47", // 1024
    "#877D3D", // >= 2048 + earlier font colors
    "#D0CAA8", // 0
    "#93873B", // border colour
  ],
  green: [
    "#D5EFF0", // 2 + later font colors
    "#AACECE", // 4
    "#80B5B5", // 8
    "#6EA0A0", // 16
    "#598E8E", // 32
    "#497D7D", // 64
    "#3C7373", // 128
    "#336969", // 256
    "#285B5B", // 512
    "#214E4E", // 1024
    "#1B3333", // >= 2048 + earlier font colors
    "#80918C", // 0
    "#284445", // border colour
  ],
  blue: [
    "#eef6ff", // 2 + later font colors
    "#D2E5FA", // 4
    "#a8c4e4", // 8
    "#789cc2", // 16
    "#53779d", // 32
    "#416082", // 64
    "#2E4F71", // 128
    "#23415F", // 256
    "#183453", // 512
    "#11263E", // 1024
    "#0B1A2C", // >= 2048 + earlier font colors
    "#929ca7", // 0
    "#283845", // border colour
  ],
  purple: [
    "#F7EDFF", // 2 + later font colors
    "#E0D5F3", // 4 -- CHANGE THIS
    "#D2C4E7", // 8
    "#BDAED5", // 16
    "#B0A0CB", // 32
    "#9E8DBA", // 64
    "#84759A", // 128
    "#6B5C82", // 256
    "#53456A", // 512
    "#44365B", // 1024
    "#2B2039", // >= 2048 + earlier font colors
    "#978E9F", // 0
    "#332845", // border colour
  ],
};
let colPalette = colourPalettes.default;
let minValCol = colPalette[0];
let maxValCol = colPalette[colPalette.length - 3];
let emptyTileCol = colPalette[colPalette.length - 2];
let borderCol = colPalette[colPalette.length - 1];
let docBackgroundCol = colPalette[Math.floor(colPalette.length * 0.8)];
let accentCol = colPalette[Math.floor(colPalette.length * 0.7)];
let accentCol2 = colPalette[Math.floor(colPalette.length * 0.4)];
// base variables to change grid/tile parameters
let gridCount = 4; // to be changed if resetBoard() is triggered later on
const newGridCount = 6;
let gridSize = 90; // to be changed if resetBoard() triggered later on
const newGridSize = (gridSize / newGridCount) * gridCount;
const gridBorder = 4;
const maxInitialTiles = 2;
const numFontSize = gridSize * 0.35;
const buttonWidth = gridSize; // this ensures that button size doesn't change even if board is reset
////////////////////--------------------------------------------------------------------------------------------
// CLASSES -----------------------------------------------------------------------------------------------------
// class Board {} to store board DOM and functions to manipulate it with events
class Board {
  constructor() {
    this.DOM = null;
  }

  // sets DOM element properties once setBoard() or resetBoard() is invoked
  constructDOM() {
    body.style.backgroundColor = maxValCol;
    body.style.color = minValCol;
    header.style.width = gridSize * gridCount + "px";
    footer.style.width = gridSize * gridCount + "px";
    document.querySelector("#best-score").innerHTML = bestScore;
    //<div id="board"></div>
    const newBoard = document.createElement("div");
    newBoard.id = "board";
    newBoard.style.width = gridSize * gridCount + "px";
    newBoard.style.height = gridSize * gridCount + "px";
    newBoard.style.border = gridBorder + "px solid";
    newBoard.style.backgroundColor = borderCol;
    newBoard.style.borderRadius = gridBorder * 2 + "px";
    newBoard.style.borderColor = borderCol;

    this.DOM = newBoard;
    header.after(newBoard);
  }

  // updates DOM colour properties when colour palette is swapped
  updateColour() {
    body.style.backgroundColor = maxValCol;
    body.style.color = minValCol;
    this.DOM.style.backgroundColor = borderCol;
    this.DOM.style.borderColor = borderCol;
  }
}

// class Tile {} to store tile id and values, combine functions
class Tile {
  // create id="trc", where r=row indices & c=column indices, also stores tile value under .num
  constructor(colInd, rowInd, num = 0) {
    (this.x = colInd),
      (this.y = rowInd),
      (this.num = num),
      (this.id = `t${this.x}${this.y}`),
      (this.DOM = null),
      (this.combined = false); // this boolean toggles if tile number is changed => triggers animation
  }

  // sets DOM element properties once createTiles() is invoked
  constructDOM() {
    //<div id="x y>">num</div>
    const newTile = document.createElement("div");
    newTile.id = this.id;
    newTile.style.width = gridSize - gridBorder * 2 + "px";
    newTile.style.height = gridSize - gridBorder * 2 + "px";
    newTile.style.border = gridBorder + "px solid";
    newTile.style.borderRadius = gridBorder * 2 + "px";

    // add DOM classes for .tile and create tile within board DOM
    newTile.classList.add("tile");
    this.DOM = newTile;
    this.updateDOM();
    document.querySelector("#board").append(newTile);
  }

  // updateDOM has 2 update functions - to separate updateColour() when colour dropdown event is triggered
  updateDOM() {
    this.updateColour();
    this.updateNum();
  }

  // said updateColour() function
  updateColour() {
    // fixed border colour
    this.DOM.style.borderColor = borderCol;
    // change tile colours
    if (this.num < 2) {
      this.DOM.style.backgroundColor = emptyTileCol;
    } else if (this.num <= 2048) {
      // Math.log(this.num) / Math.log(2) - 0 is the opposite of math.pow()
      // ind  = 0, 1, 2, 3, 4... 11... => val = math.pow(2, ind) = 1, 2, 4, 8, 16... 2048... (let's just take 1 as 0 with val <2)
      this.DOM.style.backgroundColor =
        colPalette[Math.log(this.num) / Math.log(2) - 1];
    } else {
      this.DOM.style.backgroundColor = maxValCol;
    }

    // after tile 32, the font colour changes to lightest shade of palette (contrast with dark background)
    if (this.num <= Math.pow(2, 5)) {
      this.DOM.style.color = maxValCol;
    } else {
      this.DOM.style.color = minValCol;
    }
  }

  // update DOM element's number & font properties whenever it is changed from slide(), also triggers animation
  updateNum() {
    // update score
    document.querySelector("#score").innerHTML = score;
    // update number display and DOM class
    if (this.num >= 2) {
      this.DOM.innerText = this.num;
      this.DOM.classList.add("t" + this.num);
    } else {
      this.DOM.innerText = ""; // don't display if number is 1 or math.pow(2,1)
      this.DOM.style.backgroundColor = emptyTileCol;
    }

    this.DOM.style.fontSize = numFontSize + "px";
    // reduce font size if num is too large
    if (this.num.toString().length > 3) {
      this.DOM.style.fontSize =
        numFontSize - this.num.toString().length * 3 + "px";
    }

    // add combine animation keyframes by toggling the class
    if (this.combined) {
      this.DOM.classList.toggle("tile-combine");
    }
  }
}

// dropdown menu DOM creation within this class
class Dropdown {
  constructor() {
    (this.container = null),
      (this.select = null),
      (this.selected = null),
      (this.arrow = null),
      (this.menu = null),
      (this.option = null),
      (this.active = null);
  }

  updateDOM() {
    // assign this. properties with DOM selector
    this.container = document.querySelector(".dropdown");
    this.select = document.querySelector(".select");
    this.selected = document.querySelector(".selected");
    this.arrow = document.querySelector(".arrow");
    this.menu = document.querySelector(".menu");
    this.options = document.querySelectorAll(".menu li");
    this.active = document.querySelector(".active");

    // dimension calculations
    const border = gridBorder / 4;
    const margin = (gridBorder * 3) / 4;
    const width = gridSize - (margin + border) * 3;
    // update dimensions (of dropdown DOM) - to match the tiles
    this.container.style.width = width + "px";
    this.container.style.margin = margin + "px";
    this.select.style.width = width + "px";
    this.select.style.border = border + "px solid";
    this.select.style.fontSize = width * 0.15 + "px";
    this.menu.style.border = border + "px solid";
    this.menu.style.fontSize = width * 0.16 + "px";
    // update dimensions (of buttons as well) - to match the tiles
    const buttonDimension = (btn) => {
      btn.style.width = width + "px";
      btn.style.margin = margin + "px";
      btn.style.border = border + "px solid";
      btn.style.fontSize = width * 0.15 + "px";
    };
    buttonDimension(instructButton);
    buttonDimension(fillTilesButton);

    // change colours
    this.updateColour();
  }

  updateColour() {
    // change dropdown colours
    console.log("Updating dropdown colours");
    this.select.style.backgroundColor = maxValCol;
    this.select.style.color = minValCol;
    this.select.style.borderColor = minValCol;
    this.menu.style.backgroundColor = accentCol;
    this.menu.style.borderColor = maxValCol;
    this.menu.style.color = accentCol2;
    this.active.style.backgroundColor = maxValCol;
    // change button colours to match too
    const buttonColour = (btn) => {
      btn.style.backgroundColor = maxValCol;
      btn.style.color = minValCol;
      btn.style.borderColor = minValCol;
    };
    buttonColour(instructButton);
    buttonColour(fillTilesButton);
    // change selection background colour
    document.documentElement.style.setProperty("--highlight-color", accentCol2);
  }

  // sets event listeners for dropdown clicks
  assignListeners() {
    // click event to select element (dropdown button)
    this.select.addEventListener("click", () => {
      // add clicked select style transition
      this.select.classList.toggle("select-clicked");
      // add arrow rotation style transition
      this.arrow.classList.toggle("arrow-rotate");
      // add menu opening style transition
      this.menu.classList.toggle("menu-open");
    });

    // click event for all menu options
    this.options.forEach((option) => {
      option.addEventListener("click", () => {
        // remove select-clicked class to prevent the style transition
        this.select.classList.toggle("select-clicked");
        // remove rotating transition
        this.arrow.classList.toggle("arrow-rotate");
        // remove menu opening style transition
        this.menu.classList.toggle("menu-open");
        // remove active class from all menu items
        this.active.classList.remove("active");
        // add active class to currently clicked item from menu
        option.classList.add("active");
        this.active = option;
        console.log(`active colour is now ${this.active.innerText}`);

        this.resetColour();
      });
    });
  }

  resetColour() {
    // checks active colour to change colour palette
    colPalette = colourPalettes[this.active.innerText];
    console.log("resetting colour");
    // update colour variables
    minValCol = colPalette[0];
    maxValCol = colPalette[colPalette.length - 3];
    emptyTileCol = colPalette[colPalette.length - 2];
    borderCol = colPalette[colPalette.length - 1];
    docBackgroundCol = colPalette[Math.floor(colPalette.length * 0.8)];
    accentCol = colPalette[Math.floor(colPalette.length * 0.7)];
    accentCol2 = colPalette[Math.floor(colPalette.length * 0.4)];

    // reset colour for the button selection too!
    this.updateColour();

    // trigger updateColour() for Board & Tile classes
    board.updateColour();
    for (let r = 0; r < allTiles.length; r++) {
      for (let c = 0; c < allTiles[r].length; c++) {
        allTiles[r][c].updateColour();
      }
    }
  }
}

////////////////////--------------------------------------------------------------------------------------------
// FUNCTIONS ---------------------------------------------------------------------------------------------------
// restarts game either by clicking restart at gameOver or restart button in menu

// ----------------------------------------------------------------------------------------- regarding the game
// reset all game values (except for best score)
const resetValues = () => {
  // remove board
  document.querySelector("#board").remove();
  // reset allTiles array to clean slate
  allTiles = [];
  // reset score
  score = 0;
};

// resets the game other than best score
const restartGame = () => {
  // remove modal board that has been created from gameOver
  document.querySelector(".modal").remove();
  // reset score and replace high score if it is higher than it
  if (Number(score) > Number(bestScore)) bestScore = score;
  // remove all game values (other than best score)
  resetValues();
  // reset game state and reset board for new game
  gameState = true;
  // set board again to restart
  setBoard(false);
};

// ends the game due to tiles running out
const gameOver = () => {
  gameState = false; // stops eventlistener from ocurring when you slide tiles
  console.log("Game over. Would you like to restart?");

  const mainColour = docBackgroundCol;
  const accentColour = minValCol;
  // create HTML DOM: Modal & modal content
  // <div class="modal">
  const modalBox = document.createElement("div");
  modalBox.classList.add("modal");
  //  <div class="modal-content">
  const modalDisplay = document.createElement("div");
  modalDisplay.classList.add("modal-content");
  modalDisplay.style.width = gridSize * gridCount * 1.2 + "px";
  modalDisplay.style.backgroundColor = mainColour;
  modalDisplay.style.color = accentColour;
  //      <h3>gameover text</h3>
  const modalText = document.createElement("h3");
  modalText.innerText = "Game over. Would you like to restart?";
  modalDisplay.append(modalText);

  //      <button class="restart-button">restart</button>
  const restartButton = document.createElement("button");
  restartButton.classList.add("restart-button");
  restartButton.innerText = "YES PLEASE";
  restartButton.style.backgroundColor = accentColour;
  restartButton.style.color = mainColour;
  modalText.after(restartButton);
  // </div></div>
  modalBox.append(modalDisplay);
  header.after(modalBox);

  // restart game once button is clicked
  restartButton.addEventListener("click", () => {
    restartGame();
  });
};

// -------------------------------------------------------------------------------------- regarding the buttons
// similar to gameOver modal box - open one to display instructions
const openInstructions = () => {
  console.log("Showing game instructions");

  const mainColour = docBackgroundCol;
  const accentColour = minValCol;
  // create HTML DOM: Modal & modal content
  // <div class="modal">
  const modalBox = document.createElement("div");
  modalBox.classList.add("modal");
  //  <div class="modal-content">
  const modalDisplay = document.createElement("div");
  modalDisplay.classList.add("modal-content");
  modalDisplay.style.width = gridSize * gridCount * 2 + "px";
  modalDisplay.style.backgroundColor = mainColour;
  modalDisplay.style.color = accentColour;
  //      <h3>instruction text</h3>
  const modalTitle = document.createElement("h4");
  modalTitle.innerText = "How to play:";
  modalDisplay.append(modalTitle);
  //      <h3>instruction text</h3>
  const modalText1 = document.createElement("p");
  modalText1.innerText =
    "2048 is a puzzle game that progresses with sliding tiles. The goal is to accumulate tiles of as high value as possible. To achieve this, you can slide the board in one direction in each turn, and adjacent tiles with the same number on them can be combined, and the tile will double in value.";
  const modalText2 = document.createElement("p");
  modalText2.innerText =
    "There are only 4 directions to slide - up, down, left and right! Just use the arrow keys on your keyboard to activate your move.";
  modalDisplay.append(modalText1, modalText2);

  //      <button class="close-button">X</button>
  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.innerText = "Got it, let me play!";
  closeButton.style.backgroundColor = accentColour;
  closeButton.style.color = mainColour;
  modalText2.after(closeButton);
  // </div></div>
  modalBox.append(modalDisplay);
  header.after(modalBox);

  // add event listener for close button to remove instruction display
  closeButton.addEventListener("click", () => {
    document.querySelector(".modal").remove();
  });
};

// fill-tiles button triggers filling of tiles to showcase colour palette
const fillAllTiles = () => {
  console.log("Filling tiles for you :)");

  // remove all game values (other than best score)
  resetValues();

  // toggles fillTile with each click
  if (fillTiles === false) fillTiles = true;
  else fillTiles = false;

  // reset board - but create of tiles with new fillTiles boolean
  setBoard(false); // false since this is not the first time setting the board, do not need to reassign listeners
};

// -------------------------------------------------------------------- regarding board & tile element creation
const resetBoard = () => {
  gridSize = newGridSize;
  gridCount = newGridCount;
  setBoard();
};

// setBoard() {} logic triggered by window onload
const setBoard = (firstTime = true) => {
  // constructs new board element with properties based on grid count, default = 4
  board = new Board();
  board.constructDOM();

  // construct tiles after board is set up
  createTiles();

  // update button dropdowns
  dropdown = new Dropdown();
  dropdown.updateDOM();
  // trigger dropdown menu upon click - very first time setting board
  if (firstTime) dropdown.assignListeners();
};

// createTiles() {} logic triggered by setBoard()
const createTiles = () => {
  // construct array for each row
  let tileRow = [];
  // randomly generate starting tiles with empty values
  for (let i = 0; i < gridCount * gridCount; i++) {
    // construct new tile class to store index and value (col (x), row (y), num)
    let newTile = null;
    // false => create tiles by default, 2 random ones
    if (fillTiles === false) {
      newTile = new Tile(i % gridCount, Math.floor(i / gridCount));
    } else {
      // true => create tiles up to 2048
      let tileNum = 2;
      if (i > 0) tileNum = Math.pow(2, i);
      newTile = new Tile(i % gridCount, Math.floor(i / gridCount), tileNum);
    }

    // num = Math.pow(2, i) to see values with colours
    newTile.constructDOM();

    // fill tileRow array until length = gridCount
    tileRow.push(newTile);
    // if so, push to main array and empty tileRow for refill
    if (tileRow.length === gridCount) {
      allTiles.push(tileRow);
      tileRow = []; // reset row Array for new row
    }
  }

  // generate specific number of tiles to have starting values at random - only if fillTiles === false
  if (fillTiles === false) generateNew(maxInitialTiles, countTileValue(0));
};

// -------------------------------------------------------------------------------- general functions for reuse
// counts total number of empty tiles left on the board
const countTileValue = (val) => {
  // val = 1 refers to empty tiles, finding number of val = 2048 can trigger next event
  let count = 0;

  for (let r = 0; r < allTiles.length; r++) {
    for (let c = 0; c < allTiles[r].length; c++) {
      if (allTiles[r][c].num === val) {
        count++;
      }
    }
  }
  return count;
};

// ------------------------------------------------------------------------ main functions for game interaction
// generate new tiles at the end of each sliding step, only true if there are empty tiles
const generateNew = (tileCount, emptyTiles) => {
  // function to get array of emptyTiles for randomized tile allocation
  const emptyTileArray = (nestedArr) => {
    const arr = [];
    for (let r = 0; r < nestedArr.length; r++) {
      for (let c = 0; c < nestedArr[r].length; c++) {
        if (nestedArr[r][c].num === 0) {
          arr.push(nestedArr[r][c]);
        }
      }
    }
    return arr;
  };

  // function to assign value in the tile's DOM
  const addVal = (tileToAdd) => {
    tileToAdd.num = Math.ceil(Math.random() * 2) * 2; // returns 2 or 4 randomly
    tileToAdd.DOM.classList.toggle("tile-appear");
    tileToAdd.updateDOM(); // update values to DOM element's properties
    return 1;
  };

  // get empty tiles to choose from
  const allEmpty = emptyTileArray(allTiles);
  // randomly assign tiles with values n times
  for (let i = 0; i < tileCount; i++) {
    const randomTileIndex = Math.floor(Math.random() * (emptyTiles - i));
    addVal(allEmpty[randomTileIndex]);
    allEmpty.splice(randomTileIndex, 1);
  }
};

// triggers with slide(dir), "flattens" array in a specific direction
const combineTiles = (row) => {
  // creates a new array without the zeroes
  const filterZero = (arr) => arr.filter((num) => num !== 0);

  // 1. remove zero => e.g. from [0, 2, 2, 4]
  let newRow = filterZero(row); // to [2, 2, 4]
  // 1b. if combined, add true to combined array, else false
  let combined = [];

  // 2. check adjacent value and combine
  for (let c = 0; c < newRow.length - 1; c++) {
    if (newRow[c] === newRow[c + 1]) {
      newRow[c] *= 2;
      newRow[c + 1] = 0; // [2, 2, 4] => [4, 0, 4]
      score = score * 1 + newRow[c];
      // 2b. fill up true and false similarly, and add 0 to be filtered out
      combined.push(true);
      // combined.push(0);
    } else combined.push(false);
  }

  // 3. remove zeroes again
  newRow = filterZero(newRow); // [4, 4]
  combined = filterZero(combined);

  // 4a. add back zeroes to the back (while row is not full)
  // 4b. add back false for tiles that are not combined
  while (newRow.length < gridCount) newRow.push(0);
  while (combined.length < gridCount) combined.push(false);
  return [newRow, combined];
};

// slide(dir) {} Logic
const slide = (dir) => {
  console.log("Sliding " + dir);
  // for transposing array if dir === up and down
  const transposeArray = (nestedArray) => {
    const newArray = [];

    for (let row = 0; row < nestedArray.length; row++) {
      const innerArray = [];

      for (let col = 0; col < nestedArray[row].length; col++) {
        innerArray.push(nestedArray[col][row]);
        if (innerArray.length === nestedArray[row].length) {
          newArray.push(innerArray);
        }
      }
    }
    return newArray;
  };

  // checks arrays before and after sliding, if its the same, return false so generateTiles() does not get invoked
  const checkDuplicate = (arrayOne, arrayTwo) => {
    let same = true;
    // loops through each tile value for comparison
    for (let r = 0; r < arrayOne.length; r++) {
      for (let c = 0; c < arrayOne[r].length; c++) {
        if (arrayOne[r][c].num !== arrayTwo[r][c]) {
          same = false;
          break;
        }
      }
    }
    return same;
    // true = array is the same throughout, don't change
    // false = not the same, change
  };

  const checkAdjacency = (dir) => {
    let same = false;
    let arr = allTiles;
    // transpose arr to check for vertical adjacency
    if (dir === "vertical") arr = transposeArray(arr);

    // loops through each tile to compare with adjacent tile's value
    for (let r = 0; r < arr.length; r++) {
      // compare for all rows
      for (let c = 0; c < arr[r].length - 1; c++) {
        // last column not required to compare (index +1 will exceed range)
        if (arr[r][c].num === arr[r][c + 1].num) {
          same = true; // change to true if any adjacent tile can be combined
          break;
        }
      }
    }
    if (same) {
      console.log(`${dir} direction can still slide.`);
    } else {
      console.log(`${dir} direction cannot move anymore.`);
    }
    return same;
    // true = tiles still can combine, game is not over
    // false = tiles cannot combine anymore, gameOver
  };

  // start with initial array to manipulate,
  // if dir === left, continue combining as per normal (correct direction in combineTiles by flattening leftwards)
  // if dir === right, reverse() array, before combineTiles(), then reverse() to get back original
  // if dir === up, tranposeArray(), before combineTiles(), then transposeArray() to get back
  // if dir == down, transposeArray(), array.reverse(), combineTiles(array), array.reverse(), transposeArray()
  // then finally remap values onto tile DOM's innerText based on  actual tile class' .num property
  let initialArr = allTiles;

  if (dir === "up" || dir === "down") initialArr = transposeArray(initialArr);

  let combinedArr = [];
  let checkCombinedArr = [];
  // 1. loop through each row of Tiles to "flatten"
  for (let r = 0; r < initialArr.length; r++) {
    let currRow = [];
    let checkCombinedRow = [];
    // 2. convert tile class array into array of their numbers
    for (const t of initialArr[r]) currRow.push(t.num);

    // 3. combine function
    if (dir === "left" || dir == "up") {
      // a. combine values and update as new row
      const checkRow = combineTiles(currRow);
      currRow = checkRow[0];
      checkCombinedRow = checkRow[1];
    } else if (dir === "right" || "down") {
      // b. manipulate row if slide dir is right
      currRow.reverse(); // do not need to reverse checkCombinedRow since it's still empty
      const checkRow = combineTiles(currRow);
      currRow = checkRow[0];
      currRow.reverse();
      checkCombinedRow = checkRow[1];
      checkCombinedRow.reverse();
    }
    combinedArr.push(currRow);
    checkCombinedArr.push(checkCombinedRow);
  }

  if (dir === "up" || dir === "down") {
    combinedArr = transposeArray(combinedArr);
    checkCombinedArr = transposeArray(checkCombinedArr);
  }

  // checks if after combination, array is the same: false => change / true => don't change
  if (checkDuplicate(allTiles, combinedArr) === false) {
    // 4. convert numbers back to .num of each tile & check for combination animation
    // maps combinedArr values into allTiles' tile classes
    for (let r = 0; r < allTiles.length; r++) {
      allTiles[r].map((element, index) => {
        // set animations to false to reset toggle in updateDOM
        element.DOM.classList.toggle("tile-combine", false);
        element.DOM.classList.toggle("tile-appear", false);
        // change number
        element.num = combinedArr[r][index];
        // toggle boolean to trigger animation
        if (checkCombinedArr[r][index] === true) element.combined = true;
        else element.combined = false;

        element.updateDOM();
      });
    }

    // generate new tile for next step, however we need a condition to check if the tile layout changed after sliding
    generateNew(1, countTileValue(0));
  }

  // after generating new tile, check if the new board can still rearrange tiles
  // 1. check if board has empty tiles
  if (countTileValue(0) === 0) {
    // 2. if board has no more space, check if adjacent tiles can be combined (in both directions) => either is false = gameOver()
    if (checkAdjacency("horizontal") || checkAdjacency("vertical")) {
      console.log("game continues");
    } else {
      gameOver();
    }
  }
};

////////////////////--------------------------------------------------------------------------------------------
// EVENT LISTENERS ---------------------------------------------------------------------------------------------
// on window load, construct board to fill tiles
window.addEventListener("load", () => {
  console.log("game board is loaded");
  setBoard();
});

// eventListener: keypress for sliding tiles
window.addEventListener(
  "keyup",
  (e) => {
    if (e.defaultPrevented) {
      return; // Do nothing if event was already processed
    }
    if (gameState === true) {
      switch (e.key) {
        case "ArrowDown":
          // slide(down)
          slide("down");
          break;
        case "ArrowUp":
          // slide(up)
          slide("up");
          break;
        case "ArrowLeft":
          // slide(left)
          slide("left");
          break;
        case "ArrowRight":
          // slide(right)
          slide("right");
          break;
        case "Escape":
          // requestRestart()
          break;
      }
    }
    e.preventDefault();
  },
  true
);

// keyup has preventdefault to prevent scrollbar from moving, but when you keyup, keydown has to happen too, use this to prevent scrolling
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
    case "ArrowRight":
    case "ArrowUp":
    case "ArrowDown":
      e.preventDefault();
      break;
  }
});

// triggers popup window to display instructions
instructButton.addEventListener("click", () => openInstructions());
// toggles fill tiles to show tiles w/ colour palette
fillTilesButton.addEventListener("click", () => fillAllTiles());
