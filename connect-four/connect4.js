/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array\
  for (let y = 0; y < HEIGHT; y++) {
    //looping over the height (6 times)
    board.push(Array.from({ length: WIDTH })); //create 6x7 board
  }
  console.log(board);
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board");

  // TODO: add comment for this code

  //This will be to allow us an area to click to add a piece to the board
  const top = document.createElement("tr"); //create a table row
  top.setAttribute("id", "column-top"); //give that table row id "column-top"
  top.addEventListener("click", handleClick); //when we click on that table row, do the handleClick function

  for (let x = 0; x < WIDTH; x++) {
    //looping through the width of the board (7 times)
    const headCell = document.createElement("td"); //create table data cell
    headCell.setAttribute("id", x); //set the id to "x"
    top.append(headCell); //append the table data cell to the table row that we created
  }
  htmlBoard.append(top); //append the table row to the board that we created

  // TODO: add comment for this code
  //this for loop will create the board itself
  for (let y = 0; y < HEIGHT; y++) {
    //looping through the height of the board (6 times)
    const row = document.createElement("tr"); //create a table row
    for (let x = 0; x < WIDTH; x++) {
      //loop through the width (7 times) each time we loop through the height
      const cell = document.createElement("td"); //create a table data cell for each width and height of the board (6x7 42 times)
      cell.setAttribute("id", `${y}-${x}`); //set the id of each created cell to its location  (ie. 3-4)
      row.append(cell); //append each created data cell to each row for each width
    }
    htmlBoard.append(row); //append the created data cells to the board (div)
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  //run a loop over the height and check if the board coordinate is occupied
  //if it is not occupied, then we can place the piece on that y value
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div"); //create the div
  piece.classList.add("piece"); //add class "piece"
  piece.classList.add(`p${currPlayer}`); //add class for currPlayer (p1 or p2)

  //need to append piece to the correct table cell now (get the table cell via the id we create in our makeBoard function)
  const spot = document.getElementById(`${y}-${x}`); //let the location be the id of the correct cell
  spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  //we set the x from the id when we made the table for clicking where we want to the piece to go
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  //we dont know what find spot for col is for yet
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every((row) => row.every((cell) => cell))) {
    //if every cell in every row in the board return true, then the board is filled and it is a draw
    return endGame("NO PLAYER WINS, PLAY AGAIN");
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if (currPlayer === 1) {
    //if currPlayer is 1, set it to 2 now after click
    currPlayer = 2;
  } else if (currPlayer === 2) {
    //if currPlayer is 2, set it back to 1 after the click
    currPlayer = 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    //don't really understand this code
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    //loop through the height of the board
    for (let x = 0; x < WIDTH; x++) {
      //for each loop through the height, loop through the width to check every position on the board
      const horiz = [
        //this is the layout of the win condition in the event of a horizontal 4 in a row
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      const vert = [
        //this is the layout of the win condition in the event of a vertical 4 in a row
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      //this is the layout of the win condition in the event of a diagonal right 4 in a row
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      const diagDL = [
        //this is the layout of the win condition in the event of a diagonal left 4 in a row
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];
      //if any of these situations are true (only one can be true in a given game finish), then return true
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
