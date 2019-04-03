pragma solidity ^0.5.5;

contract Voting {
    address private owner;
    string public publicKey;
    uint public endingTime;
    bool public electionIsRunning;
    uint public maxNumberOfVoters;

    mapping(string => Vote) private votes;
    string[] public voters;

    struct Vote {
        bool eligibleToVote;
        string on;
    }

    constructor()
    public 
    {
        owner = msg.sender;
        endingTime = now + 15;
        publicKey = "Not hello";
        electionIsRunning = false;

    }

    modifier onlyOwner {
        require(msg.sender == owner, "This sender cannot access voting functions.");
        _;
    }

    modifier voteEnded {
        require(now >= endingTime, "Not able to get PrivateKey yet. Vote have not ended");
        _;
    }

    modifier notRunning {
        require(electionIsRunning == false, "Vote should not be running");
        _;
    }

    function startElection
    (
        string memory key, 
        uint upTime, 
        uint nVoters
    )
    public onlyOwner notRunning
    returns (bool)
    {
        maxNumberOfVoters = nVoters;
        publicKey = key;
        endingTime = (now + upTime);
        electionIsRunning = true;
    }

    function vote(string memory id, string memory voteData)
    public onlyOwner
    {
        Vote memory userVote = votes[id];
        require(userVote.eligibleToVote, "This ID already voted!");

        userVote.on = voteData;
        userVote.eligibleToVote = false;
        votes[id] = userVote;
    }

    function addVoter(string memory id)
    public onlyOwner
    {
        Vote memory userVote = Vote(true, "");
        votes[id] = userVote;
        voters.push(id);
    }

    function getNow() 
    public view
    returns (uint)
    {
        return now;
    }

    function getNumberOfVoters()
    public view
    returns (uint)
    {
        return voters.length;
    }

    function getTimeLeft()
    public view
    returns (int)
    {
        return int(endingTime) - int(now);
    }

    function isAbleToVote(string memory id)
    public view
    returns (bool)
    {
        return votes[id].eligibleToVote;
    }

}