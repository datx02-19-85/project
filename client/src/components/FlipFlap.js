import React from 'react';
import SplitFlapDisplay from 'react-split-flap-display';

const FlipFlap = props => {
  const { id } = props;
  return (
    <div>
      <SplitFlapDisplay
        background="#000000"
        borderColor="#dddddd"
        borderWidth="1px"
        characterSet={SplitFlapDisplay.NUMERIC}
        characterWidth="undefined"
        fontSize="2em"
        step={200}
        textColor="#dddddd"
        value={id}
      />
    </div>
  );
};

export default FlipFlap;
