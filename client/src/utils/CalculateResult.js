import decryptVote from './DecryptVote';
import getVotes from './VoteCollector';

export default async function calculateResult(drizzle) {
  const votes = await getVotes(drizzle);
  const total = votes.length;

  if (total === 0) {
    return null;
  }

  const amountMap = new Map();

  const privateKey = await drizzle.contracts.Voting.methods.privateKey().call();

  const promises = votes.map(function(vote) {
    if (vote !== '') {
      const decrypted = decryptVote(privateKey, vote);
      return decrypted;
    }
    return vote;
  });
  const result = await Promise.all(promises);

  let actualVotes = 0;
  for (let i = 0; i < total; i += 1) {
    const vote = result[i];
    if (vote !== '') {
      actualVotes += 1;
      let amount = 1;
      if (amountMap.has(vote)) {
        amount = amountMap.get(vote) + 1;
      }
      amountMap.set(vote, amount);
    }
  }

  amountMap.forEach((amount, party) => {
    const procentage = (amount / actualVotes) * 100;
    amountMap.set(party, procentage);
  });

  return amountMap;
}
