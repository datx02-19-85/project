import React from 'react';
import { Chart } from 'react-google-charts';
import ReactLoading from 'react-loading';
import calculateResult from '../utils/CalculateResult';
import Button from '../components/Button';
import decryptVote from '../utils/DecryptVote';
import isElectionRunning from '../utils/IsElectionRunning';

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      hash: null,
      vote: null
    };
  }

  findVote = async () => {
    const {
      state,
      props: { drizzle }
    } = this;
    let vote = await drizzle.contracts.Voting.methods.votes(state.hash).call();
    if (vote.on === '') {
      vote = 'nothing';
    } else {
      const privateKey = await drizzle.contracts.Voting.methods
        .privateKey()
        .call();
      vote = await decryptVote(privateKey, vote.on);
    }
    this.setState({
      vote
    });
  };

  handleHash = event => {
    const hash = event.target.value;
    this.setState({
      hash
    });
  };

  transformResult = async () => {
    const {
      state,
      props: { drizzle }
    } = this;
    if (state.data === null) {
      const isRunning = await isElectionRunning(drizzle);
      if (!isRunning) {
        let result = null;
        const resultMap = await calculateResult(drizzle);
        if (resultMap !== null && resultMap.size > 0) {
          result = [['Party', 'Procentage']];
          let i = 1;
          resultMap.forEach((procentage, party) => {
            result[i] = [party, procentage];
            i += 1;
          });
        }
        if (result !== null) {
          this.setState({
            data: result
          });
        }
      }
    }
  };

  render() {
    const { state, transformResult, handleHash, findVote } = this;

    transformResult();

    return (
      <div
        className="d-flex flex-column"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {state.data !== null ? (
          <div
            className="d-flex flex-column"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Chart
              chartType="Bar"
              loader={
                <div
                  className="d-flex flex-column"
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <h2>Loading Chart...</h2>
                  <ReactLoading type="cylon" color="black" />
                </div>
              }
              data={state.data}
              options={{
                chart: {
                  title: 'Election',
                  subtitle: 'Parties and procentage'
                }
              }}
              rootProps={{ 'data-testid': '2' }}
            />
            <h2>Confirm your vote:</h2>
            <div>
              <input
                placeholder="Enter your voting hash:"
                type="text"
                onChange={handleHash}
              />
              <Button name="Confirm" onClick={findVote} />
            </div>
            {state.vote !== null ? (
              <div>
                <span>You voted for: </span>
                <span style={{ fontWeight: 'bold' }}>{state.vote}</span>
              </div>
            ) : null}
          </div>
        ) : (
          <h1>No election result to display</h1>
        )}
      </div>
    );
  }
}

export default Start;
