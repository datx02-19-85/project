import EthCrypto from 'eth-crypto';

async function checkCryptoKeyPair(publicKey, privateKey) {
  let recoveredPublicKey;
  try {
    recoveredPublicKey = await EthCrypto.publicKeyByPrivateKey(privateKey);
  } catch (error) {
    return false;
  }
  return recoveredPublicKey === publicKey;
}

export default checkCryptoKeyPair;
