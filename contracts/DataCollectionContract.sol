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
            votesUsingInt[i].on = "6fe5d195688065587232a05b867ab51b02527011a72b87e73df636d1f5616849c0bfd1214111fcbc7f816a7da2ad129b9c3d019caf500ff6b04ce746c06815959a9cc35593a0277dd36f48af1ebfa53b71cd7aebe66c38a4b6c9476e4399d0336bfb1041f2d62a627c7144ce96da5d1b3e";
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