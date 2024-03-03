let values = [];

function setup() {
  createCanvas(700,400);
  for (let i = 0; i < width; i ++) {
    values.push(Math.random() * height);
  }

  for (let step = 0; step < values.length - 1; step++) {
    let min_index = step;
    for (let i = step + 1; i < values.length; i++) {
      if (values[i] < values[min_index]) {
        min_index = i;
      }
    }

    values = swap(values, step, min_index);
  }
}

function draw() {
  background(51);
  for (let i = 0; i < values.length; i++) {
    stroke(255);
    line(i, height, i, height - values[i]);
  }
}

function swap(array, step, min_index) {
  let temp = array[step];
  array[step] = array[min_index];
  array[min_index] = temp;
  return array;
}