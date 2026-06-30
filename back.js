const container = document.querySelector(".container");
const createDimensions = document.getElementById("createDimensions")

let grid = 0
let drawing = false;

function createGrid(grid) {
    container.replaceChildren();
    for (let i = 0; i < grid; i++) {
        const square = document.createElement("div");
        square.addEventListener('mousedown', () =>{
            drawing = true;
            square.style.backgroundColor = "black";
        })
        square.addEventListener('mouseleave', () => {
            if (drawing) {
                square.style.backgroundColor = 'black';
            }   
        })
        square.addEventListener('mouseup', () => {
            drawing = false;
        })
        square.classList.add("gridSquares");
        container.appendChild(square);

    }
}

function askGrid() {
    grid = parseInt(prompt("Enter Grid Size: "));
    if (grid > 100 || grid <= 0) {
        alert("enter dimensions between 1-100")
        askGrid();
    } else {
        return grid * grid;
    }
}

createDimensions.addEventListener('click', async () => {
    let dimensions = askGrid();
    createGrid(dimensions);
})
