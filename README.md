[![CircleCI](https://circleci.com/gh/datx02-19-85/contracts.svg?style=svg)](https://circleci.com/gh/datx02-19-85/contracts)

# Contracts

This repo is used to store all of our smart contracts and test cases.

## Current smart contracts:
- Vote - is our first contract to try out different possabilities. Read more [here](/documents/vote.md)
- Voting - a first implementation of voting. Read more [here](/documents/voting.md)

more to come...

## How to run

#### Requirements
 - node.js version ^11.7.*

Open up a Unix terminal and execute these commands:

```
git clone https://github.com/datx02-19-85/contracts.git
```
```
cd contracts
```
Now we want to install all the dependencies given by the [package.json](package.json):
```
npm install
```
Now there is multiple options.

#### Run code locally with ganache-cli
This project contains ganache-cli so that all the tests and code can run without any other installations needed. To setup a locally running blockchain with the smart contracts inside this project just run
```
npm run start
```
This command will start a ganache server running in your terminal window and migrate the contracts. It is also possible to run the **tests** using this environment 
```
npm run test
```

#### Run code locally with Ganache 
At this time there is no npm script to do this. Instead if you have truffle installed locally on your computer you can use the graphical Ganache server by using
```
truffle <command> --network graphical
```
this should work for all types of truffle commands you want, eg migrate, test etc.

___

## How to create a smart contract
To make a smart contract you just create a new .sol file inside the [/contracts](/contracts/) folder. To be able to migrate new contracts to the chain they also need to be added inside the [deploy script](/migrations/2_deploy_contracts.js). 


Describe the different smart contracts added by linking to a separate markdown file inside the [/documents](/documents/) folder. Put your links at the top of this readme.

___

## More information about the repo
Our boilerplate code is from this [repo](https://github.com/tylerjohnhaden/__truffle-boilerplate)
following this [guide](https://blog.ippon.tech/creating-your-first-truffle-project-part-2-of-2/) to understand the code.

___

## TODO:
- [x] Add "how to run"
  - [ ] Fix how to run all
  - [ ] Fix how to run frontend
- [x] Fill out the readme
  - [ ] Edit readme with more and better information
- [x] CI
- [ ] Set correct license
- [ ] A small voting prototype
  - [x] Iteration 1 (be able to vote)
  - [ ] Iteration 2 (show that you voted)
  - [ ] Iteration 3 (more to come...)
  - [ ] ...
- [x] Add frontend client
  - [ ] Create correct README
  - [ ] Make link to frontend readme from here

... more todos will be added over time