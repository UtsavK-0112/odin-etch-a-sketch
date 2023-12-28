const gridContainer = document.querySelector(".grid-container");

// SLIDER SELECTORS
const gridWidthSlider = document.querySelector("#grid-width-slider");
const gridWidthText = document.querySelector(".grid-width");
const gridHeightText = document.querySelector(".grid-height");

// COLOR PICKER SELECTORS =
const colorPicker = document.querySelector("#color-picker");
const colorPickerText = document.querySelector(".pen-color");

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
        square.setAttribute("draggable", "false");
        gridContainer.appendChild(square);
    }

    gridContainer.style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridHeight}, 1fr)`;
}

gridContainer.addEventListener(
    "mouseover",
    (event) => {
        event.preventDefault();
        if (event.target.classList.contains("square") && event.which === 1) {
            const square = event.target;
            square.style.backgroundColor = colorPicker.value;
        }
    },
    false
);

gridWidthSlider.addEventListener("input", () => {
    gridHeight = Math.ceil(gridWidthSlider.value / 2);
    gridWidth = gridHeight * 2;

    gridWidthText.textContent = gridWidth;
    gridHeightText.textContent = gridHeight;

    purgeGridContainer();
    createGrid();
});

colorPicker.addEventListener("input", () => {
    colorPickerText.textContent = colorPicker.value;
});

createGrid();
