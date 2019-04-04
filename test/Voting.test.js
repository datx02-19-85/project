require("truffle-test-utils").init();

const Voting = artifacts.require("Voting");
const MAX_DEPLOYED_BYTECODE_SIZE = 24576;

contract("Voting", accounts => {
  let instance;
  const owner = accounts[0];
  const account = accounts[1];

  before(async () => {
    // instance = await Voting.deployed();
    // await instance.startElection("public key", 1500, 50);
  });

  beforeEach(async () => {
    instance = await Voting.deployed();
    await instance.stopElection("some eky");
    await instance.startElection("public key", 0, 30);
  });

  it("Should add voter", async () => {
    const voter = "voter1";
    await instance.addVoter(voter, { from: owner });

    const ableToVote = await instance.isAbleToVote(voter);

    assert(ableToVote, "Voter should be able to vote");
  });

  it("Should not add voter", async () => {
    try {
      await instance.addVoter("a_voter", { from: account });
      assert(false, "Sender should not be able to add voter");
    } catch (error) {
      assert(true);
    }
  });

  it("Should not be able to Vote", async () => {
    const voter = "voter2";

    const ableToVote = await instance.isAbleToVote(voter);

    assert(!ableToVote, "Voter should not be able to vote");
  });

  it("Should vote", async () => {
    const voter = "voter3";
    await instance.addVoter(voter, { from: owner });

    await instance.vote(voter, "test");

    // Check if it went through
    const ableToVote = await instance.isAbleToVote(voter);
    assert(!ableToVote, "Voter should not be able to vote again");
  });

  it("Should not be able to vote twice", async () => {
    const voter = "voter4";
    await instance.addVoter(voter, { from: owner });

    await instance.vote(voter, "test");

    try {
      await instance.vote(voter, "test again");
    } catch (error) {
      assert(true, "Voter should not be able to vote twice");
    }
  });

  it("Should get numbers of voters", async () => {
    const voter = "voter5";
    await instance.addVoter(voter, { from: owner });

    const nVoters = await instance.getNumberOfVoters();
    assert(nVoters > 0, "There should be atleast 1 voter");
  });

  /**
   * This test is used to simulate a large amount of votes.
   * Change nVotes to an arbitrary number, however more then 2000
   * will make the test unstable.
   */
  it("Make big amount of votes", async () => {
    const nVotes = 3;

    const allPromises = [];
    for (let i = 0; i < nVotes; i++) {
      const voter = `__Voter__${i}`;
      allPromises.push(
        instance
          .addVoter(voter, { from: owner })
          .then(instance.vote(voter, "test_vote"))
      );
    }

    await Promise.all(allPromises);
    const nVoter = await instance.getNumberOfVoters();

    assert(
      nVoter >= nVotes,
      "Number of votes should be bigger or equals number of voters"
    );
  });

  /**
   * This test is not used correctly if this comment is present.
   * endingTime variable in contract is not used.
   */
  it("Should get time left of voting", async () => {
    const timeLeft = await instance.getTimeLeft();
    console.log("Time left is: ", timeLeft);

    assert(timeLeft, "Time left should not be undefined");
  });

  /**
   * See comment for test above
   */
  it("Should get 0 because time passed voting time", async () => {
    const response = await instance.getTimeLeft();
    // Im not sure why we get an object as result.
    // I guess its something about using js testing.
    const timeLeft = response.words[0];
    console.log("timeleft is ", timeLeft);

    assert(timeLeft > 0, "timeLeft should be more then 0");
  });
});
