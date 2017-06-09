import { client as WebSocketClient } from 'websocket';

const defaultURL = 'ws://localhost:8080/';

/**
 * connection used to send/recieve messages from the server
 * @type {Connection}
 */
let socket;

let client;

/**
 * Establishes connection with socket
 * @param {String} url 
 */
export function connect(url = defaultURL){
  return new Promise( (resolve, reject) => {
    client = new WebSocketClient();
    client.on('connectFailed', (error) => 
      reject(error));
    
    client.on('connect', (connection) => {
      socket = connection;
      resolve();
    });

    client.on('message', socketDataHandler);

    client.connect(url, 'echo-protocol');
  })
}

/**
 * Handles incoming socket data
 * @param {Object} message 
 */
function socketDataHandler(message){
  
}

export function sendMessage(message){
  if(!socket){
    throw new Error("socket hasn't been established yet");
  }
  if(!socket.connected){
    throw new Error("socket not connected yet");
  }

  client.sendUTF(message); 
}

export function sendJSON (obj){
  let message = JSON.stringify(obj);
  sendMessage(message);
}
