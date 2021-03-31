/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './styles/app.scss';
import PropTypes from 'prop-types';
import html2canvas from 'html2canvas';
import ColourImage from './components/ColourImage';

function App() {
  const MAX_COL = 256;
  const MIN_COL = 0;
  const COL_STEP = 8;
  const COL_LIMIT = (MAX_COL / COL_STEP) ** 3;

  const IMG_HEIGHT = 256;
  const IMG_WIDTH = 128;
  const PIXEL_SIZE = (IMG_HEIGHT * IMG_WIDTH) / COL_LIMIT;

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

  useEffect(() => {
    const parentElem = document.getElementById('app-body');

    const showcaseElem = document.getElementById('image-showcase');
    showcaseElem.style.width = `${IMG_HEIGHT}px`;
    showcaseElem.style.height = `${IMG_WIDTH}px`;

    const getColours = getColourItem();

    for (let i = 0; i < getColours.length; i += 1) {
      const node = document.createElement('div');
      node.style.width = `${PIXEL_SIZE}px`;
      node.style.height = `${PIXEL_SIZE}px`;
      node.style.background = rgbToHex(getColours[i].red, getColours[i].green, getColours[i].blue);
      parentElem.appendChild(node);
    }

    html2canvas(parentElem).then((canvas) => {
      document.getElementById('image-showcase').appendChild(canvas);
    });

    parentElem.style.display = 'none';
  });

  return (
    <div className="app">
      <header className="app-header" id="app-header">
        <span>Colours</span>
        <span className="ah-colour-num">{ getColourItem().length}</span>
      </header>

      <section className="app-body" id="app-body" />

      <section className="image-showcase" id="image-showcase" />

    </div>
  );
}

export default App;
