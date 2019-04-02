import React, { PureComponent } from 'react';
import Verifier from './components/Verifier';
// import ShowingStatus from './components/ShowingStatus';
// import ShowingParties from './components/ShowingParties';

class VotingApp extends PureComponent {
  render() {
    const { drizzle, drizzleState } = this.props;

    return (
      <div>
        {/* <ShowingStatus drizzle={drizzle} drizzleState={drizzleState} />
        <ShowingParties drizzle={drizzle} drizzleState={drizzleState} /> */}
        <Verifier drizzle={drizzle} drizzleState={drizzleState} />
      </div>
    );
  }
}

export default VotingApp;
