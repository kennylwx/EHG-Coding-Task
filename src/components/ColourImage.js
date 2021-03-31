import React from 'react';

import PropTypes from 'prop-types';

function ColourImage({
  id,
  red,
  green,
  blue,
}) {
  const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  const rgbToHex = (r, g, b) => `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
  return (
    <div
      className="colour-image"
      id={id}
      style={{ backgroundColor: `${rgbToHex(red, green, blue)}` }}
    />
  );
}

export default ColourImage;

ColourImage.propTypes = {
  id: PropTypes.number.isRequired,
  red: PropTypes.number.isRequired,
  green: PropTypes.number.isRequired,
  blue: PropTypes.number.isRequired,
};
