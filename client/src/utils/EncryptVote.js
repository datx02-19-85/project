import EthCrypto from 'eth-crypto';

/*
 * @param Contract public-key, selected party
 * @return String
 */
async function encryptVote(publicKey, party) {
  const encryptedVoteObject = await EthCrypto.encryptWithPublicKey(
    publicKey,
    JSON.stringify(party)
  );

  // Convert the object into a smaller string-representation
  return EthCrypto.cipher.stringify(encryptedVoteObject);
}

export default encryptVote;
