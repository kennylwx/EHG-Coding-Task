import React from 'react';
import './styles/app.scss';
import ColourImage from './components/ColourImage';

function App() {
  const MAX_COL = 156;
  const MIN_COL = 0;
  const COL_STEP = 8;

  const getColourItem = () => {
    const colourArr = [];

    for (let r = MIN_COL; r < MAX_COL; r += COL_STEP) {
      for (let g = MIN_COL; g < MAX_COL; g += COL_STEP) {
        for (let b = MIN_COL; b < MAX_COL; b += COL_STEP) {
          colourArr.push(
            <ColourImage
              red={r}
              green={g}
              blue={b}
            />,
          );
        }
      }
    }

    return colourArr;
  };

  return (
    <div className="app">
      <header className="app-header">
        Colours
      </header>

      <section className="app-body">
        {
            getColourItem()
        }

      </section>
    </div>
  );
}

export default App;
