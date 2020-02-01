document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
//  var board = {
//    cells: [
//     {
//       row: 0, 
//       col: 0,
//       isMine: false,
//       isMarked: false,
//       hidden: true,
//       surroundingMines: 2
//     },
//     {
//       row: 0, 
//       col: 1,
//       isMine: true,
//       isMarked: false,
//       hidden: true,
//       surroundingMines: 2
//     },
//     {
//       row: 0,
//       col: 2,
//       isMine: false,
//       isMarked: false,
//       hidden: true,
//       surroundingMines: 2
//     },
//     {
//       row: 1, 
//       col: 0,
//       isMine: true,
//       isMarked: false,
//       hidden: true,
//       surroundingMines: 2
//     },
//     {
//       row: 1,
//       col: 1,
//       isMine: false,
//       isMarked: false,
//       hidden: true,
//       surroundingMines: 2
//     },
//     {
//       row: 1,
//       col: 2,
//       isMine: false,
//       isMarked: false,
//       hidden: true,
//       surroundingMines: 2
//     },
//     {
//       row: 2,
//       col: 0,
//       isMine: true,
//       isMarked: false,
//       hidden: true,
//       surroundingMines: 2
//     },
//     {
//       row: 2,
//       col: 1,
//       isMine: false,
//       isMarked: false,
//       hidden: true,
//       surroundingMines: 2
//       },
//     {
//       row: 2,
//       col: 2,
//       isMine: false,
//       isMarked: false,
//       hidden: true,
//       surroundingMines: 2
//     }
//   ]
   
//  }

function createGame(){
  var board = { cells: [] }

  sqrNumbers = [9,16,25,36]
  var randomLength = sqrNumbers[Math.floor(Math.random()*sqrNumbers.length)]

  row = 0
  col = 0
  mines = [true,false,false]

  for(let i = 0; i < randomLength; i ++){
    var isMine = mines[Math.floor(Math.random()*mines.length)]
    board.cells[i] = {
      row: row,
      col: col,
      isMine: isMine,
      hidden:true,
      surroundingMines: 0
    }
    if(col < Math.sqrt(randomLength)-1){
      col++
    }
    else{
      row++
      col = 0
    } 
  }
  console.log(board)
  return board
}



function startGame () {

  board = createGame()
  
  for(let i = 0; i < board.cells.length; i ++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  lib.initBoard()

  eventTest = (document.getElementsByClassName('board')[0].children)

  for(let i = 0; i < board.cells.length; i ++){
    eventTest[i].addEventListener('click', checkForWin)
    eventTest[i].addEventListener('contextmenu', checkForWin)

  }
  


}




// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin (evt) {
  mineCount = 0 
  x = 0
  hiddenCount = 0

  for(let i = 0; i < board.cells.length; i ++){

    if(board.cells[i].isMine){ 
      mineCount ++
    }
    if(board.cells[i].hidden ){
      x++
      hiddenCount = x
    }
  }

  for(let i = 0; i < board.cells.length; i ++){

    if (board.cells[i].isMarked != true && board.cells[i].isMine == true){
      return
    }

    if(board.cells[i].isMine != true && board.cells[i].hidden == true){
      return
    }
  }

  lib.displayMessage('You win!')



  // console.log(mineCount)
  // console.log(hiddenCount)

  // let foundCount = 0
  // for(let i = 0; i < board.cells.length; i ++){  

  //   if (board.cells[i].isMarked == true && board.cells[i].isMine == true){
  //     foundCount ++
  //     }
  //   if(foundCount == mineCount){
  //     console.log("win")

  //   }
  //   if(hiddenCount == mineCount ){
  //     console.log("win")
  //   }
    
  // }

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

function countSurroundingMines (cell) {

  surrounding = lib.getSurroundingCells(cell.row, cell.col)
  console.log(surrounding[0])
  var count = 0
  for( let i = 0; i < surrounding.length; i ++){
    if (surrounding[i].isMine == true){
      count++
    }
  }
  console.log(count)
  return count

  console.log("the count = " + count)

 
}

function restart (){
  for(let i = 0; i < board.cells.length; i ++){
    
    board.cells[i].hidden = true;
    console.log(board.cells[i].hidden)
    board.cells[i].surroundingMines= 0;
    console.log(board.cells[i].surroundingMines)
    
  }

};





