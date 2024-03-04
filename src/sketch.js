let values = [];

let step = 0;
let i = 0;
let min_index = step;
let states = [];

function setup() {
  createCanvas(200, 150);
  for (let i = 0; i < width; i++) {
    values.push(Math.random() * height);
    states[i] = -1;
  }

  selectionSort(values);
}

async function draw() {
  loop();
  background(51);
  for (let i = 0; i < values.length; i++) {
    if (states[i] == 0) {
      stroke('#E0777D');
    } else if (states[i] == 1) {
      stroke('#D6FFB7')
    } else {
      stroke(255, 255, 255);
    }
    line(i, height, i, height - values[i]);
  }

  // for (let n = 0; n < 300; n++) {
  //   if (step < values.length - 1) {
  //     i += 1;
  //     // console.log(`${values} - I: ${i} - Min_Index: ${min_index} - Step: ${step}`);
  //     if (values[i] < values[min_index]) {
  //       min_index = i;
  //     }
      
  //     if (i >= values.length) {
  //       // console.log('swap');
  //       values[step].stroke
  //       values = swap(values, step, min_index)
  //       step += 1;
  //       i = step;
  //       min_index = step;
  //     }
  //   } else {
  //     console.log(values);
  //     noLoop();
  //   }
  // }
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
    await sleep(200);
    values = await swap(values, step, min_index);
    states[min_index] = -1;
    states[step] = 0;
    if (step == values.length - 2) states[step+1] = 0
  }
}

async function swap(array, step, min_index) {
  let temp = array[step];
  array[step] = array[min_index];
  array[min_index] = temp;
  return array;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve,ms));
}