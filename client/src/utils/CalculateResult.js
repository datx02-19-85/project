import decryptVote from './DecryptVote';
import getVotes from './VoteCollector';

export default async function calculateResult(drizzle) {
  const votes = await getVotes(drizzle);
  const amountMap = new Map();
  const total = votes.length;

  const privateKey = localStorage.getItem('privateKey');

  const result = votes.map(function(vote) {
    return decryptVote(privateKey, vote);
  });

  for (let i = 0; i < total; i += 1) {
    const vote = result[i];
    let amount = 1;
    if (amountMap.has(vote)) {
      amount = amountMap.get(vote) + 1;
    }
    amountMap.set(vote, amount);
  }

  amountMap.forEach((amount, party) => {
    const procentage = (amount / total) * 100;
    amountMap.set(party, procentage);
  });

  return amountMap;
}
