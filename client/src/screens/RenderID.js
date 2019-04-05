import React, { Component } from 'react';
import Hash from 'object-hash';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FlipFlap from '../components/FlipFlap';
import Button from '../components/Button';

class RenderID extends Component {
  constructor(props) {
    super(props);
    this.state = {
      i: 'nothing',
      copy: true,
      copied: false,
      canGenerate: true,
      electioNr: 0
    };
  }

  async getNVoters() {
    const {
      drizzle: {
        contracts: { Voting }
      }
    } = this.props;
    const n = await Voting.methods.getNumberOfVotes().call();
    return n;
  }

  genHash = () => {
    const { state, getNVoters } = this;
    const hash = Hash(2 + 5381 * getNVoters() ** state.electioNr);
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

  handleSubmit = event => {
    const result = event.target.value;
    this.setState({
      electioNr: result,
      canGenerate: result <= 0
    });
  };

  async addVoter(hash) {
    const {
      drizzle: {
        contracts: { Voting }
      },
      drizzleState: { accounts }
    } = this.props;
    await Voting.methods.addVoter(hash).send({ from: accounts[0] });
  }

  render() {
    const { state, onCopy, genHash, handleSubmit } = this;

    return (
      <div className="d-flex flex-column">
        <h1>Generate Voting ID</h1>
        <div>
          <FlipFlap id={state.i} />
        </div>
        <div>
          <Button
            name="Generate"
            color="danger"
            disabled={state.canGenerate}
            onClick={genHash}
          />
          <CopyToClipboard onCopy={onCopy} text={state.i}>
            <Button name="Copy Hash" color="warning" disabled={state.copy} />
          </CopyToClipboard>
        </div>
        <div>
          <input
            placeholder="Election hall nr."
            type="number"
            onChange={handleSubmit}
          />
        </div>
        <div>
          {state.copied ? <span style={{ color: 'red' }}>Copied</span> : null}
        </div>
      </div>
    );
  }
}

export default RenderID;
