import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../components/Header';
// import SwipeableRoutes from 'react-swipeable-routes';

import RenderID from '../screens/RenderID';
import Verifier from '../components/Verifier';
import Election from '../screens/Election';

export default class Routing extends React.Component {
  start = () => {
    return <div />;
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
    return <Election drizzle={drizzle} drizzleState={drizzleState} />;
  };

  render() {
    const { start, generate, verifier, election } = this;
    return (
      <Router>
        <div>
          <Header />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <Route path="/" component={start} />
            <Route path="/generate" component={generate} />
            <Route path="/verifier" component={verifier} />
            <Route path="/election" component={election} />
          </div>
        </div>
      </Router>
    );
  }
}
