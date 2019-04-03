pragma solidity ^0.5.5;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Vote.sol";

contract TestVote {
    // The address of the vote contract to be tested
    Vote vote = Vote(DeployedAddresses.Vote());

    function testDoVote()
    public
    {
        uint returnedVote = vote.doVote();

        Assert.equal(returnedVote, 1,
        "Vote value should be 1");
    }

    // This is a template test of how to catch exceptions in tests
    function testThrowFunctions() public {
        bool r;

        // We're basically calling our contract externally with a raw call, forwarding all available gas, with 
        // msg.data equal to the throwing function selector that we want to be sure throws and using only the boolean
        // value associated with the message call's success
        (r, ) = address(this).call(abi.encodePacked(this.IThrow1.selector));
        Assert.isFalse(r, "If this is true, something is broken!");

        (r, ) = address(this).call(abi.encodePacked(this.IThrow2.selector));
        Assert.isFalse(r, "What?! 1 is equal to 10?");
    }

    function IThrow1() public pure {
        revert("I will throw");
    }

    function IThrow2() public pure {
        require(1 == 10, "I will throw, too!");
    }
}