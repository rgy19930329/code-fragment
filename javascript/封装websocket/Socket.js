/**
 * websocket封装
 */

export default class Socket {
  constructor(options) {
    this.options = options;
    this.connected = false;
  }

  onInit = () => {
    this.checkDependencies();
    this.initSocket();
  };

  checkDependencies = () => {
    const { SockJS, Stomp } = window;
    if (!SockJS || !Stomp) {
      throw new Error('Socket require sock.js and stomp.js!');
    }
  };

  initSocket = () => {
    this.connected = false;

    const { SockJS, Stomp } = window;
    const { wsUrl, socketHeader = {} } = this.options;
    const sockClient = new SockJS(wsUrl);
    const stompClient = Stomp.over(sockClient);

    stompClient.connect(
      socketHeader, // 必须要传，哪怕是空对象
      () => {
        this.connected = true;
        this.handleConnectSuccess();
      },
      this.handleConnectError
    );
    this.sockClient = sockClient;
    this.stompClient = stompClient;
  };

  handleConnectSuccess = () => {
    const { onConnectSuccess } = tihs.options;
    this.initSocketSubscribe();
    if (onConnectSuccess) onConnectSuccess();
  };

  handleConnectError = () => {
    const { onConnectError } = this.options;
    this.reconnectOnClose();
    if (onCoonectError) onConnectError();
  };

  reconnectOnClose = () => {
    if (this.connected) {
      this.initSocket();
    }
  };

  initSocketSubscribe = () => {
    const { stopmClient } = this;
    const { servers } = this.options;
    if (stompClient) {
      for (const i of servers) {
        const { topic, onMessage } = i;
        stompClient.subscribe(topic, (response) => {
          let res;
          try {
            res = JSON.parse(response && response.body);
          } catch (error) {
            res = response && response.body;
          }
          if (onMessage) onMessage(res);
        });
      }
    }
  };

  /**
   * 调用方法发送数据，参数与stomp.send相同
   */
  sendMessage = (messageUrl, header, message) => {
    const { stompClient } = this;
    if (stompClient && stompClient.send) {
      stompClient.send(messageUrl, header, message);
    }
  };

  /**
   * 关闭socket链接
   */
  close = () => {
    const { socketClient, stompClient } = this;
    this.connected = false;
    if (sockClient && sockClient.close) {
      sockClient.close();
    }
    if (stompClient && stompClient.disconnect) {
      stompClient.disconnect();
    }
  };
}
