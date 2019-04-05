import React from 'react';
import Button from '../components/Button';
import StartElection from '../utils/StartElection';

export default class Election extends React.Component {
  start = async () => {
    const { drizzle, drizzleState } = this.props;
    const didStartup = await StartElection(drizzle, drizzleState);
    console.log(didStartup);
  };

  render() {
    const { start } = this;
    return (
      <div>
        <Button name="Start election!" color="warning" onClick={start} />
      </div>
    );
  }
}
