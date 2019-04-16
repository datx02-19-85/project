export default async function isElectionRunning(drizzle) {
  return drizzle.contracts.Voting.methods.electionIsRunning().call();
}
