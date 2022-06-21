const canvas = document.getElementById('canvas');
const gridHeight = document.getElementById('gridHeight');
const gridWidth = document.getElementById('gridWidth');
const colorPicker = document.getElementById('colorPicker');
const clearButton = document.getElementById('clearButton');
const paintMode = document.getElementById('paintMode');

const defaultCanvasColor = '#ffffff';
const canvasWidth = 500; // in pixel
let pixelBoxWidthHeight = 20; // size of 
let gridHeightValue = 20;
let gridWidthValue = 20;
const maxWidth = 50;
const minWidth = 0;
const maxHeight = 50;
const minHeight = 0;
let color = colorPicker.value;
let currentPaintMode = "Draw";

gridHeight.value = gridHeightValue;
gridWidth.value = gridWidthValue;

// generates a pixel box
let getPixelBox = function(boxWidthHeight, idValue) {
    let pixelBox = document.createElement('div');
    pixelBox.className = "pixelBox";
    pixelBox.id = "pixelBoxId"+idValue;
    pixelBox.style.width = ''+boxWidthHeight+'px';
    pixelBox.style.height = ''+boxWidthHeight+'px';
    return pixelBox;
}

// generates a grid from the pixel box
let makeGrid =  function(width, height) {
    pixelBoxWidthHeight = canvasWidth / width;
    numberOfBoxes = width * height;
    canvas.innerHTML = '';
    for(let i = 0;  i < numberOfBoxes; i++)
    {
        pixelBox = getPixelBox(pixelBoxWidthHeight, i);
        canvas.appendChild(pixelBox);
    }
}

// prints an error message
let logError = function(message) {
    let errorBox = document.getElementById("error-box");
    errorBox.innerHTML = message;
}

// clear grid
let clearGrid = function() {

}

makeGrid(gridWidthValue, gridHeightValue);

// setting an event listener for gridHeight change
gridHeight.addEventListener('input', (e) => {
    newHeight = e.target.value;
    if(newHeight > maxHeight)
    {
        newHeight = maxHeight;
        gridHeight.value = newHeight;
        logError("GridHeight cannot exceed " + newHeight + ". Max set to " + newHeight);
    }
    else if(newHeight < minHeight)
    {
        newHeight = minHeight;
        gridHeight.value = newHeight;
        logError("GridHeight cannot exceed " + newHeight + ". Max set to " + newHeight);
    }
    gridHeightValue = newHeight;
    makeGrid(gridWidthValue, newHeight);
});

// setting an event listener for gridWidth change
gridWidth.addEventListener('input', (e) => {
    newWidth = e.target.value;
    if(newWidth > maxWidth)
    {
        newWidth = maxWidth;
        gridWidth.value = newWidth;
        logError("GridHeight cannot exceed " + newWidth + ". Max set to " + newWidth);
    }
    else if(newWidth < minWidth)
    {
        newWidth = minWidth;
        gridWidth.value = newWidth;
        logError("GridHeight cannot exceed " + newWidth + ". Max set to " + newWidth);
    }
    gridWidthValue = newWidth;
    makeGrid(newWidth, gridHeightValue);
});

// change the color
colorPicker.addEventListener('input', (e) => {
    color = e.target.value;
});

// clears the canvas
clearButton.addEventListener('click', (e) => {
     for(let i = 0; i < canvas.children.length; i++) {
        canvas.children[i].style.backgroundColor = defaultCanvasColor;
    }
});

// paint or erase on the canvas
canvas.addEventListener('click', (e) => {
    if(paintMode.value == "Draw")
        e.target.style.backgroundColor = color;
    else
        e.target.style.backgroundColor = defaultCanvasColor;
});
