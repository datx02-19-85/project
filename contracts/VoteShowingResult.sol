pragma solidity ^0.5.5;

contract VoteShowingResult {

    mapping(string => address[]) private result;
    mapping(address => uint) public voters;
    string[] public parties;

    // constructor(bytes32[] memory parties) public {
        // We want to be able to make this type of constructor to work BUT
        // using bytes32[] will require us to pass a certain type of data 
        // when migrating
        // See: https://ethereum.stackexchange.com/questions/43751/does-solidity-support-passing-an-array-of-strings-to-a-contracts-constructor-ye
    // }

    constructor()
    public 
    {
        parties.push("Moderaterna");
        parties.push("Socialdemokraterna");
        parties.push("Kalleanka partiet");
    }

    modifier eligibleToVote {
        require(!didVote());
        _;
    }

    function vote(string memory party)
    public eligibleToVote
    {
        require(partyExists(party), "Party is not in this vote");

        voters[msg.sender] = 1;
        result[party].push(msg.sender);
    }

    function didVote()
    public view
    returns (bool)
    {
        return (voters[msg.sender] == 1);
    }

    function partyExists(string memory party)
    public view
    returns (bool)
    {
        for (uint i = 0; i < parties.length; i++) {
            if (compareStringsByBytes(parties[i], party)) {
                return true;
            }
        }
        return false;
    }

    function votesOnParty(string memory party)
    public view
    returns (uint)
    {
        require(partyExists(party), "Party is not in this vote");

        uint votesOnGivenParty = result[party].length;
        return votesOnGivenParty;
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