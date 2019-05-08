# Voting Client

### How to run

Make sure a Ganache server is running with the contract migrated on the network

```
$ cd client/ && npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Run test

```
$ cd client/ && npm test
```

## What dependencies used

The used dependecies can be found in [package.json](package.json) and look under dependencies.
Most of these are used for graphical purposes, however 'eth-crypto' is used to both generate key-pairs and encrypt strings and 'object-hash' that is used to generate a random voting hash.
