import PubNub from 'pubnub';

const CHANNELS = {
  LIRIUM: 'LIRIUM',
};

export default class PubNubServer {
  constructor({ blockchain, credentials }) {
    this.blockchain = blockchain;

    this.pubnub = new PubNub(credentials);
    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
    this.pubnub.addListener(this.listener());
  }

  broadcast() {
    this.publish({
      channel: CHANNELS.LIRIUM,
      message: JSON.stringify(this.blockchain.chain),
    });
  }

  listener() {
    return {
      message: (msgObject) => {
        const { channel, message } = msgObject;
        const msg = JSON.parse(message);

        console.log(
          `Message has been recieved from: ${channel}, message: ${message}`
        );

        if (channel === CHANNELS.LIRIUM) {
          this.blockchain.replaceChain(msg);
        }
      },
    };
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}