// import decryptVote from './DecryptVote';
import getVotes from './VoteCollector';

export default async function calculateResult(drizzle) {
  const votes = await getVotes(drizzle);
  const amountMap = new Map();
  const total = votes.length;

  const privateKey = await drizzle.contracts.Voting.methods.privateKey().call();
  console.log('Key is: ', privateKey);

  const result = votes.map(function(vote) {
    if (vote !== '') {
      console.log('Private key in map is: ', privateKey);
      console.log('Vote in map is: ', vote);
      // return decryptVote(privateKey, vote);
    }
    return vote;
  });

  for (let i = 0; i < total; i += 1) {
    const vote = result[i];
    if (vote !== '') {
      let amount = 1;
      if (amountMap.has(vote)) {
        amount = amountMap.get(vote) + 1;
      }
      amountMap.set(vote, amount);
    }
  }

  amountMap.forEach((amount, party) => {
    const procentage = (amount / total) * 100;
    amountMap.set(party, procentage);
  });

  return amountMap;
}
