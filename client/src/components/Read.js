import React from 'react';

class Read extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Voting;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods.myString.cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    const {
      drizzleState: {
        contracts: { Voting }
      }
    } = this.props;
    // using the saved `dataKey`, get the variable we're interested in
    const { dataKey } = this.state;
    const myString = Voting.myString[dataKey];

    // if it exists, then we display its value
    return <p>My stored string: {myString && myString.value}</p>;
  }
}

export default Read;
