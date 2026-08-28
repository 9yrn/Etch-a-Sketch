const container = document.querySelector(".container");
const createDimensions = document.getElementById("createDimensions");
const clearBoard = document.getElementById("clearBoard");
const gridSize = document.getElementById("gridSize");
const gridValue = document.getElementById("gridValue");
const penColor = document.getElementById("penColor");
const colorValue = document.getElementById("colorValue");
const penTool = document.getElementById("penTool");
const eraserTool = document.getElementById("eraserTool");
const boardStatus = document.getElementById("boardStatus");

let drawing = false;
let tool = "pen";

function updateGridLabel() {
    gridValue.value = `${gridSize.value} x ${gridSize.value}`;
    gridValue.textContent = `${gridSize.value} x ${gridSize.value}`;
}

function createGrid(size) {
    container.replaceChildren();
    container.style.setProperty("--grid-size", size);
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("gridSquares");
        square.addEventListener("mousedown", (event) => {
            event.preventDefault();
            drawing = true;
            paintSquare(square);
        });
        square.addEventListener("mouseenter", () => {
            if (drawing) {
                paintSquare(square);
            }
        });
        container.appendChild(square);
    }
}

function paintSquare(square) {
    square.style.backgroundColor = tool === "eraser" ? "" : penColor.value;
    boardStatus.textContent = tool === "eraser" ? "Erasing" : "Drawing";
}

function setTool(nextTool) {
    tool = nextTool;
    penTool.classList.toggle("active", tool === "pen");
    eraserTool.classList.toggle("active", tool === "eraser");
    boardStatus.textContent = tool === "eraser" ? "Eraser selected" : "Pen selected";
}

gridSize.addEventListener("input", updateGridLabel);
penColor.addEventListener("input", () => {
    colorValue.textContent = penColor.value.toUpperCase();
});
createDimensions.addEventListener("click", () => {
    createGrid(Number(gridSize.value));
    boardStatus.textContent = "Ready to draw";
});
clearBoard.addEventListener("click", () => {
    container.querySelectorAll(".gridSquares").forEach((square) => {
        square.style.backgroundColor = "";
    });
    boardStatus.textContent = "Board cleared";
});
penTool.addEventListener("click", () => setTool("pen"));
eraserTool.addEventListener("click", () => setTool("eraser"));
document.addEventListener("mouseup", () => {
    drawing = false;
});

updateGridLabel();
createGrid(Number(gridSize.value));
