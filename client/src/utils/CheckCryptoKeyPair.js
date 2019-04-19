import EthCrypto from 'eth-crypto';

async function checkCryptoKeyPair(publicKey, privateKey) {
  let recoveredPublicKey;
  try {
    recoveredPublicKey = await EthCrypto.publicKeyByPrivateKey(privateKey);
    console.log('Recovered: ', recoveredPublicKey);
    console.log('Actual:    ', publicKey);
  } catch (error) {
    return false;
  }
  return recoveredPublicKey === publicKey;
}

export default checkCryptoKeyPair;
