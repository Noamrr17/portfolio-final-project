//getContext() היא מתודה אשר מחזירה תוכן טקסט ציורי
const canvas = document.querySelector("canvas"),
    toolBtns = document.querySelectorAll(".tool"),
    fillColor = document.querySelector("#fill-color"),
    sizeSlider = document.querySelector("#size-slider"),
    colorBtns = document.querySelectorAll(".colors .option"),
    colorPicker = document.querySelector("#color-picker"),
    clearCanvas = document.querySelector(".clear-canvas"),
    saveImg = document.querySelector(".save-img"),
    ctx = canvas.getContext("2d", { willReadFrequently: true });

// ערכי ברירת מחדל כלליים
let prevMouseX, prevMouseY, snapshot,
    isDrawing = false,
    selectedTool = "brush",
    brushWidth = 5,
    selectedColor = "#000";

const setCanvasBackground = () => {
    // הגדרת רקע הלוח ללבן, כך שרקע התמונה שהורדנו יהיה בצבע לבן
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor; // הגדרת סגנון המילוי בחזרה לצבע שנבחר, זה יהיה צבע המברשת
}

window.addEventListener("load", () => {
    // הגדרת רוחב/גובה של לוח היצירה
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});

const drawRect = (e) => {
    // אם ערך זה אינו מסומן צייר מלבן ריק, אחרת צייר מלבן מלא
    if (!fillColor.checked) {
        // יצירת עיגול לפי סימון העכבר
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const drawCircle = (e) => {
    ctx.beginPath(); // יצירת מסלול חדש לציור עיגול
    // קבלת רדיוס למעגל לפי סמן העכבר
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // יוצר עיגול לפי סימון העכבר
    fillColor.checked ? ctx.fill() : ctx.stroke(); // אם מילוי צבע מסומן אז צייר עיגול מלא, אחרת צייר עיגול ריק
}

const drawTriangle = (e) => {
    ctx.beginPath(); // יצירת מסלול חדש לציור משולש
    ctx.moveTo(prevMouseX, prevMouseY); // העברת משולש לסמן העכבר
    ctx.lineTo(e.offsetX, e.offsetY); // יצירת קו חדש לפי סמן העכבר
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // יצירת קו תחתון עבור המשולש
    ctx.closePath(); // סגירת מסלול המשולש כך שהקו השלישי מצייר אוטומטית
    fillColor.checked ? ctx.fill() : ctx.stroke(); // אם מילוי צבע מסומן אז צייר משולש מלא, אחרת צייר משולש ריק
}

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX; // העברת מיקום העכבר בציר איקס הנוכחי כערך העכבר בציר איקס הקודם
    prevMouseY = e.offsetY; // העברת מיקום העכבר בציר וואי הנוכחי כערך העכבר בציר וואי הקודם
    ctx.beginPath(); // מייצר שביל חדש עבור הכתיבה הבאה
    ctx.lineWidth = brushWidth; // מגדיר את עובי המכחול
    ctx.strokeStyle = selectedColor; // העברת צבע נבחר כסגנון קו
    ctx.fillStyle = selectedColor; // העברת צבע נבחר כסגנון מילוי
    // העתקת נתוני לוח היצירה והעברתם כערך תמונת מצב... זה ימנע את גרירת התמונה
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const drawing = (e) => {
    if (!isDrawing) return; // ברגע שמפסיקים את לצייר עם העכבר אז פעולת הציור מסתיימת
    ctx.putImageData(snapshot, 0, 0); // הוספת נתוני הלוח שהועתקו על לוח הזה

    if (selectedTool === "brush" || selectedTool === "eraser") {
        // אם הכלי שנבחר הוא מחק, הגדר את סגנון הקו לצבע לבן כדי להתאים את צבע הקו לצבע הרקע של הלוח (שהוא גם בצבע לבן)
        // אחרת הגדר את צבע הקו לצבע שנבחר
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor
        ctx.lineTo(e.offsetX, e.offsetY); // יצירת קו לפי סימון העכבר
        ctx.stroke(); // ציור/תיוק קו עם צבע
    } else if (selectedTool === "rectangle") {
        drawRect(e);
    } else if (selectedTool === "circle") {
        drawCircle(e);
    } else {
        drawTriangle(e);
    }
}

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => { // על כל אלמנט שנלחץ בעכבר מתרחש אירוע
        // הסרת מחלקה פעילה מהאפשרות הקודמת והוספה של האפשרות הנוכחית שנלחצה
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        // console.log(selectedTool);

    });
});

sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value); // העברת ערך המחוון (סלידר) כגודל המכחול

colorBtns.forEach(btn => {
    btn.addEventListener("click", () => { // הוספת אירוע לחיצה לכל כפתורי הצבעים
        // הסרת מחלקה שנבחרה מהאפשרות הקודמת והוספה של האפשרות הנוכחית שנלחצה
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        // העברת צבע הרקע של הכפתור שנבחר כערך הצבע שנבחר
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

colorPicker.addEventListener("change", () => {
    // יש אפשורת לבחור מגוון של צבעים מתוך כפתור הצבע הכחול שהוא האחרון מבין שאר הצבעים בסרגל כלים
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});

clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // ניקוי כל הלוח
    setCanvasBackground();
});

saveImg.addEventListener("click", () => {
    const link = document.createElement("a"); // creating <a> element
    link.download = `newPicture.jpg`; // אחרי שלחצנו על הקישור להורדת תמונה יודפס השם של הקישור
    link.href = canvas.toDataURL(); // מעביר את נתוני הלוח כערך קישור הרף (href)
    link.click(); // לחיצה על הקישור להורדת תמונה
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);