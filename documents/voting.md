# Voting

This is a implementation of a Voting smart-contracts that from the start are have 3 parties hard coded in the constructor.

## What is it doing
The contract will allow only one person to perform a "vote" that is calling a function called doVote("party"). The argument in this function is the party the sender votes on. This function will then save the senders address inside a map and increment that the value by one. 
An address that have voted will therefore always have number 1 as value. 

## Show what parties people voted on
We also store a map with parties as keys. The values of this map is an array of all keys voted on that party. So when you want to know were your vote went you can controll in what array your address is added. 

___

More info will be added here.

### [Back](../README.md)