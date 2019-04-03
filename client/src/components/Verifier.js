import React from 'react';
import { Button } from 'reactstrap';

class Verifier extends React.Component {
  constructor() {
    super();
    this.state = {
      stackId: null,
      count: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setValue = this.setValue.bind(this);
    this.getTxStatus = this.getTxStatus.bind(this);
  }

  setValue = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Voting;

    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods.set.cacheSend(value, {
      from: drizzleState.accounts[0]
    });

    // save the `stackId` for later reference
    this.setState({ stackId });
  };

  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const {
      drizzleState: { transactions, transactionStack }
    } = this.props;

    // get the transaction hash using our saved `stackId`
    const { stackId: id } = this.state;
    const txHash = transactionStack[id];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] &&
      transactions[txHash].status}`;
  };

  handleChange() {
    const { count } = this.state;
    console.log(count);
    this.setValue(count);
  }

  handleSubmit(event) {
    this.setState({
      count: event.target.value
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <div className="d-flex justify-content-center">Your key: </div>
        <div className="d-flex justify-content-center">
          <input
            type="text"
            className="voteInput"
            onChange={this.handleSubmit}
          />
        </div>
        <div className="d-flex justify-content-center">
          <Button
            color="primary"
            onClick={this.handleChange}
            className="button"
            type="submit"
          >
            {' '}
            Verify{' '}
          </Button>
        </div>
        <div className="d-flex justify-content-center">
          <h1 className="key">{count}</h1>
        </div>
        <div className="d-flex justify-content-center">
          {this.getTxStatus()}
        </div>
      </div>
    );
  }
}

export default Verifier;
