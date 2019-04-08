import EthCrypto from 'eth-crypto';

/*
 * @param Contract public-key, selected party
 * @return String
 */
async function encryptVote(publicKey, party) {
  console.log(publicKey);
  console.log(party);
  const encryptedObject = await EthCrypto.encryptWithPublicKey(
    publicKey,
    JSON.stringify(party)
  );

  // Convert the object into a smaller string
  const string = EthCrypto.cipher.stringify(encryptedObject);

  // Compress string to hex
  const compressed = EthCrypto.hex.compress(string);

  return compressed;
}

export default encryptVote;
