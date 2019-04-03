import React, { PureComponent } from 'react';
import ShowingParties from './components/ShowingParties';

class VotingApp extends PureComponent {
  render() {
    const { drizzle, drizzleState } = this.props;

    return (
      <div>
        <ShowingParties drizzle={drizzle} drizzleState={drizzleState} />
      </div>
    );
  }
}

export default VotingApp;
