/*----- constants -----*/
const COLORS = {
    '0': 'white',
    '1': 'pink',
    '-1': 'lightgreen',
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
let roundWinner
/*----- cached elements  -----*/
const messageEl = document.querySelector('h2')
const playAgainBtn = document.querySelector('#play')
const resetBoardBtn = document.querySelector('#reset')
const cellEls = [...document.querySelectorAll('#board > div')]
const scoreEl = document.querySelector('#score')
const modalEl = document.querySelector('#modal')
const modalDivEl = document.querySelector('#modal > div')
/*----- event listeners -----*/
playAgainBtn.addEventListener('click', init)
resetBoardBtn.addEventListener('click', resetScore)
document.querySelector('#board').addEventListener('click', handleDrop)
/*----- functions -----*/
init()
function init() {
    turn = 1
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
        winner = getWinner(nodeIdx)
        turn *= -1
        render()
    }
}
function getWinner(idx) {
    if (3 === Math.abs(board[0] + board[1] + board[2]) ||
        3 === Math.abs(board[3] + board[4] + board[5]) ||
        3 === Math.abs(board[6] + board[7] + board[8]) ||
        3 === Math.abs(board[0] + board[3] + board[6]) ||
        3 === Math.abs(board[1] + board[4] + board[7]) ||
        3 === Math.abs(board[2] + board[5] + board[8]) ||
        3 === Math.abs(board[0] + board[4] + board[8]) ||
        3 === Math.abs(board[2] + board[4] + board[6])) { 
            const player = board[idx]
            score[player] ++
            getRoundWinner(player)
            return player
        } else if (board.includes(0) === false) {
            console.log('Tie')
        return 'T'
    }
}
function getRoundWinner(player) {
    if (3 === score[player]) {
        modalEl.classList.toggle('open')
        modalDivEl.innerHTML = `<span style='color: ${COLORS[player]}'>${NAMES[player].toUpperCase()}</span> WINS!`
    }
}
function resetScore() {
    score['1'] = 0
    score['-1'] = 0
    init()
    modalEl.classList.toggle('open')
}
// go through the array and find if there are any zeros in the array. 
// If there aren't any 0, then it's a tie.

// Winning board states:
//horizontal
// [1, 1, 1, 0, 0, 0, 0, 0, 0]
// arr[0] arr[1] arr[2]
// [0, 0, 0, 1, 1, 1, 0, 0, 0]
// arr[3] arr[4] arr[5]
// [0, 0, 0, 0, 0, 0, 1, 1, 1]
// arr[6] arr[7] arr[8]
//vertical
// [1, 0, 0, 1, 0, 0, 1, 0, 0]
// arr [0] arr [3] arr[6]
// [0, 1, 0, 0, 1, 0, 0, 1, 0]
// arr[1] arr[4] arr[7]
// [0, 0, 1, 0, 0, 1, 0, 0, 1]
// arr[2] arr[5] arr[8]
//diagonal
// [1, 0, 0, 0, 1, 0, 0, 0, 1]
// arr[0] arr[4] arr[8]
// [0, 0, 1, 0, 1, 0, 1, 0, 0]
// arr[2] arr[4] arr[6]