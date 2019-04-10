import React from 'react';
import { Button } from 'reactstrap';
import Form from 'react-bootstrap/Form';
// import EthCrypto from 'eth-crypto';
import startElection from '../utils/StartElection';
import getParties from '../utils/PartyCollector';
import encryptVote from '../utils/EncryptVote';
import '../Verifierstyle.css';
import '../animate.css';

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
      key: null,
      voteConfirm: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVerify = this.handleVerify.bind(this);
    this.setValue = this.setValue.bind(this);
    this.getTxStatus = this.getTxStatus.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.getKey = this.getKey.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleSend = this.handleSend.bind(this);
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
      // const { publicKey } = EthCrypto.createIdentity();
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
      drizzle: { store }
    } = this.props;

    const state = store.getState();
    const { voteConfirm } = this.state;
    console.log('vote configmr is, ', voteConfirm);
    if (voteConfirm == null) return null;
    // get the transaction hash using our saved `stackId`
    const txHash = state.transactionStack[voteConfirm];

    console.log('tsxhash is: ', txHash);

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;
    const { drizzleState: transactions } = this.props;
    console.log(transactions[txHash]);
    // otherwise, return the transaction status
    return `Transaction status: ${state.transactions[txHash] &&
      state.transactions[txHash].status}`;
  };

  handleSend = (count, encryptedVote) => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Voting;

    const voteConfirm = contract.methods.vote.cacheSend(count, encryptedVote, {
      from: drizzleState.accounts[0]
    });

    this.setState({ voteConfirm });
    console.log(`voteconfirm is:${voteConfirm}`);
  };

  async handleVote() {
    const { count } = this.state;
    const { key } = this.state;
    const { candidate } = this.state;
    const encryptedVote = await encryptVote(key, candidate);
    const r = window.confirm(`You are now voting for ${candidate}`);
    if (r === true) {
      this.handleSend(count, encryptedVote);

      console.log('here is function:', encryptedVote);
      console.log('key', key);
      console.log('candidate', candidate);

      console.log(`txstatus:${this.getTxStatus()}`);
    }
  }

  handleSubmit(event) {
    this.setState({
      count: event.target.value
    });
  }

  async handleVerify() {
    const { count, show } = this.state;
    console.log(count);
    this.setValue(count);
    await this.setState({ show: true });
    if (show) window.alert('You are now verified. Please cast your vote.');
  }

  handleForm(event) {
    // this.setState({
    //  candidate:event.target.key
    // })
    this.setState({ candidate: event.target.value });
    // console.log(this.state.candidate);
  }

  render() {
    const { drizzleState } = this.props;

    const contract = drizzleState.contracts.Voting;
    const { stackId } = this.state;
    const value = contract.isAbleToVote[stackId];

    const { parties } = this.state;
    const { show } = this.state;
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
        <div className=" d-flex justify-content-center">
          <div className="idBox">
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
                onClick={this.handleVerify}
                className="button"
                type="submit"
              >
                {' '}
                Verify{' '}
              </Button>
            </div>
          </div>
          {/* <div className ="animated fadeInLeft ">Key status: {value != null ? value.value.toString() : ''}</div> */}
          {show && (
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
          )}
        </div>
        <div className="statusBox d-flex justify-content-center">
          {this.getTxStatus()}
        </div>
      </div>
    );
  }
}

export default Verifier;
