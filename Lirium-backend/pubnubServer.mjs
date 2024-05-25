import PubNub from 'pubnub';

const CHANNELS = {
  LIRIUM: 'LIRIUM',
  FRIENDNODES: 'FRIENDNODES',
};

export default class PubNubServer {
  constructor({ lirium, credentials }) {
    this.lirium = lirium;

    this.pubnub = new PubNub(credentials);
    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
    this.pubnub.addListener(this.listener());

    this.requestChain();
  }

  broadcast() {
    this.publish({
      channel: CHANNELS.LIRIUM,
      message: JSON.stringify(this.lirium.chain),
    });
  }

  requestChain() {
    this.publish({
      channel: CHANNELS.FRIENDNODES,
      message: JSON.stringify({ type: 'REQUEST_CHAIN' }),
    });
  }

  listener() {
    return {
      message: (msgObject) => {
        const { channel, message } = msgObject;
        const msg = JSON.parse(message);

        console.log(`Message has been received from: ${channel}, message: ${message}`);

        if (channel === CHANNELS.LIRIUM) {
          if (msg.length > this.lirium.chain.length) {
            this.lirium.replaceChain(msg);
          }
        } else if (channel === CHANNELS.FRIENDNODES) {
          this.handleFriendNodesMessage(msg);
        }
      },
    };
  }

  handleFriendNodesMessage(msg) {
    if (msg.type === 'REQUEST_CHAIN') {
      this.publish({
        channel: CHANNELS.FRIENDNODES,
        message: JSON.stringify({
          type: 'CHAIN_RESPONSE',
          chain: this.lirium.chain,
        }),
      });
    } else if (msg.type === 'CHAIN_RESPONSE') {
      this.lirium.replaceChain(msg.chain);
    }
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}
