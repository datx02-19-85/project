pragma solidity ^0.5.5;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Voting.sol";

contract TestVoting {
    // The address of the vote contract to be tested
    Voting vote = Voting(DeployedAddresses.Voting());
    string private party = "Kalleanka partiet";

    function testCanSenderVote()
    public
    {
        bool didIVote = vote.didVote();
        Assert.isFalse(didIVote, "Sender should not have voted at this time");
    }

    function testVote()
    public 
    {
        vote.vote(party);

        bool didIVote = vote.didVote();
        Assert.isTrue(didIVote, "Sender should have voted");
    }

    function testShowingResultOnParty()
    public
    {
        uint votes = vote.votesOnParty(party);

        Assert.equal(votes, 1, "There should be a vote on Kalleanka partiet at this point");
    }

    function testVoteTwice()
    public
    {
        bool r;

        (r, ) = address(this).call(abi.encodePacked(this.voteTwice.selector));
        Assert.isFalse(r, "Sender should not be able to vote twice");
    }

    function voteTwice()
    public 
    {
        vote.vote(party);
        uint votes = vote.votesOnParty(party);

        vote.vote(party);
        uint newVotes = vote.votesOnParty(party);
        Assert.equal(votes, newVotes, "Should be same since senders are not able to vote twice.");
    }


    

}