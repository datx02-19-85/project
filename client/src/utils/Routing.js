import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SwipeableRoutes from 'react-swipeable-routes';
import Header from '../components/Header';

import Start from '../screens/Start';
import RenderID from '../screens/RenderID';
import Verifier from '../components/Verifier';
import Election from '../screens/Election';

import isElectionRunning from "./IsElectionRunning";

export default class Routing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false
    };
    isElectionRunning(props.drizzle).then(isRunning => {
      this.state = {
        isRunning
      };
    });
  }

  start = () => {
    const { drizzle, drizzleState } = this.props;
    const {isRunning} = this.state;
    return (
      <Start
        drizzle={drizzle}
        drizzleState={drizzleState}
        isRunning={isRunning}
      />
    );
  };

  generate = () => {
    const { drizzle, drizzleState } = this.props;
    return <RenderID drizzle={drizzle} drizzleState={drizzleState} />;
  };

  verifier = () => {
    const { drizzle, drizzleState } = this.props;
    return <Verifier drizzle={drizzle} drizzleState={drizzleState} />;
  };

  election = () => {
    const { drizzle, drizzleState } = this.props;
    const {isRunning} = this.state;
    return (
      <Election
        drizzle={drizzle}
        drizzleState={drizzleState}
        isRunning={isRunning}
      />
    );
  };

  render() {
    const { start, generate, verifier, election } = this;
    return (
      <Router>
        <div>
          <Header />
          <SwipeableRoutes
            style={{
              position: 'fixed',
              justifyContent: 'center',
              align: 'center',
              left: '0',
              right: '0',
              top: '30%'
            }}
          >
            <Route path="/" component={start} />
            <Route path="/generate" component={generate} />
            <Route path="/verifier" component={verifier} />
            <Route path="/election" component={election} />
          </SwipeableRoutes>
        </div>
      </Router>
    );
  }
}
