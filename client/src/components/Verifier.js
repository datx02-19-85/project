import React from 'react';
import { Button } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import getParties from '../utils/PartyCollector';
import { encryptVote } from '../utils/EncryptVote';
import '../Verifierstyle.css';
import '../animate.css';

class Verifier extends React.Component {
  constructor() {
    super();
    this.state = {
      voterID: null,
      parties: null,
      candidate: null,
      voteConfirm: null,
      able: false,
      didVote: false,
      input: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVerify = this.handleVerify.bind(this);
    this.setValue = this.setValue.bind(this);
    this.getTxStatus = this.getTxStatus.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  async componentDidMount() {
    const { drizzle } = this.props;
    const { parties } = this.state;
    if (!parties) {
      const p = await getParties(drizzle);
      this.setState({
        parties: p
      });
    }
  }

  setValue = async value => {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Voting;

    // let drizzle know we want to call the `set` method with `value`

    const isit = await contract.methods.isAbleToVote(value).call();

    this.setState({ able: isit });
  };

  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { drizzle: props } = this.props;
    const stateUpdate = props.store.getState();
    const { voteConfirm } = this.state;

    if (voteConfirm == null) return null;
    // get the transaction hash using our saved `stackId`
    const txHash = stateUpdate.transactionStack[voteConfirm];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Transaction status: ${stateUpdate.transactions[txHash] &&
      stateUpdate.transactions[txHash].status}`;
  };

  handleSend = (voterID, encryptedVote) => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Voting;

    const voteConfirm = contract.methods.vote.cacheSend(
      voterID,
      encryptedVote,
      {
        from: drizzleState.accounts[0],
        gas: 250000
      }
    );

    this.setState({ voteConfirm, didVote: true });
  };

  async handleVote() {
    const { drizzle } = this.props;
    const { voterID } = this.state;
    const { candidate } = this.state;
    const publicKey = await drizzle.contracts.Voting.methods.publicKey().call();
    const encryptedVote = await encryptVote(publicKey, candidate);
    const r = window.confirm(`You are now voting for ${candidate}`);
    if (r === true) {
      this.handleSend(voterID, encryptedVote);
    }
  }

  handleSubmit(event) {
    this.setState({
      voterID: event.target.value,
      input: event.target.value
    });
  }

  async handleVerify() {
    const { voterID } = this.state;
    await this.setValue(voterID);
  }

  handleForm(event) {
    this.setState({ candidate: event.target.value });
  }

  render() {
    const { parties } = this.state;
    const { able, didVote, input } = this.state;

    if (didVote) {
      // Reset this page
      this.setState({
        voterID: null,
        candidate: null,
        voteConfirm: null,
        able: false,
        didVote: false,
        input: ''
      });
      this.forceUpdate();
    }

    if (!parties) return '';
    const size = parties.length; // antalet kandidater
    const options = []; // array med kandidater (i formatet <option> PARTI </option>)
    for (let i = 0; i < size; i += 1) {
      //
      options.push(<option key={i}> {parties[i]} </option>); //
    }

    return (
      <div>
        <div className=" d-flex justify-content-center">
          <div>
            <div className="d-flex justify-content-center">Your key: </div>
            <div className="d-flex justify-content-center">
              <input
                type="text"
                className="voteInput"
                onChange={this.handleSubmit}
                value={input}
              />
            </div>
            <div className="d-flex justify-content-center">
              <Button
                color="primary"
                onClick={this.handleVerify}
                className="button"
                type="submit"
              >
                {' '}
                Verify{' '}
              </Button>
            </div>
          </div>
          {able ? (
            <div className="boxx">
              <div className=" animated fadeInDown  ">
                <Form>
                  <Form.Group controlId="exampleForm.ControlSelect">
                    <Form.Control
                      onChange={this.handleForm}
                      componentClass="textarea"
                      style={{ height: 100, width: 500 }}
                      as="select"
                      multiple
                    >
                      {options}
                    </Form.Control>
                  </Form.Group>
                </Form>
                <Button
                  color="primary"
                  className="Vote-button "
                  type="submit"
                  onClick={this.handleVote}
                >
                  Submit vote
                </Button>
              </div>
            </div>
          ) : null}
        </div>
        <div>{this.getTxStatus()}</div>
      </div>
    );
  }
}

export default Verifier;
