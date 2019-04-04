import EthCrypto from 'eth-crypto';

/*
 * @param Contract private-key, encrypted vote from contract
 * @return String
 */
async function decryptVote(privateKey, encryptedVote) {
  // Decompress hex string
  const decompressed = EthCrypto.hex.decompress(encryptedVote, true);

  // Trim hex string: remove 0x
  const trimmed = decompressed.substring(2, decompressed.length);

  // Parse the string into an object again
  const encryptedObject = EthCrypto.cipher.parse(trimmed);

  const decryptedVote = await EthCrypto.decryptWithPrivateKey(
    privateKey,
    encryptedObject
  );

  return JSON.parse(decryptedVote);
}

export default decryptVote;
