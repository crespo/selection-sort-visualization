let values;

let step = 0;
let i = 0;
let min_index = step;
let states = []; // to keep track of strokes colors
let widthInput = document.getElementById("width").value;
let heightInput = document.getElementById("height").value;
let sleepTime = document.getElementById("sleepTime").value;

function setup() {
  createCanvas(document.getElementById("width").value, document.getElementById("height").value); // createCanvas([width], [height]);
  setupSettings();
  
  let button = createButton("Change Settings");
  button.mousePressed(setupSettings);
}

function setupSettings() {
  resizeCanvas(document.getElementById("width").value, document.getElementById("height").value);
  values = [];
  for (let i = 0; i < width; i++) {
    values.push(Math.random() * height);
    states[i] = -1;
  }
  selectionSort(values);
  loop();
}

function draw() {
  background(51);
  for (let i = 0; i < values.length; i++) {
    if (states[i] == 0) {
      stroke('#E0777D'); // reddish color
    } else if (states[i] == 1) {
      stroke('#D6FFB7') // greenish color
    } else {
      stroke(255, 255, 255);
    }
    line(i, height, i, height - values[i]);
  }
}

async function selectionSort(values) {
  for (let step = 0; step < values.length - 1; step++) {
    let min_index = step;
    for (let i = step + 1; i < values.length; i++) {
      if (values[i] < values[min_index]) {
        min_index = i;
      }
    }
    states[min_index] = 0;
    states[step] = 1;
    //console.log(sleepTime);
    await sleep(document.getElementById("sleepTime").value); // set the time, in ms, between each swap
    values = swap(values, step, min_index);
    states[min_index] = -1;
    states[step] = 0;

    if (step == values.length - 2) {
      states[step + 1] = 0; // so that the final stroke is coloured as well
      noLoop(); // stop the loop after finished
    }
  }
}

function swap(array, step, min_index) {
  let temp = array[step];
  array[step] = array[min_index];
  array[min_index] = temp;
  return array;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}