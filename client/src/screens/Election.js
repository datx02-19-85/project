import React from 'react';
import ReactLoading from 'react-loading';
import EthCrypto from 'eth-crypto';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from '../components/Button';

export default class Election extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      privateKey: ''
    };
  }

  start = async () => {
    const { publicKey, privateKey } = EthCrypto.createIdentity();
    this.setState({
      privateKey
    });
    const {
      drizzle: {
        contracts: { Voting }
      },
      drizzleState: { accounts }
    } = this.props;
    try {
      await Voting.methods
        .startElection(publicKey, 0, 500)
        .send({ from: accounts[0], gas: 2000000 });
    } catch (error) {
      console.log("Couldn't start the election? -> ", error);
    }
  };

  stop = async () => {
    const { privateKey } = this.state;
    const {
      drizzle: {
        contracts: { Voting }
      },
      drizzleState: { accounts }
    } = this.props;
    try {
      await Voting.methods
        .stopElection(privateKey)
        .send({ from: accounts[0], gas: 200000 });
    } catch (error) {
      console.log("Couldn't stop the election? -> ", error);
    }
  };

  checkIfRunning = async () => {
    const { isRunning } = this.state;
    const {
      drizzle: {
        contracts: { Voting }
      }
    } = this.props;
    const isActuallyRunning = await Voting.methods.electionIsRunning().call();
    if (isActuallyRunning !== isRunning) {
      this.setState({
        isRunning: isActuallyRunning
      });
    }
  };

  handleKey = event => {
    const result = event.target.value;
    this.setState({
      privateKey: result
    });
  };

  render() {
    const { checkIfRunning, state, start, stop, handleKey } = this;
    checkIfRunning();
    return (
      <div
        className="d-flex flex-column"
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {state.isRunning ? (
          <div
            className="d-flex flex-column"
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <h1>Election in progress</h1>
            <ReactLoading
              type="cubes"
              color="blue"
              width="100%"
              height="100%"
            />
            <div>
              <Button
                name="Stop election!"
                color="danger"
                onClick={stop}
                disabled={state.privateKey === ''}
              />
              {state.privateKey !== '' ? (
                <CopyToClipboard text={state.privateKey}>
                  <Button name="Copy private key!" color="warning" />
                </CopyToClipboard>
              ) : (
                <input
                  placeholder="Enter private key, for inconveniance"
                  type="text"
                  onChange={handleKey}
                />
              )}
            </div>
          </div>
        ) : (
          <div
            className="d-flex flex-column"
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <h1>No election is running</h1>
            <Button name="Start election!" color="warning" onClick={start} />
          </div>
        )}
      </div>
    );
  }
}
