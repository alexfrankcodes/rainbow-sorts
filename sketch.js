let canvasWidth = 800;
let canvasHeight = 300;
let numOfColors = 200;

let roundness = canvasWidth / 1.5;

let bubbleSketch = (p) => {
  let hues = new Array(numOfColors);
  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.frameRate(30);

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
  };

  p.draw = () => {
    p.background(0);
    bubbleSort(hues);
    drawRainbow(p, hues);
  };
};

let quickSketch = (p) => {
  let hues = new Array(numOfColors);
  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.frameRate(30);

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
  };

  p.draw = () => {
    p.background(0);
    // Put appropriate sorting function here
    quickSort(hues, 0, hues.length - 1);
    drawRainbow(p, hues);
  };
};

function drawRainbow(p, hues) {
  for (let i = 0; i < hues.length; i++) {
    p.strokeWeight(1);
    p.stroke(p.color(`hsl(${hues[i]}, 90%, 60%)`));
    p.translate(0, -0.09);
    p.noFill();
    p.arc(
      canvasWidth / 2,
      canvasHeight + 100,
      roundness + i,
      roundness + i,
      p.PI,
      0,
      p.OPEN
    );
  }
}

async function swap(items, leftIndex, rightIndex) {
  let temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}

async function bubbleSort(arr) {
  let i = 0;
  if (i < arr.length) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      let currentItem = arr[j];
      let nextItem = arr[j + 1];
      if (currentItem < nextItem) {
        await sleep(10);
        await swap(arr, j, j + 1);
      }
    }
  } else {
    p.noLoop();
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

let bubblesortSketch = new p5(bubbleSketch, "bubblesort-container");
let quickSortSketch = new p5(quickSketch, "quicksort-container");
