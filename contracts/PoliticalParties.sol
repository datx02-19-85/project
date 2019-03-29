pragma solidity ^0.5.5;

contract PoliticalParties {

    string[] public parties;

    constructor () public {
        
        parties.push("Moderaterna");
        parties.push("Socialdemokraterna");
        parties.push("Kalleanka partiet");

    }

    // constructor(bytes32[] memory parties) public {
        // We want to be able to make this type of constructor to work BUT
        // using bytes32[] will require us to pass a certain type of data 
        // when migrating
        // See: https://ethereum.stackexchange.com/questions/43751/does-solidity-support-passing-an-array-of-strings-to-a-contracts-constructor-ye
    // }

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

    function getNumberOfParties()
    public view
    returns (uint)
    {
        return parties.length;
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