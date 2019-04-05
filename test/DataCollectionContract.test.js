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
    const loops = 5;
    for (let i = 0; i < loops; i++) {
      await instance.createAlotOfVotes(i * 5);
    }
    assert(true);
  });

  it("Perform real vote", async () => {
    const vote =
      "o镨聥塲㊠宆窵ᬂ剰ᆧ⮇퇵慨䧀뿑⅁ᇼ뱿腪綢괒鮜㴁鲯倏䳧䛀栕閚鳃喓ꀧ緓潈꼞뾥㭱쵺永꒶쥇湃駐㍫﬐䇲혪扼煄캖�ᬾ";
    const voterId =
      "03f89f2a078f3c277a904ca6c2c78d127e267b4709e32a848b3caa5ff9a14f93";

    try {
      await instance.vote(voterId, vote);
      assert(true);
    } catch (error) {
      console.log(error);
      assert(false, "This should now happen");
    }
  });

  it("Try to add voter", async () => {
    const vote =
      "o镨聥塲㊠宆窵ᬂ剰ᆧ⮇퇵慨䧀뿑⅁ᇼ뱿腪綢괒鮜㴁鲯倏䳧䛀栕閚鳃喓ꀧ緓潈꼞뾥㭱쵺永꒶쥇湃駐㍫﬐䇲혪扼煄캖�ᬾ";
    const voterId =
      "03f89f2a078f3c277a904ca6c2c78d127e267b4709e32a848b3caa5ff9a14f93";

    try {
      await instance.addVoter(voterId);
      assert(true);
    } catch (error) {
      assert(false, error);
    }
  });

  it("Try to fill the contract", async () => {
    const loops = 1;

    const promises = [];
    for (let i = 0; i < loops; i++) {
      promises.push(instance.createAlotOfVotes(i * 5));
    }

    return Promise.all(promises).then(result => {
      assert(true);
    });
  });
});
