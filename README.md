[![CircleCI](https://circleci.com/gh/datx02-19-85/project.svg?style=shield)](https://circleci.com/gh/datx02-19-85/project)

# Ethereum voting
A description will be added shortly...

## Current smart contracts:
- [Vote](/documents/vote.md) - is our first contract to try out different possibilities. 
- [Voting](/documents/voting.md) - a first implementation of voting.

More to come...

## Requirements
 - node.js version ^11.7.*

## Setup project
Clone the repo:
```
$ git clone https://github.com/datx02-19-85/contracts.git
```
Install all the dependencies:
```
$ npm install && cd client/ && npm install && cd ..
```

#### Run code locally with ganache-cli
This project contains ganache-cli so that all the tests and code can run without any global installations needed. To setup a locally running blockchain with the smart contracts inside this project just run
```
$ npm run start
```
This command will start a ganache server running in your terminal window and migrate the contracts. It is also possible to run the **tests** using this environment 
```
$ npm run test
```

#### Run code locally with Ganache 
In order to migrate to Ganache run:
```
$ npm run migrate:g
```
To run tests:
```
$ npm run test:g
```
For other command, run:
```
$ truffle <command> --network graphical
```
This should work for all types of truffle commands you want, eg migrate, test etc.

## How to run frontend
See [README](/client/README.md)
___

## How to create a smart contract
1. Create a new .sol file inside the [/contracts](/contracts/) folder
2. Import contract inside the [deploy script](/migrations/2_deploy_contracts.js) to be able to migrate new contracts to the chain
3. Create markdown file inside the [/documents](/documents/) folder
4. Add description of the contracts
5. Put link to description at the top of this readme (below "Current smart contracts")

___

## More information about the repo
Our boilerplate code is from this [repo](https://github.com/tylerjohnhaden/__truffle-boilerplate)
following this [guide](https://blog.ippon.tech/creating-your-first-truffle-project-part-2-of-2/) to understand the code.

___

## TODO:
- [ ] Set correct license for project
- [ ] A small voting prototype
  - [ ] Iteration 1: Be able to vote
    - [ ] GUI for generating random hash ID for voters
      - [ ] Add hash to contract to allow voter to vote
    - [ ] GUI to display all political parties
    - [ ] GUI for inputting hash ID
    - [ ] Add vote to contract (vote)
  - [ ] Iteration 2: Show that you voted
  - [ ] ...

More TODOs will be added shortly...