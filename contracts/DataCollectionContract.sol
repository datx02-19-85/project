pragma solidity ^0.5.5;

/**
* This contract is only used to collecting test data
* Differences from Voting.sol is only removing modifiers
* and start and stop functions
*/

contract DataCollectionContract {

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
        uint makeVotes = 5;
        for (uint i = startValue; i < makeVotes + startValue; i++) {
            votesUsingInt[i].on = "o镨聥塲㊠宆窵ᬂ剰ᆧ⮇퇵慨䧀뿑⅁ᇼ뱿腪綢괒鮜㴁鲯倏䳧䛀栕閚鳃喓ꀧ緓潈꼞뾥㭱쵺永꒶쥇湃駐㍫﬐䇲혪扼煄캖�ᬾ";
            votesUsingInt[i].eligibleToVote = false;
        }
    }

    function vote(string memory id, string memory voteData)
    public
    {
        Vote memory userVote = votes[id];
        //require(userVote.eligibleToVote, "This ID already voted!");

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