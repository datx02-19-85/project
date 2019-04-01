pragma solidity ^0.5.5;

contract Voting {
    address private owner;
    string public trueKey = "false";
    string public myString = "abc123";
    
    string private privateKey;
    string public publicKey;
    uint public endingTime;

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
        endingTime = now + 30;
        privateKey = "hello";
        publicKey = "Not hello";

    }

    modifier eligibleToPerform {
        require(msg.sender == owner, "This sender cannot access voting functions.");
        _;
    }

    modifier voteEnded {
        require(now >= endingTime, "Not able to get PrivateKey yet. Vote have not ended");
        _;
    }

    function vote(string memory id, string memory voteData)
    public eligibleToPerform
    {
        Vote memory userVote = votes[id];
        require(userVote.eligibleToVote, "This ID already voted!");

        userVote.on = voteData;
        userVote.eligibleToVote = false;
        votes[id] = userVote;
    }

    function addVoter(string memory id)
    public eligibleToPerform
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

    function getPrivateKey()
    public view voteEnded
    returns (string memory)
    {
        return privateKey;
    }

    function isAbleToVote(string memory id)
    public view
    returns (bool)
    {
        return votes[id].eligibleToVote;
    }

    function set(string memory x) 
    public 
    {
        if (compareStringsByBytes(x, myString)) {
            trueKey = "true";
            myString = "true";
        } else {
            trueKey = "false";
            myString = "false";
        }
    }

    function compareStringsByBytes
    (
        string memory s1,
        string memory s2
    ) 
    private pure 
        returns(bool)
    {
        return keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked(s2));
    }



}