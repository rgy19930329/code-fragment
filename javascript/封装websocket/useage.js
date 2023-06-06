const socket = new Socket({
  wsUrl: '/xxxx',
  // socketHeader: {}，
  servers: [
    {
      topic: '/topic/xxx',
      onMessage: (response) => {
        // todo
      },
    },
  ],
  onConnectSuccess: () => {
    console.log('websocket 连接成功');
  },
  onConnectError: () => {
    console.log('websocket 连接成功');
  },
});
