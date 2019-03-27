import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Import drizzle, drizzle-react, and your contract artifacts.
import { Drizzle, generateStore } from "drizzle";
import { DrizzleContext } from "drizzle-react";
import options from "./DrizzleOptions"

// Add your contracts to DrizzleOptions.js

const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(
    <DrizzleContext.Provider drizzle={drizzle}>
        <App />
    </DrizzleContext.Provider>,
    document.getElementById('root'));
