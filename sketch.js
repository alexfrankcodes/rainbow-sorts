let canvasWidth = Math.min(600, window.innerWidth - 20);
let canvasHeight = Math.min(250, window.innerHeight / 7);
let numOfColors = Math.min(200, Math.floor(window.innerWidth / 5));
let roundness = canvasWidth / 1.5;

let backgroundColorRGB = 20;

let globalHues = new Array(numOfColors);
generateRainbowHues(globalHues);

let bubbleSketch = (p) => {
  let hues = [...globalHues];
  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.frameRate(30);
  };

  p.draw = () => {
    p.background(backgroundColorRGB);
    bubbleSort(hues);
    drawRainbow(p, hues);
  };
};

let quickSketch = (p) => {
  let hues = [...globalHues];
  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.frameRate(30);
  };

  p.draw = () => {
    p.background(backgroundColorRGB);
    // Put appropriate sorting function here
    quickSort(hues, 0, hues.length - 1);
    drawRainbow(p, hues);
  };
};

let insertionSketch = (p) => {
  let hues = [...globalHues];
  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.frameRate(30);
  };

  p.draw = () => {
    p.background(backgroundColorRGB);
    insertionSort(hues);
    drawRainbow(p, hues);
  };
};

let selectionSketch = (p) => {
  let hues = [...globalHues];
  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.frameRate(30);
  };

  p.draw = () => {
    p.background(backgroundColorRGB);
    selectionSort(hues);
    drawRainbow(p, hues);
  };
};

function generateRainbowHues(hues) {
  for (let i = 0; i < hues.length; i++) {
    hues[i] = Math.ceil(Math.random() * 310);
    //Skip over some green hues since there is a lot
    if (hues[i] > 90 && hues[i] < 150) {
      hues[i] += 20;
    }
  }
}

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
        await sleep();
        await swap(arr, j, j + 1);
      }
    }
  } else {
    this.p.noLoop();
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
      await sleep();
      await swap(items, i, j);
      i++;
      j--;
    }
  }
  return i;
}

// From : https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep/39914235#39914235
function sleep(ms = 10) {
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

async function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;
    while (j > -1 && current > arr[j]) {
      await sleep();
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}

async function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (min != i) {
      await swap(arr, min, i);
    }
  }
  return arr;
}

let bubbleSortSketch = new p5(bubbleSketch, "bubblesort-container");
let insertionSortSketch = new p5(insertionSketch, "insertionsort-container");
let quickSortSketch = new p5(quickSketch, "quicksort-container");
let selectionSortSketch = new p5(insertionSketch, "selectionsort-container");
