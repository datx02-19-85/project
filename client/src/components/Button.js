import React from 'react';
import { Button } from 'reactstrap';

const BootButton = props => {
  const { name, color, disabled, onClick } = props;
  return (
    <Button color={color} disabled={disabled} onClick={onClick}>
      {name}
    </Button>
  );
};

export default BootButton;
