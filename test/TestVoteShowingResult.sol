pragma solidity ^0.5.5;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/VoteShowingResult.sol";

contract TestVoteShowingResult {
    // The address of the vote contract to be tested
    VoteShowingResult vote = VoteShowingResult(DeployedAddresses.VoteShowingResult());
    string private party = "Kalleanka partiet";

    function testCanSenderVote()
    public
    {
        bool did_i_vote = vote.didVote();
        Assert.isFalse(did_i_vote, "Sender should not have voted at this time");
    }

    function testVote()
    public 
    {
        vote.vote(party);

        bool did_i_vote = vote.didVote();
        Assert.isTrue(did_i_vote, "Sender should have voted");
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
        Assert.equal(votes, newVotes ,"Should be same since senders are not able to vote twice.");
    }


    

}