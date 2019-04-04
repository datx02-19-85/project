import React, { PureComponent } from 'react';
import Verifier from './components/Verifier';
import Read from './components/Read';
import ShowingParties from './components/ShowingParties';

class VotingApp extends PureComponent {
  render() {
    const { drizzle, drizzleState } = this.props;

    return (
      <div>
        <ShowingParties drizzle={drizzle} drizzleState={drizzleState} />
        <Verifier drizzle={drizzle} drizzleState={drizzleState} />
        <Read drizzle={drizzle} drizzleState={drizzleState} />
      </div>
    );
  }
}

export default VotingApp;
