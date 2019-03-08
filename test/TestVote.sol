pragma solidity ^0.5.5;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Vote.sol";

contract TestVote {
    // The address of the vote contract to be tested
    Vote vote = Vote(DeployedAddresses.Vote());

    function testDoVote()
    public
    {
        uint returnedVote = vote.doVote();

        Assert.equal(returnedVote, 1,
        "Vote value should be 1");
    }
}