import React from 'react';
import { Button } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import startElection from '../utils/StartElection';
import getParties from '../utils/PartyCollector';
// import encryptVote from '../utils/PartyCollector';

class Verifier extends React.Component {
  constructor() {
    super();
    this.state = {
      stackId: null,
      count: null,
      didStartElection: false,
      parties: null,
      show: false,
      candidate: null,
      key: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setValue = this.setValue.bind(this);
    this.getTxStatus = this.getTxStatus.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.getKey = this.getKey.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  async componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const { didStartElection, parties, key } = this.state;
    if (!didStartElection) {
      await startElection(drizzle, drizzleState);
      this.state.didStartElection = true;
    }
    if (!parties) {
      const p = await getParties(drizzle);
      this.setState({
        parties: p
      });
    }
    if (!key) {
      const publicKey = await drizzle.contracts.Voting.methods
        .publicKey()
        .call();
      this.setState({ key: publicKey });
    }
  }

  setValue = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Voting;

    // let drizzle know we want to call the `set` method with `value`
    const stackId = contract.methods.isAbleToVote.cacheCall(value, {
      from: drizzleState.accounts[0]
    });

    // save the `stackId` for later reference
    this.setState({ stackId });
  };

  getKey = async () => {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Voting;

    const getKeyCall = await contract.methods.publicKey().call();
    console.log('keycall is ', getKeyCall.value);
    this.setState({ key: getKeyCall });
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

  handleForm(event) {
    // this.setState({
    //  candidate:event.target.key
    // })
    this.setState({ candidate: event.target.value });
    // console.log(this.state.candidate);
  }

  handleChange() {
    const { count } = this.state;
    console.log(count);
    this.setValue(count);
    this.setState({ show: true });
  }

  handleSubmit(event) {
    this.setState({
      count: event.target.value
    });
  }

  async handleVote() {
    // console.log('key', this.state.key);
    // console.log('candidate', this.state.candidate);
    const { key } = this.state;
    const { candidate } = this.state;
    const encryptedVote = await getParties(key, candidate);
    console.log('here is function:', encryptedVote.value);
  }

  render() {
    const { drizzleState } = this.props;

    const contract = drizzleState.contracts.Voting;
    const { stackId } = this.state;
    const value = contract.isAbleToVote[stackId];

    const { count, parties } = this.state;
    const {show} = this.state;
    // for (let i=0; i < 3; i += 1){
    //   options.push(<option> {parties[0] } </option>)
    // }
    if (!parties) return '';
    const size = parties.length; // antalet kandidater
    const options = []; // array med kandidater (i formatet <option> PARTI </option>)
    for (let i = 0; i < size; i += 1) {
      //
      options.push(<option key={i}> {parties[i]} </option>); //
    }

    if (value) console.log('value is ', value.value);

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
        <div>Key status: {value != null ? value.value.toString() : ''}</div>
        {show && (
          <div className="d-flex justify-content-center">
            <Form>
              <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Control
                  onChange={this.handleForm}
                  componentClass="textarea"
                  style={{ height: 100, width: 1000 }}
                  as="select"
                  multiple
                >
                  {options}
                </Form.Control>
              </Form.Group>
            </Form>
            <Button
              color="primary"
              className="button"
              type="submit"
              onClick={this.handleVote}
            >
              Vote
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default Verifier;
