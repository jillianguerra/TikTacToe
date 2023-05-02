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
/*----- event listeners -----*/
playAgainBtn.addEventListener('click', init)
// cellEls.addEventListener('click', handleDrop)
/*----- functions -----*/
init()
function init() {
    turn = 1
    board = [
        [0, -1, 0],
        [0, 0, 1],
        [0, 0, 0],
    ]
    winner = null;
    render()
}
function render() {
    renderBoard();
    renderMessage();
    renderControl();
}
function renderBoard(){
    board.forEach(function(colArr, colIndex) {
        colArr.forEach(function(rowValue, rowIndex) {
          const cellId = `r${rowIndex}c${colIndex}`;
          const cellEl = document.getElementById(cellId)
          cellEl.style.color = COLORS[rowValue]
          cellEl.innerText = `${LETTERS[rowValue]}`
        })
      })
}
function renderMessage() {
    if (winner === 'T') {
        messageEl.innerText = `IT'S A TIE!!`
      }
      else if (winner) {
        messageEl.innerHTML = `<span style='color: ${COLORS[winner]}'>${COLORS[winner].toUpperCase()}</span> WINS!`
      }
      else {
        messageEl.innerHTML = `<span style='color: ${COLORS[turn]}'>${COLORS[turn].toUpperCase()}</span>'S TURN`
      }
}
function renderControl() {
    playAgainBtn.style.visibility = winner ? 'visible' : 'hidden'
}
function handleDrop() {
    // Each cell needs to be selected and able to be clicked on
    // make sure you can't select the same cell more than once
    // make sure you can't select in between the cells
    // alter the array to be 1 or -1
    
getWinner()
render()
}
function getWinner() {

}