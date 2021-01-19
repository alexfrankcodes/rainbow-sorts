let hues = [];

let d = 3;

let i = 0;
let j = 0;

let canvasWidth = 800;
let canvasHeight = 300;
let numOfColors = 200;
00;

let roundness = canvasWidth / 1.5;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(30);
  hues = new Array(numOfColors);

  /* TODO: Refactor how colors are generated
   *   Rainbow colors should be generated and put into an
   *   array, then shuffled. This will ensure the end result
   *   of each rainbow is exactly the same.
   */
  for (let i = 0; i < hues.length; i++) {
    hues[i] = Math.ceil(Math.random() * 310);
    // Skip over some green hues since there is a lot
    if (hues[i] > 90 && hues[i] < 150) {
      hues[i] += 20;
    }
  }
}

function draw() {
  background(0);

  bubbleSort(hues);
  // quickSort(hues, 0, hues.length - 1);

  // Draw rainbow
  for (let i = 0; i < hues.length; i++) {
    strokeWeight(1);
    stroke(color(`hsl(${hues[i]}, 90%, 60%)`));
    translate(0, -0.09);
    noFill();
    arc(
      canvasWidth / 2,
      canvasHeight + 100,
      roundness + i,
      roundness + i,
      PI,
      0,
      OPEN
    );
  }
}

async function swap(items, leftIndex, rightIndex) {
  let temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

async function bubbleSort(arr) {
  if (i < arr.length) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      let currentItem = arr[j];
      let nextItem = arr[j + 1];
      if (currentItem < nextItem) {
        await swap(arr, j, j + 1);
      }
    }
  } else {
    noLoop();
  }
  i++;
}

async function partition(items, left, right) {
  let pivot = items[Math.floor((right + left) / 2)],
    i = left,
    j = right;
  while (i <= j) {
    while (items[i] > pivot) {
      i++;
    }
    while (items[j] < pivot) {
      j--;
    }
    if (i <= j) {
      await sleep(10);
      await swap(items, i, j);
      i++;
      j--;
    }
  }
  return i;
}

// From : https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep/39914235#39914235
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function quickSort(items, left, right) {
  let index;
  if (items.length > 1) {
    index = await partition(items, left, right);
    if (left < index - 1) {
      await quickSort(items, left, index - 1);
    }
    if (index < right) {
      await quickSort(items, index, right);
    }
  }

  return items;
}

// TODO: Finish implementation
// function selectionSort(arr){}
