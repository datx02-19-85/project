require("truffle-test-utils").init();

const Voting = artifacts.require("DataCollectionContract");
const MAX_DEPLOYED_BYTECODE_SIZE = 24576;

contract("DataCollectionContract", accounts => {
  let instance;
  const owner = accounts[0];

  beforeEach(async () => {
    instance = await Voting.deployed();
  });

  it("Creating alot of votes inside contract", async () => {
    await instance.createAlotOfVotes();
    assert(true);
  });
});
