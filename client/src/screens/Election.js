import React from 'react';
import ReactLoading from 'react-loading';
import EthCrypto from 'eth-crypto';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from '../components/Button';
import isElectionRunning from '../utils/IsElectionRunning';

export default class Election extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      privateKey: '',
      privateKeyisCorrect: false
    };
  }

  start = async () => {
    const { publicKey, privateKey } = EthCrypto.createIdentity();
    this.setState({
      privateKey,
      privateKeyisCorrect: true
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
      this.setState({
        isRunning: true
      });
    } catch (error) {
      console.log("Couldn't start the election? -> ", error);
    }
  };

  stop = async () => {
    const {
      state: { privateKey, privateKeyisCorrect },
      props: {
        drizzle: {
          contracts: { Voting }
        },
        drizzleState: { accounts }
      }
    } = this;
    if (!privateKeyisCorrect) {
      const r = window.confirm(
        `Your entered private key is not correct, stop election anyway?`
      );
      if (!r) {
        return;
      }
    }
    try {
      await Voting.methods
        .stopElection(privateKey)
        .send({ from: accounts[0], gas: 200000 });
      this.setState({
        isRunning: false
      });
    } catch (error) {
      console.log("Couldn't stop the election? -> ", error);
    }
  };

  checkIfRunning = async () => {
    const { drizzle } = this.props;
    this.setState({
      isRunning: await isElectionRunning(drizzle)
    });
  };

  handleKey = async event => {
    const { drizzle } = this.props;
    const result = event.target.value;
    let recoveredPublic;
    try {
      recoveredPublic = await EthCrypto.publicKeyByPrivateKey(result);
    } catch (error) {
      // console.log("Entered wrong private key -> ", error);
      return;
    }
    const actualPublic = await drizzle.contracts.Voting.methods
      .publicKey()
      .call();
    const privateKeyisCorrect = recoveredPublic === actualPublic;
    this.setState({
      privateKey: privateKeyisCorrect ? result : '',
      privateKeyisCorrect
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
              <Button name="Stop election!" color="danger" onClick={stop} />
              {state.privateKeyisCorrect ? (
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
