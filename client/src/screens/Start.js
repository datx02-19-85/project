import React from 'react';
import { Chart } from 'react-google-charts';
import ReactLoading from 'react-loading';
import calculateResult from '../utils/CalculateResult';
import Button from '../components/Button';

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [['Party', 'Procentage']]
    };
  }

  transformResult = async () => {
    const { drizzle } = this.props;
    const resultMap = await calculateResult(drizzle);
    const result = [['Party', 'Procentage']];
    let i = 1;
    resultMap.keys().array.forEach(party => {
      result[i] = [party, resultMap.get(party)];
      i += 1;
    });
    this.setState({
      data: result
    });
  };

  render() {
    const { state, transformResult } = this;

    return (
      <div
        className="d-flex flex-column"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
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
        <Button
          name="Calculate Result"
          color="warning"
          onClick={transformResult}
        />
      </div>
    );
  }
}

export default Start;
