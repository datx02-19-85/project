export default async function getVotes(drizzle) {
  if (drizzle == null) return [];

  const contract = drizzle.contracts.Voting;
  const nVotes = await contract.methods.getNumberOfVotes().call();

  const promises = [];
  for (let i = 0; i < nVotes; i += 1) {
    promises.push(contract.methods.getVote(i).call());
  }

  return Promise.all(promises);
}
