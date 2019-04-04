import React from 'react';
import SplitFlapDisplay from 'react-split-flap-display';

const FlipFlap = props => {
  const { id } = props;
  let name;

  if (id.length > 10) {
    name = `${id.substring(0, 9)}...`;
  } else {
    name = id;
  }

  return (
    <div>
      <SplitFlapDisplay
        background="#000000"
        borderColor="#dddddd"
        borderWidth="1px"
        characterSet={[
          '.',
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n',
          'o',
          'p',
          'q',
          'r',
          's',
          't',
          'u',
          'v',
          'w',
          'x',
          'y',
          'z',
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9'
        ]}
        characterWidth="undefined"
        fontSize="2em"
        step={75}
        textColor="#dddddd"
        value={name}
      />
    </div>
  );
};

export default FlipFlap;
