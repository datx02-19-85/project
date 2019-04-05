import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../components/Header';
// import SwipeableRoutes from 'react-swipeable-routes';

import RenderID from '../screens/RenderID';
import Verifier from '../components/Verifier';

export default class Routing extends React.Component {
  constructor(props) {
    super(props);
    const { drizzle, drizzleState } = this.props;
    this.state = {
      drizzle,
      drizzleState
    };
  }

  generate = () => {
    const { state } = this;
    return (
      <RenderID drizzle={state.drizzle} drizzleState={state.drizzleState} />
    );
  };

  verifier = () => {
    const { state } = this;
    return (
      <Verifier drizzle={state.drizzle} drizzleState={state.drizzleState} />
    );
  };

  render() {
    const { generate, verifier } = this;
    return (
      <Router>
        <div>
          <Header />
          <Route path="/generate" component={generate} />
          <Route path="/verifier" component={verifier} />
        </div>
      </Router>
    );
  }
}
