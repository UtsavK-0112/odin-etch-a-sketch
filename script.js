const gridContainer = document.querySelector(".grid-container");
const gridWidthField = document.querySelector("#grid-width-field");
const gridHeightField = document.querySelector("#grid-height-field");

const refreshButton = document.querySelector("#refresh-button");

let gridWidth = 32;
let gridHeight = 32;

function purgeGridContainer() {
    children = gridContainer.children;
    for (child of children) {
        gridContainer.removeChild(child);
    }
}

function createGrid() {
    for (let i = 0; i < gridWidth * gridHeight; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        gridContainer.appendChild(square);
    }

    gridContainer.style.width = `${gridWidth * 15}px`;
    gridContainer.style.height = `${gridHeight * 15}px`;
    gridContainer.style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridHeight}, 1fr)`;
}

createGrid();

gridContainer.addEventListener(
    "mouseover",
    (event) => {
        console.log(event.target);
        if (event.target.classList.contains("square")) {
            const square = event.target;
            square.classList.add("filled");
        }
    },
    false
);

refreshButton.addEventListener("click", (event) => {
    gridWidth = gridWidthField.value;
    gridHeight = gridHeightField.value;
    purgeGridContainer();
    createGrid();
});
