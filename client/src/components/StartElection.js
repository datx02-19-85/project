export default async function startElection(drizzle, drizzleState) {
    if (drizzle == null) return false;
  
    const contract = drizzle.contracts.Voting;
    const { accounts } = drizzleState;
  
    try {
      await contract.methods.stopElection('').send({ from: accounts[0] });
      await contract.methods
        .startElection('public key', 0, 500)
        .send({ from: accounts[0] });
  
      return true;
    } catch (error) {
        console.log("What is wrong? -> ", error)
      return false;
    }
  }