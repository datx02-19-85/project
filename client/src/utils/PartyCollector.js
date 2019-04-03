export default async function getParties(drizzle) {
  if (drizzle == null) return [];

  const contract = drizzle.contracts.PoliticalParties;
  const nParties = await contract.methods.getNumberOfParties().call();

  const promises = [];
  for (let i = 0; i < nParties; i += 1) {
    promises.push(contract.methods.parties(i).call());
  }

  return Promise.all(promises);
}
