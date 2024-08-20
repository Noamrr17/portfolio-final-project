// Create a "close" button and append it to each list item
// צור כפתור "סגור" וצרף אותו לכל פריט ברשימה
let myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Add a drag option to the list items to arrange them conveniently
// הוסף אפשרות גרירה לפריטי הרשימה על מנת לסדר אותם בצורה נוחה
const item = document.getElementById("myUL");
const sortable = Sortable.create(item, {
    animation: 200,
    ghostClass: 'myghostclass',
    dragClass: 'sortable-drag'
});

// Click on a close button to hide the current list item
// לחץ על כפתור סגור כדי להסתיר את פריט הרשימה הנוכחי
let close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        let div = this.parentElement;
        div.style.display = "none";
    }
}

// Add a "checked" symbol when clicking on a list item
// הוסף סמל "מסומן" בעת לחיצה על פריט ברשימה
let list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

// Create a new list item when clicking on the "Add" button
// צור פריט רשימה חדש בלחיצה על כפתור "הוסף".
const input = document.getElementById("myInput")
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        // event.parentElement();
        // document.getElementById("myDIV").click();
        newElement()
    }
});

function newElement() {
    let li = document.createElement("li");
    let inputValue = document.getElementById("myInput").value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);

    if (inputValue === '') {
        alert("לא הוקלד מוצר!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement;
            div.style.display = "none";
        }
    }
}