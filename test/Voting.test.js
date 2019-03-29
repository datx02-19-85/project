require("truffle-test-utils").init();

const Voting = artifacts.require("Voting");
const MAX_DEPLOYED_BYTECODE_SIZE = 24576;

contract("Voting", accounts => {
  let instance;
  const owner = accounts[0];
  const account = accounts[1];

  beforeEach(async () => {
    instance = await Voting.deployed();
  });

  it("Should add voter", async () => {
    const voter = "voter1";
    await instance.addVoter(voter, { from: owner });

    const ableToVote = await instance.isAbleToVote(voter);

    assert(ableToVote, "Voter should be able to vote");
  });

  it("Should not be able to Vote", async () => {
    const voter = "voter2";

    const ableToVote = await instance.isAbleToVote(voter);

    assert(!ableToVote, "Voter should not be able to vote");
  });
});
