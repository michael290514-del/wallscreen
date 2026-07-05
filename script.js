// =========================
// СОСТОЯНИЕ СИСТЕМЫ
// =========================
let started = false;
let drawMode = false;

let drawing = false;
let startX = 0;
let startY = 0;
let zone = null;

// =========================
// КНОПКИ
// =========================
const drawButton = document.getElementById("drawButton");
const startButton = document.getElementById("startButton");

// =========================
// КНОПКА "РИСОВАТЬ"
// =========================
drawButton.addEventListener("click", () => {

    drawMode = !drawMode;

    if(drawMode){
        document.body.classList.add("drawing");
        drawButton.textContent = "🔵 Курсор";
    } else {
        document.body.classList.remove("drawing");
        drawButton.textContent = "✏️ Рисовать";
    }

});

// =========================
// КНОПКА "НАЧАТЬ"
// =========================
startButton.addEventListener("click", () => {

    started = true;

    startButton.textContent = "⏸ Идёт";

    document.body.style.transform = "scale(1.01)";

});

// =========================
// НАЧАЛО РИСОВАНИЯ ЗОНЫ
// =========================
document.addEventListener("mousedown", (e) => {

    if(!drawMode) return;

    drawing = true;

    startX = e.clientX;
    startY = e.clientY;

    zone = document.createElement("div");
    zone.className = "zone";

    zone.style.left = startX + "px";
    zone.style.top = startY + "px";

    // если ещё не старт — делаем прозрачнее
    if(!started){
        zone.style.opacity = "0.2";
    } else {
        zone.style.opacity = "1";
    }

    document.body.appendChild(zone);
});

// =========================
// РАСТЯГИВАНИЕ ЗОНЫ
// =========================
document.addEventListener("mousemove", (e) => {

    if(!drawing) return;

    let width = e.clientX - startX;
    let height = e.clientY - startY;

    zone.style.width = Math.abs(width) + "px";
    zone.style.height = Math.abs(height) + "px";

    zone.style.left = Math.min(startX, e.clientX) + "px";
    zone.style.top = Math.min(startY, e.clientY) + "px";

});

// =========================
// ЗАВЕРШЕНИЕ РИСОВАНИЯ
// =========================
document.addEventListener("mouseup", () => {

    drawing = false;

    if(zone){

        // клик по зоне
        zone.addEventListener("click", () => {

            if(!started) return;

            document.body.style.background = "green";

            setTimeout(() => {
                document.body.style.background = "white";
            }, 2000);

        });
    }

    zone = null;
});