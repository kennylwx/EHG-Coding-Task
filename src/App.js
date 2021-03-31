import React, { useEffect } from 'react';
import './styles/app.scss';
import html2canvas from 'html2canvas';
// import { setWithExpiry, getWithExpiry } from './helper';

function App() {
  const MAX_COL = 256; // Maximum colour starting value 256
  const MIN_COL = 0; // Minimum colour starting value 0
  const COL_STEP = 8; // Colour step

  const PIXEL_SIZE = 2; // Change the size for each colour pixel

  const STORAGE_KEY = 'key';
  const IMG_KEY = 'img';

  // Convert a RGB value to Hex value
  const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  // Convert RGB to Hex
  const rgbToHex = (r, g, b) => `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;

  // Generate all the different RGB values
  const getColourItem = () => {
    const array = [];

    // Check if localstorage has it
    const storedArray = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (storedArray.length === ((256 / 8) ** 3)) {
      return storedArray;
    }

    // Create a new array
    for (let r = MIN_COL + COL_STEP; r <= MAX_COL; r += COL_STEP) {
      for (let g = MIN_COL + COL_STEP; g <= MAX_COL; g += COL_STEP) {
        for (let b = MIN_COL + COL_STEP; b <= MAX_COL; b += COL_STEP) {
          array.push({
            red: r,
            green: g,
            blue: b,
          });
        }
      }
    }

    // Save it to localstorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(array));

    return array;
  };

  // When mounted
  useEffect(() => {
    // Retrieve all components
    const loading = document.getElementById('loading');
    const parentElem = document.getElementById('app-body');
    const showcaseElem = document.getElementById('image-showcase');
    parentElem.style.width = '100%';
    showcaseElem.style.width = '80%';

    // Get all the different variation of colours with 32 steps
    const t0 = performance.now();
    const getColours = getColourItem();
    const t1 = performance.now();
    console.log(`Get Colour ${((t1 - t0) / 1000).toFixed(2)} s.`);

    const t2 = performance.now();

    // Create an element with a pixel size for each colour variation into a container
    for (let i = 0; i < getColours.length; i += 1) {
      const node = document.createElement('div');
      node.style.width = `${PIXEL_SIZE}px`;
      node.style.height = `${PIXEL_SIZE}px`;

      // Fix RGB with -1, because the values are from 0...255
      const tempR = getColours[i].red - 1;
      const tempG = getColours[i].green - 1;
      const tempB = getColours[i].blue - 1;

      // Add colour items into the parent
      node.style.background = rgbToHex(tempR, tempG, tempB);
      parentElem.appendChild(node);
    }

    const t3 = performance.now();
    console.log(`Create Element ${((t3 - t2) / 1000).toFixed(2)} s.`);

    const t4 = performance.now();

    const storedImg = JSON.parse(localStorage.getItem(IMG_KEY));
    // localStorage.removeItem(IMG_KEY);

    if (!storedImg) {
      // Convert all the colour variations into an image
      html2canvas(parentElem).then((canvas) => {
        const t5 = performance.now();
        // Add the image to the screen
        document.getElementById('image-showcase').appendChild(canvas);

        // Save image to localstorage
        // console.log(canvas.toDataURL('image/jpeg', 0.9));
        localStorage.setItem(IMG_KEY, JSON.stringify(canvas.toDataURL('image/jpeg', 0.9)));

        // Remove loading
        loading.style.display = 'none';

        console.log(`HTML 2 Canvas ${((t5 - t4) / 1000).toFixed(2)} s.`);
      });
    } else {
      const img = document.createElement('img');
      img.src = storedImg;
      img.style.width = '100%';

      document.getElementById('image-showcase').appendChild(img);

      // Remove loading
      loading.style.display = 'none';
    }

    // Remove the actual color variation container
    parentElem.style.display = 'none';
  });

  return (
    <div className="app">
      <header className="app-header" id="app-header">
        <span>Colours</span>
        <span className="ah-colour-num">{ getColourItem().length}</span>
      </header>

      <div className="loading-placeholder" id="loading">
        Loading...
      </div>

      <section className="app-body" id="app-body" />

      <section className="image-showcase" id="image-showcase" />

    </div>
  );
}

export default App;
