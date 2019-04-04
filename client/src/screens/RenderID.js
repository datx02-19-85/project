import React, { Component } from 'react';
import Hash from 'object-hash';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FlipFlap from '../components/FlipFlap';
import Button from '../components/Button';

class RenderID extends Component {
  constructor(props) {
    super(props);
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Voting;

    this.state = {
      i: 'nothing',
      copy: true,
      contract,
      copied: false
    };
  }

  async getNVoters() {
    const { state } = this;
    const n = await state.contract.getNumberOfVotes().call();
    return n;
  }

  genHash = () => {
    const hash = Hash(/* this.getNVoters() */ 123);
    this.addVoter(hash);
    this.setState({
      i: hash,
      copy: false
    });
  };

  onCopy = () => {
    this.setState({
      copied: true
    });
  };

  async addVoter(hash) {
    const { state } = this;
    await state.contract.addVoter(hash).call();
  }

  render() {
    const { state, onCopy, genHash } = this;

    return (
      <div
        className="d-flex flex-column"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h1>Generate Voting ID</h1>
        <div>
          <FlipFlap id={state.i} />
        </div>
        <div>
          <Button name="Generate" color="danger" onClick={genHash} />
          <CopyToClipboard onCopy={onCopy} text={state.i}>
            <Button name="Copy Hash" color="warning" disabled={state.copy} />
          </CopyToClipboard>
        </div>
        <div>
          {state.copied ? <span style={{ color: 'red' }}>Copied</span> : null}
        </div>
      </div>
    );
  }
}

export default RenderID;
