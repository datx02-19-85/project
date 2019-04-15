import React from 'react';
import { Chart } from 'react-google-charts';
import ReactLoading from 'react-loading';
import calculateResult from '../utils/CalculateResult';

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  transformResult = async () => {
    const {
      state,
      props: { drizzle }
    } = this;
    const isRunning = await drizzle.contracts.Voting.methods
      .electionIsRunning()
      .call();
    let result = null;
    if (!isRunning && state.data === null) {
      const resultMap = await calculateResult(drizzle);
      if (resultMap.size > 0) {
        result = [['Party', 'Procentage']];
        let i = 1;
        resultMap.forEach((procentage, party) => {
          result[i] = [party, procentage];
          i += 1;
        });
      }
    }
    if (
      (isRunning && state.data !== null) ||
      (!isRunning && state.data === null)
    ) {
      this.setState({
        data: result
      });
    }
  };

  render() {
    const { state, transformResult } = this;

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
          <Chart
            width="80%"
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
        ) : (
          <h1>No election result to display</h1>
        )}
      </div>
    );
  }
}

export default Start;
