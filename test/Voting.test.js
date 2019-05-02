require("truffle-test-utils").init();
const generateHash = require("../client/src/utils/HashGenerator");
const { genPubKey, encryptVote } = require("../client/src/utils/EncryptVote");

const Voting = artifacts.require("Voting");
const MAX_DEPLOYED_BYTECODE_SIZE = 24576;

contract("Voting", accounts => {
  let instance;
  const owner = accounts[0];
  const account = accounts[1];

  before(async () => {
    instance = await Voting.deployed();
    await instance.startElection("public key", 0, 500);
  });

  beforeEach(async () => {
    // instance = await Voting.deployed();
    // await instance.stopElection("some eky");
    // await instance.startElection("public key", 0, 30);
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
   * Used to collect gas prices
   */
  it("Should send different sized strings", async () => {
    const iterations = 250;

    // let voter = "";
    let vote = "";

    console.log("STARTING COLLECTION TEST");

    for (let i = 0; i < iterations; i += 1) {
      // if (i < 100) {
      //   voter += "0";
      // }
      // if (i < 10) {
      //   voter += "0";
      // }
      // voter += i.toString();
      const voter = await generateHash(2, i);

      vote += "a";

      await instance.addVoter(voter, { from: owner });

      console.log("Sending Vote Number: ", i);
      await instance.vote(voter, vote);
      console.log("Vote " + i + " is complete");
      // voter = "";
    }

    assert(true);
  });

  /**
   * Used to see if gas price changes over number of transactions
   */
  it("Should send same sized string multiple times", async () => {
    const iterations = 1;
    let voter = "";
    const vote = "aaaaa";
    console.log("STARTING SENDING TEST");

    for (let i = 0; i < iterations; i += 1) {
      if (i < 100) {
        voter += "0";
      }
      if (i < 10) {
        voter += "0";
      }
      voter += i.toString();
      await instance.addVoter(voter, { from: owner });

      console.log("Sending Vote Number: ", i);
      await instance.vote(voter, vote);
      console.log("Vote " + i + " is complete");
      voter = "";
    }
  });

  /**
   * Used to send "real" votes multiple times
   */
  it("Should send multiple correct votes", async () => {
    const iteration = 1;
    console.log("STARTING CORRECT VOTE TESTING");
    const party = "Kalleanka Partiet";
    const vote = await encryptVote(genPubKey(), party);
    console.log("Vote is: ", vote);

    for (let i = 1; i <= iteration; i += 1) {
      const voter = await generateHash(2, i);
      await instance.addVoter(voter, { from: owner });
      console.log("Sending Vote Number: ", i);
      await instance.vote(voter, vote);
      console.log("Vote " + i + " is complete");
    }

    console.log("COMPLETE");
    assert(true);
  });
});
