export default async function startElection(drizzle) {
  if (drizzle == null) return false;

  const contract = drizzle.contracts.Voting;
  const { accounts } = drizzle;

  try {
    await contract.methods.stopElection('').send({ from: accounts[0] });
    await contract.methods
      .startElection('public key', 0, 500)
      .send({ from: accounts[0] });

    return true;
  } catch (error) {
    return false;
  }
}
