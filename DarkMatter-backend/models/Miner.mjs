import { broadcastAndClearTransactions, validateAndRewardTransactions } from '../utilities/miner-utils.mjs';
import Transaction from './Transaction.mjs';


export default class Miner {
    constructor({ darkMatter, wallet, transactionPool, pubnubServer }) {
        this.darkMatter = darkMatter;
        this.wallet = wallet;
        this.transactionPool = transactionPool;
        this.pubnubServer = pubnubServer;
    }

    mineTransaction() {
        try {
            const validTransactions = validateAndRewardTransactions({
                transactionPool: this.transactionPool,
                wallet: this.wallet
            });

            this.darkMatter.addBlock({ data: validTransactions });

            broadcastAndClearTransactions({
                pubnubServer: this.pubnubServer,
                transactionPool: this.transactionPool
            });

            console.log('Mining completed successfully');
        } catch (error) {
            console.error('Error during mining:', error);
        }
    }
}
