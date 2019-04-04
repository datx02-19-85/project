import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import SwipeableRoutes from 'react-swipeable-routes';

import RenderID from '../screens/RenderID';
// import Verifier from '../components/Verifier';

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

  render() {
    const { generate } = this;
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/generate">Generate</Link>
            </li>
          </ul>
          <Route path="/generate" component={generate} />
        </div>
      </Router>
    );
  }
}
