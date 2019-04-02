import React, { Component } from 'react';
import Hash from 'object-hash';
import FlipFlap from '../components/FlipFlap';
import Button from '../components/Button';

class RenderID extends Component {
  constructor(props) {
    super(props);
    this.state = {
      i: 'nothing',
      copy: true
    };
  }

  genHash = () => {
    this.setState({
      i: Hash(123),
      copy: false
    });
  };

  render() {
    const { state, genHash } = this;
    return (
      <div
        className="d-flex flex-column"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div>
          <FlipFlap id={state.i} />
        </div>
        <div>
          <Button name="Generate" color="danger" onClick={genHash} />
          <Button name="Copy Hash" color="warning" disabled={state.copy} />
        </div>
      </div>
    );
  }
}

export default RenderID;
