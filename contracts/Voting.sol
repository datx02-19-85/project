pragma solidity ^0.5.5;

contract Voting {
    address private owner;
    string public myString = "0";

    mapping(string => Vote) private votes;
    string[] public voters;

    enum VotingEligibility { No, Yes }

    struct Vote {
        bool eligibleToVote;
        string on;
    }

    constructor()
    public 
    {
        owner = msg.sender;
    }

    modifier eligibleToPerform {
        require(msg.sender == owner, "This sender cannot access voting functions.");
        _;
    }

    function vote(string memory id, string memory voteData)
    public eligibleToPerform
    {
        Vote memory vote = votes[id];
        require(!vote.eligibleToVote, "This ID already voted!");

        vote.on = voteData;
        vote.eligibleToVote = false;
        votes[id] = vote;
    }

    function addVoter(string memory id)
    public eligibleToPerform
    {
        Vote memory vote = Vote(true, "");
        votes[id] = vote;
    }

    function isAbleToVote(string memory id)
    public view
    returns (bool)
    {
        return votes[id].eligibleToVote;
    }

    function set(string memory x) public {
        myString = x;
    }

}