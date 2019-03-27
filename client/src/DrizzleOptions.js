// Import your contracts and add them to contracs array.

import VoteShowingResult from "./contracts/VoteShowingResult.json"

const options = {
    web3: {
        block: false,
        fallback: {
            type: "ws",
            url: "ws://127.0.0.1:7545",
        },
    },
    contracts: [VoteShowingResult]
};

export default options;