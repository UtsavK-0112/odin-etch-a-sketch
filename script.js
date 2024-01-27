const gridContainer = document.querySelector(".grid-container");

// SLIDER SELECTORS
const gridWidthSlider = document.querySelector("#grid-width-slider");
const gridWidthText = document.querySelector(".grid-width");
const gridHeightText = document.querySelector(".grid-height");

// COLOR PICKER SELECTORS =
const colorPicker = document.querySelector("#color-picker");
const colorPickerText = document.querySelector(".pen-color");

// OTHER CONTROLS
const modeRadioButtons = document.querySelectorAll(
    'input[name="mode-selector"]'
);
const clearButton = document.querySelector("#clear-button");
const colorButtons = {
    white: document.querySelector("#white-button"),
    gray: document.querySelector("#gray-button"),
    red: document.querySelector("#red-button"),
    blue: document.querySelector("#blue-button"),
    yellow: document.querySelector("#yellow-button"),
};

// VARIABLES
let gridWidth = 16;
let gridHeight = 8;

let last_rainbow_hue = 0;

// FUNCTIONS

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

function setColor(new_color) {
    colorPicker.value = new_color;
    colorPickerText.textContent = colorPicker.value;
}

function getRGBValueFromHue(hue) {
    rgbValue = hslToRgb(hue, 1, 0.5);

    rgbHexadecimalString =
        "#" +
        rgbValue
            .map((value) => {
                return Math.round(value).toString(16).padStart(2, "0");
            })
            .join("");

    return rgbHexadecimalString;
}

// Algorithm by mjackson: https://gist.github.com/mjackson/5311256
function hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
}

// EVENT LISTENERS

gridContainer.addEventListener(
    "mouseover",
    (event) => {
        event.preventDefault();
        if (event.target.classList.contains("square") && event.which === 1) {
            const square = event.target;

            for (const radioButton of modeRadioButtons) {
                if (radioButton.checked) {
                    switch (radioButton.value) {
                        case "random":
                            let randomColor = "#";
                            for (let i = 0; i < 6; i++) {
                                randomNum = Math.floor(Math.random() * 10);
                                randomColor += randomNum;
                            }
                            setColor(randomColor);
                            break;
                        case "rainbow":
                            rainbowColor = getRGBValueFromHue(last_rainbow_hue);

                            if (last_rainbow_hue > 1) {
                                last_rainbow_hue = 0;
                            }

                            last_rainbow_hue += 0.01;
                            setColor(rainbowColor);
                            break;
                    }
                }
            }

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

clearButton.addEventListener("click", () => {
    purgeGridContainer();
    createGrid();
});

Object.keys(colorButtons).forEach((key) => {
    button = colorButtons[key];
    button.addEventListener("click", (event) => {
        colorPicker.value = event.target.value;
        colorPickerText.textContent = colorPicker.value;
    });
});

// SET UP

createGrid();
