let hues = [];

let d = 3;

let i = 0;
let j = 0;

let canvasWidth = 800;
let canvasHeight = 300;
00;

let roundness = canvasWidth / 2;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(30);
  hues = new Array(300);
  for (let i = 0; i < hues.length; i++) {
    hues[i] = Math.ceil(Math.random() * 310);
  }
}

function draw() {
  background(0);

  bubbleSort(hues);

  // Draw rainbow
  for (let i = 0; i < hues.length; i++) {
    strokeWeight(2);
    stroke(color(`hsl(${hues[i]}, 90%, 60%)`));
    arc(
      canvasWidth / 2,
      canvasHeight + canvasHeight / 3,
      roundness + i,
      roundness + i,
      PI,
      0
    );
    noFill();
  }
}

function swap(items, leftIndex, rightIndex) {
  let temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

function bubbleSort(arr) {
  if (i < arr.length) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      let currentItem = arr[j];
      let nextItem = arr[j + 1];
      if (currentItem < nextItem) {
        swap(arr, j, j + 1);
      }
    }
  } else {
    noLoop();
  }
  i++;
}
