import React, { Component } from 'react';

class ShowingParties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parties: null
    };
  }

  async componentDidMount() {
    const { parties } = this.state;
    if (parties) return;

    const { drizzle } = this.props;
    const contract = drizzle.contracts.Voting;

    const nParties = await contract.methods.getNumberOfParties().call();

    const promises = [];
    for (let i = 0; i < nParties; i += 1) {
      promises.push(contract.methods.parties(i).call());
    }

    Promise.all(promises).then(response => {
      this.state = { parties: { response } };
    });
  }

  render() {
    const { parties } = this.state;
    if (!parties) return '';

    return (
      <div>
        <h4>Number of parties: {parties.length}</h4>
      </div>
    );
  }
}

export default ShowingParties;
