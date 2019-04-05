pragma solidity ^0.5.5;

/**
* This contract is only used to collecting test data
* Differences from Voting.sol is only removing modifiers
* and start and stop functions
*/

contract Voting {

    mapping(string => Vote) private votes;
    mapping(uint => Vote) private votesUsingInt;
    string[] public voters;

    struct Vote {
        bool eligibleToVote;
        string on;
    }

    constructor()
    public 
    {
        // Not sure if needed
    }

    function createAlotOfVotes(uint startValue)
    public
    {
        uint makeVotes = 100000;
        for (uint i = startValue; i < makeVotes; i++) {
            votesUsingInt[i].on = "";
            votesUsingInt[i].eligibleToVote = false;
        }
    }

    function vote(string memory id, string memory voteData)
    public
    {
        Vote memory userVote = votes[id];
        require(userVote.eligibleToVote, "This ID already voted!");

        userVote.on = voteData;
        userVote.eligibleToVote = false;
        votes[id] = userVote;
    }
    function addVoter(string memory id)
    public
    {
        Vote memory userVote = Vote(true, "");
        votes[id] = userVote;
        voters.push(id);
    }

    function getNumberOfVoters()
    public view
    returns (uint)
    {
        return voters.length;
    }
}