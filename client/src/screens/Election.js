import React from 'react';
import ReactLoading from 'react-loading';
import Button from '../components/Button';

export default class Election extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      ownerKey: ''
    };
  }

  start = async () => {
    const { ownerKey } = this.state;
    const {
      drizzle: {
        contracts: { Voting }
      }
    } = this.props;
    try {
      await Voting.methods
        .startElection('public key', 0, 500)
        .send({ from: ownerKey });
      console.log('Did start the election');
    } catch (error) {
      console.log("Couldn't start the election? -> ", error);
    }
  };

  stop = async () => {
    const { ownerKey } = this.state;
    const {
      drizzle: {
        contracts: { Voting }
      }
    } = this.props;
    try {
      await Voting.methods.stopElection('').send({ from: ownerKey });
      console.log('Did stop the election');
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
      console.log('Election is running: ', isActuallyRunning);
      this.setState({
        isRunning: isActuallyRunning
      });
    }
  };

  handleKey = event => {
    const result = event.target.value;
    this.setState({
      ownerKey: result
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
            <ReactLoading type="cubes" color="blue" width="20%" />
            <Button
              name="Stop election!"
              color="danger"
              onClick={stop}
              disabled={state.ownerKey === ''}
            />
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
            <Button
              name="Start election!"
              color="warning"
              onClick={start}
              disabled={state.ownerKey === ''}
            />
          </div>
        )}
        <input placeholder="Enter owner key" type="text" onChange={handleKey} />
      </div>
    );
  }
}
