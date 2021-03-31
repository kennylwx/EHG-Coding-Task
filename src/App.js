import React, { useEffect } from 'react';
import './styles/app.scss';
import html2canvas from 'html2canvas';

function App() {
  const MAX_COL = 256;
  const MIN_COL = 0;
  const COL_STEP = 8;

  const PIXEL_SIZE = 4;

  const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  const rgbToHex = (r, g, b) => `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;

  const getColourItem = () => {
    const array = [];

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

    return array;
  };

  // When mounted
  useEffect(() => {
    const loading = document.getElementById('loading');

    const parentElem = document.getElementById('app-body');
    parentElem.style.width = '100%';

    const showcaseElem = document.getElementById('image-showcase');
    showcaseElem.style.width = '80%';

    // Get all the different variation of colours with 32 steps
    const getColours = getColourItem();

    for (let i = 0; i < getColours.length; i += 1) {
      const node = document.createElement('div');
      node.style.width = `${PIXEL_SIZE}px`;
      node.style.height = `${PIXEL_SIZE}px`;

      // Fix RGB for with -1, because the values are from 0...255
      const tempR = getColours[i].red - 1;
      const tempG = getColours[i].green - 1;
      const tempB = getColours[i].blue - 1;

      // Add colour items into the parent
      node.style.background = rgbToHex(tempR, tempG, tempB);
      parentElem.appendChild(node);
    }

    // Convert the component with all images, into an image
    html2canvas(parentElem).then((canvas) => {
      document.getElementById('image-showcase').appendChild(canvas);
      loading.style.display = 'none';
    });

    // Remove the initial component
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
