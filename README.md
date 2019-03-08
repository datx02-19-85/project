[![CircleCI](https://circleci.com/gh/datx02-19-85/contracts.svg?style=svg)](https://circleci.com/gh/datx02-19-85/contracts)

# Contracts

This repo is used to store all of our smart contracts and test cases.

The boilerplate code is from this [repo](https://github.com/tylerjohnhaden/__truffle-boilerplate)
following this [guide](https://blog.ippon.tech/creating-your-first-truffle-project-part-2-of-2/) to understand the repo.

TODO:
- [ ] Add "how to run"
- [ ] Fill out the readme
- [ ] Set correct license
- [ ] A small voting prototype
- [x] CI

## How to run

There is multiple scripts in package.json that is able to start the system in different ways.

To run at the moment just type

```
npm run start
```

to use graphical ganache install instead, use
```
truffle migrate --network graphical
```
HOWEVER using exactly that command requires truffle to be installed globally.

This text will be changed over time