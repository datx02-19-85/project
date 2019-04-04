import React, { PureComponent } from 'react';
import Routing from './utils/Routing';
// import ShowingStatus from './components/ShowingStatus';
// import ShowingParties from './components/ShowingParties';

class VotingApp extends PureComponent {
  render() {
    const { drizzle, drizzleState } = this.props;

    return <Routing drizzle={drizzle} drizzleState={drizzleState} />;
  }
}

export default VotingApp;
