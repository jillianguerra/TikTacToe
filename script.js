/*----- constants -----*/
const COLORS = {
    '0': 'white',
    '1': 'pink',
    '-1': 'lightGreen',
}
const LETTERS = {
    '0': '',
    '1': 'X',
    '-1': 'O',
}
const NAMES = {
    '1': 'PINK',
    '-1': 'GREEN',
}
const score = {
    '1': 0,
    '-1': 0,
}
/*----- state variables -----*/
let turn
let board
let winner
/*----- cached elements  -----*/
const messageEl = document.querySelector('h2')
const playAgainBtn = document.querySelector('button')
const cellEls = [...document.querySelectorAll('#board > div')]
const scoreEl = document.querySelector('#score')
/*----- event listeners -----*/
playAgainBtn.addEventListener('click', init)
document.querySelector('#board').addEventListener('click', handleDrop)
/*----- functions -----*/
init()
function init() {
    turn = 1
    // board = [
    // [0, 0, 0],
    // [0, 0, 0], 
    // [0, 0, 0],
    // ]
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    winner = null;
    render()
}
function render() {
    renderBoard()
    renderMessage()
    renderScore()
    renderControl()
}
// function renderBoard(){
//     board.forEach(function(colArr, colIndex) {
//         colArr.forEach(function(rowValue, rowIndex) {
//           const cellId = `r${rowIndex}c${colIndex}`;
//           const cellEl = document.getElementById(cellId)
//           cellEl.style.color = COLORS[rowValue]
//           cellEl.innerText = `${LETTERS[rowValue]}`
//         })
//       })
// }
function renderBoard() {

    board.forEach(function(arr, idx){
         const cellId = `cell${idx}`
         const cellEl = document.getElementById(cellId)
         const boardIdx = board[idx]
         cellEl.style.color = COLORS[boardIdx]
         cellEl.innerText = `${LETTERS[boardIdx]}`
    })
}
function renderMessage() {
    if (winner === 'T') {
        messageEl.innerText = `IT'S A TIE!!`
      }
      else if (winner) {
        messageEl.innerHTML = `<span style='color: ${COLORS[winner]}'>${NAMES[winner].toUpperCase()}</span> WINS!`
      }
      else {
        messageEl.innerHTML = `<span style='color: ${COLORS[turn]}'>${NAMES[turn].toUpperCase()}</span>'S TURN`
      }
}
function renderScore() {
    scoreEl.innerHTML = `
    <div><span style='color: ${COLORS['1']}'>${NAMES['1']}</span>: ${score['1']}</div>
    <div><span style='color: ${COLORS['-1']}'>${NAMES['-1']}</span>: ${score['-1']}</div>
    `
}
function renderControl() {
    playAgainBtn.style.visibility = winner ? 'visible' : 'hidden'
}
function handleDrop(evt) {
    // Each cell needs to be selected and able to be clicked on
    // make sure you can't select the same cell more than once
    // make sure you can't select in between the cells
    // alter the array to be 1 or -1
const nodeIdx = cellEls.indexOf(evt.target)
if (nodeIdx === -1 || winner) {
    return
} else if (board[nodeIdx] !== 0) {
    return
}
else {
    board[nodeIdx] = turn
    console.log(nodeIdx)
}
console.log(board)
winner = getWinner(nodeIdx)
turn *= -1
render()
}
function getWinner() {

}