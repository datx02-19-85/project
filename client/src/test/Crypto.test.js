import assert from 'assert'
import EthCrypto from 'eth-crypto'
import encryptVote from '../utils/EncryptVote'
import decryptVote from '../utils/DecryptVote'

let publicKey;
let privateKey;
let party;

beforeAll(() => {
    const contractKeys = EthCrypto.createIdentity();
    publicKey = contractKeys.publicKey;
    privateKey = contractKeys.privateKey;
    party = "Kalleanka partiet";
});

it('Should return true if encryption and decryption worked', async () => {
    const encryptedVote = await encryptVote(publicKey, party);
    const decryptedVote = await decryptVote(privateKey, encryptedVote);
    assert.strictEqual(party, decryptedVote, 'Encryption and decryption worked');
});