import React, { Component } from 'react';
import getParties from '../utils/PartyCollector';

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
    const p = await getParties(drizzle);

    console.info(p);
  }

  render() {
    return <div />;
  }
}

export default ShowingParties;
