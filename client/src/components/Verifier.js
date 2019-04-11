import React from 'react';
import { Button } from 'reactstrap';
import Form from 'react-bootstrap/Form';
// import EthCrypto from 'eth-crypto';
import getParties from '../utils/PartyCollector';
import encryptVote from '../utils/EncryptVote';
import '../Verifierstyle.css';
import '../animate.css';

class Verifier extends React.Component {
  constructor() {
    super();
    this.state = {
      count: null,
      parties: null,
      candidate: null,
      key: null,
      voteConfirm: null,
      able: false
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
    const { drizzle } = this.props;
    const { parties, key } = this.state;
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
      console.log('here is the keeeey:', publicKey);
      // const { publicKey } = EthCrypto.createIdentity();
      this.setState({ key: publicKey });
    }
  }

  setValue = async value => {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.Voting;

    // let drizzle know we want to call the `set` method with `value`

    const isit = await contract.methods.isAbleToVote(value).call();
    console.log('well isit?', isit);

    this.setState({ able: isit });
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

    const { drizzle: props } = this.props;
    const stateUpdate = props.store.getState();
    // const stateUpdate = this.props.drizzle.store.getState();
    const { voteConfirm } = this.state;
    console.log('vote configmr is, ', voteConfirm);
    if (voteConfirm == null) return null;
    // get the transaction hash using our saved `stackId`
    const txHash = stateUpdate.transactionStack[voteConfirm];

    console.log('tsxhash is: ', txHash);

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;
    console.log(
      `Transaction status: ${stateUpdate.transactions[txHash] &&
        stateUpdate.transactions[txHash].status}`
    );

    // otherwise, return the transaction status
    return `Transaction status: ${stateUpdate.transactions[txHash] &&
      stateUpdate.transactions[txHash].status}`;
  };

  handleSend = (count, encryptedVote) => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Voting;

    const voteConfirm = contract.methods.vote.cacheSend(count, encryptedVote, {
      from: drizzleState.accounts[0],
      gas: 250000
    });

    this.setState({ voteConfirm });
    console.log(`voteconfirm is:${voteConfirm}`);
  };

  async handleVote() {
    const { count } = this.state;
    const { key } = this.state;
    const { candidate } = this.state;
    // const encryptedVote = await encryptVote(key, candidate);
    const encryptedVote = candidate;
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
    const { count } = this.state;
    console.log('testting count:', count);
    await this.setValue(count);
    // this.handleTrue();
    // window.alert('You are now verified. Please cast your vote.'));
  }

  handleForm(event) {
    // this.setState({
    //  candidate:event.target.key
    // })
    this.setState({ candidate: event.target.value });
    // console.log(this.state.candidate);
  }

  /* handleTrue() {
    const { drizzleState } = this.props;
    const contract = drizzleState.contracts.Voting;
    const { stackId } = this.state;
    const able = contract.isAbleToVote[stackId];

    this.setState({ able });
    console.log(`test show ${  this.state.show}`);
    console.log(`here is able shit ${  able}`);

    if (this.state.able) this.setState({ show: true });
  } */

  render() {
    const { parties } = this.state;
    const { count } = this.state;
    const { able } = this.state;

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

    // if (value) console.log('value is ', value.value);

    return (
      <div>
        {console.log('COUNTTT', count)}
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
