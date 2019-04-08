import React from 'react';
import { DrizzleContext } from 'drizzle-react';
import ReactLoading from 'react-loading';
import VotingApp from './VotingApp';

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;

      if (!initialized) {
        // TODO: Show a nice screen. Maybe even catch why this is showing.
        return (
          <div
            className="d-flex flex-column"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <h1>Loading...</h1>
            <ReactLoading type="cylon" color="black" width="20%" />
          </div>
        );
      }

      return <VotingApp drizzle={drizzle} drizzleState={drizzleState} />;
    }}
  </DrizzleContext.Consumer>
);
