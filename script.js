const gridContainer = document.querySelector(".grid-container");
const gridWidthSlider = document.querySelector("#grid-width-slider");
const gridWidthText = document.querySelector(".grid-width");
const gridHeightText = document.querySelector(".grid-height");

let gridWidth = 16;
let gridHeight = 8;

function purgeGridContainer() {
    children = Array.from(gridContainer.children);

    children.forEach((child) => {
        gridContainer.removeChild(child);
    });
}

function createGrid() {
    for (let i = 0; i < gridWidth * gridHeight; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        gridContainer.appendChild(square);
    }

    gridContainer.style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridHeight}, 1fr)`;
}

createGrid();

gridContainer.addEventListener(
    "mouseover",
    (event) => {
        if (event.target.classList.contains("square")) {
            const square = event.target;
            square.classList.add("filled");
        }
    },
    false
);

gridWidthSlider.addEventListener("input", (event) => {
    gridHeight = Math.ceil(gridWidthSlider.value / 2);
    gridWidth = gridHeight * 2;

    gridWidthText.textContent = gridWidth;
    gridHeightText.textContent = gridHeight;

    purgeGridContainer();
    createGrid();
});
