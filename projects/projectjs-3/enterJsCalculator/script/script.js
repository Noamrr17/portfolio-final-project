let value = document.getElementById('value'); //ערכים
let screenValue = value.textContent; //ערכים בתצוגת המחשבון
let firstValue = 0; //ערך ראשוני
let previousOperator = null; //פעולות קודמות
let waitingForSecondValue = false; //ממתין לערך משני
let toggleBtn = document.querySelector('.toggleBtn'); //כפתור להחלפת צבע רקע
let body = document.querySelector('body'); //רקע הדף

//פונקציה המאפשרת להכניס כל מספר לתצוגה
function inputDigit(digit) {
    if (waitingForSecondValue) {
        waitingForSecondValue = false;
        screenValue = digit;
    } else {
        screenValue = screenValue === '0' ? digit : screenValue + digit;
    }
    updateScreenDisplay();
}

//פונקציה המאפשרת להכניס מספרים לא שלמים לתצוגה
function inputDecimal() {
    if (waitingForSecondValue) {
        inputDigit('0.');
    }
    if (!screenValue.includes('.')) {
        screenValue = screenValue + '.';
    }
    updateScreenDisplay();
}

//פונקציה המגדירה ערכים מחיוביים לשליליים
function toggleSign() {
    screenValue = screenValue * -1;
    if (waitingForSecondValue) {
        firstValue = screenValue;
    }
    updateScreenDisplay();
}

//פונקציה המאפשרת למחוק מספר מהתצוגה
function clearEntry() {
    screenValue = screenValue.slice(0, -1);
    if (screenValue.length === 0) {
        screenValue = '0';
    }
    updateScreenDisplay();
}

//פונקציה המבצעת אתחול למחשבון
function allClear() {
    firstValue = 0;
    screenValue = '0';
    updateScreenDisplay();
}

//פונקציה המבצעת פעולות מתמטיות
function handleOperator(currentOperator) {
    if (waitingForSecondValue) {
        previousOperator = currentOperator;
        return;
    }

    firstValue = calculate(firstValue, previousOperator, parseFloat(screenValue));
    screenValue = firstValue;
    previousOperator = currentOperator;
    waitingForSecondValue = true;
    updateScreenDisplay();
}

function calculate(first, operator, second) {
    if (operator === '+') return first + second;
    if (operator === '-') return first - second;
    if (operator === '*') return first * second;
    if (operator === '/') return first / second;

    return second;
}

//ערך בתצוגה נפרד לפי פסיקים
function separateScreenValueByComma() {
    let parts = screenValue.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

//פונקציה המעדכנת מספרים
function updateScreenDisplay() {
    value.textContent = separateScreenValueByComma();
}

//פונקציה המגדירה מצב רקע כהה
toggleBtn.onclick = function () {
    body.classList.toggle('dark');
}