import React from 'react';
import { Button } from 'reactstrap';

const BootButton = props => {
  const { name } = props;
  return <Button color="danger">{name}</Button>;
};

export default BootButton;
