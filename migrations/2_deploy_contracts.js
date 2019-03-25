var Vote = artifacts.require("Vote");
var VoteShowing = artifacts.require("VoteShowingResult");

module.exports = function(deployer) {
    deployer.deploy(Vote);
    deployer.deploy(VoteShowing);
}

