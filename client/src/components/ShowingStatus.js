import React, { Component } from 'react';
import Verifier from './Verifier';

class ShowingStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataKey: null
    };
  }

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Voting;

    const dataKey = contract.methods.didVote.cacheCall();
    this.setState({ dataKey });
  }

  render() {
    // get the contract state from drizzleState
    <Verifier/>
    const {
      drizzleState: {
        contracts: { Voting }
      }
    } = this.props;
    // using the saved `dataKey`, get the variable we're interested in
    const { dataKey } = this.state;
    const voteStatus = Voting.didVote[dataKey];

    if (typeof voteStatus === 'undefined') return '';

    return (
      <div>
        <p>Votes left: {voteStatus.value ? '0' : '1'} / 1</p>
      </div>
    );
  }
}

export default ShowingStatus;
