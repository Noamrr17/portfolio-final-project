//משתנים
const X_CLASS = 'x' //איקס
const CIRCLE_CLASS = 'circle' //עיגול

//שילובי ניצחון
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //עמודה
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //שורה
    [0, 4, 8], [2, 4, 6] //אלכסון
]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton') // הפעלת כפתור התחל מחדש
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame() //סימון ריחוף 'הובר' התחלתי

restartButton.addEventListener('click', startGame)

//התחל משחק
function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true }) // ברגע שלוחצים על האלמנט יודפס איקס או עיגול בכל תא פעם אחת
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

//הכרזה על ניצחון או על תיקו
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'תיקו!'
    } else {
        winningMessageTextElement.innerHTML = `${circleTurn ? "O" : "X"} ניצח!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn // מדפיס איקס ועיגול לסירוגין
}

//פונקציית ריחוף
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS) //סימון ריחוף של עיגול
    } else {
        board.classList.add(X_CLASS) //סימון ריחוף של איקס
    }
}

//בדיקת ניצחון
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}