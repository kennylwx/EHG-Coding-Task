/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './styles/app.scss';
import ColourImage from './components/ColourImage';

function App() {
  const MAX_COL = 256;
  const MIN_COL = 0;
  const COL_STEP = 8;
  const TIME_INTERVAL = 1;
  const COL_LIMIT = 32 ** 3;

  const [colourItem, setColourItem] = useState([]);
  const [colourUsed, setColourUsed] = useState([]);
  const [colourNum, setColourNum] = useState(0);

  const getRandomNumber = (start, end, increments) => {
    const numbers = [];
    for (let n = start; n <= end; n += increments) {
      numbers.push(n);
    }

    const randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers[randomIndex];
  };

  useEffect(() => {
    // Get Random colours with values from 8,16,24,..,256
    const getRandomRGB = () => {
      const red = getRandomNumber(MIN_COL + COL_STEP, MAX_COL, COL_STEP);
      const green = getRandomNumber(MIN_COL + COL_STEP, MAX_COL, COL_STEP);
      const blue = getRandomNumber(MIN_COL + COL_STEP, MAX_COL, COL_STEP);

      return { red, green, blue };
    };

    // Check if colour is being used
    const isColourUsed = (r, g, b) => {
      for (let x = 0; x < colourUsed.length; x += 1) {
        const { red, green, blue } = colourUsed[x];

        if (red === r && green === g && blue === b) {
          console.log(`FOUND RGB: ${red}, ${green}, ${blue} === ${r},${g},${b}`);

          return true;
        }
      }

      return false;
    };

    const getColourItem = () => {
      const rgb = getRandomRGB();
      let { red } = rgb;
      let { green } = rgb;
      let { blue } = rgb;

      // Find another set of colour if it has been used
      while (isColourUsed(red, green, blue)) {
        const newRgb = getRandomRGB();
        red = newRgb.red;
        green = newRgb.green;
        blue = newRgb.blue;
      }

      // Add colour to the list
      console.log(`RGB: ${red}, ${green}, ${blue}`);
      const newColour = { red, green, blue };
      setColourUsed([...colourUsed, newColour]);

      // Display new image item
      const newItem = <ColourImage id={colourNum} red={red} green={green} blue={blue} />;
      setColourItem([...colourItem, newItem]);

      // Update number of image item counter
      setColourNum(colourNum + 1);
    };

    const interval = setInterval(() => {
      getColourItem();
    }, TIME_INTERVAL);
    return () => clearInterval(interval);
  }, [colourItem, colourNum, colourUsed]);

  return (
    <div className="app">
      <header className="app-header">
        <span>Colours</span>
        <span className="ah-colour-num">{colourNum}</span>
      </header>

      <section className="app-body">
        {colourItem}
      </section>
    </div>
  );
}

export default App;
