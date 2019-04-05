var Vote = artifacts.require("Vote");
var Voting = artifacts.require("Voting");
var PoliticalParties = artifacts.require("PoliticalParties");
var DataCollectionContract = artifacts.require("DataCollectionContract");

module.exports = function(deployer) {
  deployer.deploy(Vote);
  deployer.deploy(Voting);
  deployer.deploy(PoliticalParties);
  deployer.deploy(DataCollectionContract);
};
