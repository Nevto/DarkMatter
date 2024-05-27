import PubNub from 'pubnub';

const CHANNELS = {
  LIRIUM: 'LIRIUM',
  TRANSACTION: 'TRANSACTION',
};

export default class PubNubServer {
  constructor({ lirium, transactionPool, wallet, credentials }) {
    this.lirium = lirium;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.pubnub = new PubNub(credentials);
    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
    this.pubnub.addListener(this.listener());
  }

  broadcast() {
    this.publish({
      channel: CHANNELS.LIRIUM,
      message: JSON.stringify(this.lirium.chain),
    });
  };

  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(transaction),
    })
    this.publish({ channel: CHANNELS.TRANSACTION, message: "Transaction has been broadcasted"});
  };

  listener() {
    return {
      message: (msgObject) => {
        const { channel, message } = msgObject;
        const msg = JSON.parse(message);

        console.log(
          `Message has been recieved from: ${channel}, message: ${message}`
        );

        if (channel === CHANNELS.LIRIUM) {
          this.lirium.replaceChain(msg);
        } else if (channel === CHANNELS.TRANSACTION && !this.transactionPool.transactionExists({ address: this.wallet.publicKey })) {

            this.transactionPool.addTransaction(msg); //<<<<<<<<<<<<<<<<<<<<<<<<####################<<<<<<<<<<<<<<<<<<<<<<<<<<
        }
      },
    };
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}