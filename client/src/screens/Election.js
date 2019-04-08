import React from 'react';
import ReactLoading from 'react-loading';
import Button from '../components/Button';
import StartElection from '../utils/StartElection';

export default class Election extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false
    };
  }

  start = async () => {
    const { drizzle, drizzleState } = this.props;
    const didStartup = await StartElection(drizzle, drizzleState);
    console.log('Did start election: ', didStartup);
  };

  stop = async () => {
    const {
      drizzle: {
        contracts: { Voting }
      },
      drizzleState: { accounts }
    } = this.props;
    try {
      await Voting.methods.stopElection('').send({ from: accounts[0] });
      console.log('Did stop the election');
    } catch (error) {
      console.log("Couldn't stop the election? -> ", error);
    }
  };

  checkIfRunning = async () => {
    const {
      drizzle: {
        contracts: { Voting }
      },
      drizzleState: { accounts }
    } = this.props;
    const isRunning = await Voting.methods
      .electionIsRunning()
      .call({ from: accounts[0] });
    this.setState({
      isRunning
    });
    console.log('Election is running: ', isRunning);
  };

  render() {
    const { checkIfRunning, state, start, stop } = this;
    checkIfRunning();
    console.log('Is running: ', state.isRunning);
    return (
      <div
        className="d-flex flex-column"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        {state.isRunning ? (
          <div
            className="d-flex flex-column"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <h1>Election in progress</h1>
            <ReactLoading type="cubes" color="blue" width="100%" height="40%" />
            <Button name="Stop election!" color="danger" onClick={stop} />
          </div>
        ) : (
          <div
            className="d-flex flex-column"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
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
