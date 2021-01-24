const canvasWidth = Math.min(600, window.innerWidth - 100);
const canvasHeight = Math.min(250, window.innerHeight / 5);
const numOfColors = 50;
const sketchFrameRate = 30;
const roundness = canvasWidth / 1.5;

const arcThickness = 3;

const backgroundColorRGB = 20;

let globalHues = new Array(numOfColors);

const generateRainbowHues = (hues) => {
  for (let i = 0; i < hues.length; i++) {
    hues[i] = Math.ceil(Math.random() * 310);
    //Skip over some green hues since there is a lot
    if (hues[i] > 90 && hues[i] < 150) {
      hues[i] += 20;
    }
  }
};

generateRainbowHues(globalHues);

const bubbleSketch = (p) => {
  const hues = [...globalHues];
  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.frameRate(sketchFrameRate);
  };

  p.draw = () => {
    p.background(backgroundColorRGB);
    bubbleSort(hues);
    drawRainbow(p, hues);
  };
};

const quickSketch = (p) => {
  const hues = [...globalHues];
  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.frameRate(sketchFrameRate);
  };

  p.draw = () => {
    p.background(backgroundColorRGB);
    quickSort(hues, 0, hues.length - 1);
    drawRainbow(p, hues);
  };
};

const insertionSketch = (p) => {
  const hues = [...globalHues];
  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.frameRate(sketchFrameRate);
  };

  p.draw = () => {
    p.background(backgroundColorRGB);
    insertionSort(hues);
    drawRainbow(p, hues);
  };
};

const selectionSketch = (p) => {
  const hues = [...globalHues];
  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight);
    p.frameRate(sketchFrameRate);
  };

  p.draw = () => {
    p.background(backgroundColorRGB);
    selectionSort(hues);
    drawRainbow(p, hues);
  };
};

const drawRainbow = (p, hues) => {
  for (let i = 0; i < hues.length; i++) {
    p.strokeWeight(arcThickness);
    p.stroke(p.color(`hsl(${hues[i]}, 90%, 60%)`));
    p.translate(0, -0.09);
    p.noFill();
    p.arc(
      canvasWidth / 2,
      canvasHeight + 100,
      roundness + i * 4,
      roundness + i * 4,
      p.PI,
      0
    );
  }
};

const swap = async (arr, leftIndex, rightIndex) => {
  await sleep();
  let temp = arr[leftIndex];
  arr[leftIndex] = arr[rightIndex];
  arr[rightIndex] = temp;
};

const bubbleSort = async (arr) => {
  let i = 0;
  if (i < arr.length) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      let currentItem = arr[j];
      let nextItem = arr[j + 1];
      if (currentItem < nextItem) {
        await swap(arr, j, j + 1);
      }
    }
  } else {
    this.p.noLoop();
  }
  i++;
};

const partition = async (arr, left, right) => {
  let pivot = arr[Math.floor((right + left) / 2)],
    i = left,
    j = right;
  while (i <= j) {
    while (arr[i] > pivot) {
      i++;
    }
    while (arr[j] < pivot) {
      j--;
    }
    if (i <= j) {
      await swap(arr, i, j);
      i++;
      j--;
    }
  }
  return i;
};

// From : https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep/39914235#39914235
const sleep = async (ms = 20) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const quickSort = async (arr, left, right) => {
  let index;
  if (arr.length > 1) {
    index = await partition(arr, left, right);

    if (left < index - 1) {
      await quickSort(arr, left, index - 1);
    }
    if (index < right) {
      await quickSort(arr, index, right);
    }
  }
  return arr;
};

const insertionSort = async (arr) => {
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
};

const selectionSort = async (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[min]) {
        min = j;
      }
    }
    if (min != i) {
      await swap(arr, i, min);
    }
  }
  return arr;
};

const bubbleSortSketch = new p5(bubbleSketch, "bubblesort-container");
const insertionSortSketch = new p5(insertionSketch, "insertionsort-container");
const quickSortSketch = new p5(quickSketch, "quicksort-container");
const selectionSortSketch = new p5(selectionSketch, "selectionsort-container");
