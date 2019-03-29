import EthCrypto from 'eth-crypto'

/*
* @param Contract private-key, encrypted vote from contract
*/
async function decryptVote(privateKey, encryptedVote) {

    //Parse the string into an object again
    const encryptedVoteObject = EthCrypto.cipher.parse(encryptedVote)

    const decryptedVote = await EthCrypto.decryptWithPrivateKey(
        privateKey,
        encryptedVoteObject
    );

    return JSON.parse(decryptedVote);
}

export default decryptVote;