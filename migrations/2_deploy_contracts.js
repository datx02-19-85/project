var Vote = artifacts.require("Vote");
var Voting = artifacts.require("Voting");

module.exports = function(deployer) {
    deployer.deploy(Vote);
    deployer.deploy(Voting);
}

