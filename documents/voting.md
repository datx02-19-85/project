# Voting

This is a implementation of a Voting smart-contracts that makes it possibel to start and stop an election. Its only when the election is stopped its easy to collect the votes.

## What is it doing

The contract will allow only one person to perform a "vote" that is calling a function called vote("voterId", "party"). The arguments in this function is the votersId given earlier in addVoter("voterId") and a encrypted vote on what party the voter votes on. This function will then save the voters id inside a map together with the encrypted vote.
Together with the vote we also store a bool value if the voter is eligible to vote. If a voterId is not added the default value will always be false.

## Show what parties people voted on

To be able to see how people voted you have to stop the election and then collect all the votes using getVote(int index). Then loop this function for getNumberOfVoters() times.

---

## How to use the contract:

### Public functions that can be used:

- isAbleToVote(string votingId)
  - This function is taking the voting id and returns if it is able to vote.
- startElection(string publicKey, int maxNumberOfVoters)
  - Starts an election if its possible. If an election is already started this function will give you error. Starting a new one will clear all the data from last election.
- stopElection(string privateKey)
  - Stop an election. This function can be used even if an election is not running.
- vote(string voterId, string vote)
  - This takes a voterId and checks if its eligible to vote. If not will throw error else saving the vote.
- addVoter(string voterId)
  - This makes an voterId eligible to vote.
- getNumberOfVoters()
  - Returns the number of added voters. (NOT maxNumberOfUsers.)
- getVote(int index)
  - This function takes an index to a voter and returns that voters vote.

More info will be added here.

### [Back](../README.md)
