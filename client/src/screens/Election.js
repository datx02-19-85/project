import React from 'react';
import Button from '../components/Button';

export default class Election extends React.Component {
  /* constructor(props) {
    super(props);
    const { drizzle, drizzleState } = this.props;
    this.state = {
      drizzle: drizzle,
      drizzleState: drizzleState
    };
  } */

  startElection = () => {};

  render() {
    const { /* state, */ startElection } = this;
    return (
      <div>
        <Button
          name="Start election!"
          color="warning"
          onClick={startElection}
        />
      </div>
    );
  }
}
