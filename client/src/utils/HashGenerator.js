import Hash from 'object-hash';

async function generateHash(electionNr, nVoters) {
  const seed = { nr: electionNr, prime1: 5381, nVoters, prime2: 2 };
  const hash = Hash(seed);
  return hash;
}

export default generateHash;
