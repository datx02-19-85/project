// Import your contracts and add them to contracs array.

import Voting from "./contracts/Voting.json"

const options = {
    web3: {
        block: false,
        fallback: {
            type: "ws",
            url: "ws://127.0.0.1:7545",
        },
    },
    contracts: [Voting]
};

export default options;