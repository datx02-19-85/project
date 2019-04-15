import React, { Component } from 'react';
import Hash from 'object-hash';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FlipFlap from '../components/FlipFlap';
import Button from '../components/Button';

class RenderID extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: 'nothing',
      disableCopy: true,
      hasCopied: false,
      canGenerate: true,
      electioNr: 0
    };
  }

  getNVoters = async () => {
    const {
      drizzle: {
        contracts: { Voting }
      }
    } = this.props;
    const n = await Voting.methods.getNumberOfVoters().call();
    return n;
  };

  genHash = async () => {
    const { electioNr } = this.state;
    const nVoters = await this.getNVoters();
    const seed = { nr: electioNr, prime1: 5381, nVoters, prime2: 2 };
    const hash = Hash(seed);
    this.addVoter(hash);
    this.setState({
      hash,
      disableCopy: false,
      hasCopied: false
    });
  };

  onCopy = () => {
    this.setState({
      hasCopied: true
    });
  };

  handleSubmit = event => {
    const result = event.target.value;
    this.setState({
      electioNr: result,
      canGenerate: result <= 0
    });
  };

  addVoter = async hash => {
    const {
      drizzle: {
        contracts: { Voting }
      },
      drizzleState: { accounts }
    } = this.props;
    await Voting.methods
      .addVoter(hash)
      .send({ from: accounts[0], gas: 200000 });
  };

  render() {
    const { state, onCopy, genHash, handleSubmit } = this;

    return (
      <div
        className="d-flex flex-column"
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <h1>Generate Voting ID</h1>
        <div>
          <FlipFlap id={state.hash} />
        </div>
        <div>
          <Button
            name="Generate"
            color="danger"
            disabled={state.canGenerate}
            onClick={genHash}
          />
          <CopyToClipboard onCopy={onCopy} text={state.hash}>
            <Button
              name="Copy Hash"
              color="warning"
              disabled={state.disableCopy}
            />
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
          {state.hasCopied ? (
            <span style={{ color: 'red' }}>Copied</span>
          ) : null}
        </div>
      </div>
    );
  }
}

export default RenderID;
