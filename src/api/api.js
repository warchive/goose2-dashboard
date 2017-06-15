import { w3cwebsocket as SocketClient } from 'websocket'
import {URL as defaultURL} from '../../config'

/**
 * connection used to send/recieve messages from the server
 * @type {Connection}
 */

let client

/**
 * Establishes connection with socket
 * @param {String} url
 */
export function connect (
  onopen, onmessage, onerror, onclose, url = defaultURL) {
  client = new SocketClient(url, 'echo-protocol')
  client.onerror = onerror
  client.onclose = onclose
  client.onmessage = onmessage
  client.onopen = onopen
}

export function sendMessage (message) {
  if (!client) {
    throw new Error("socket hasn't been established yet")
  }
  if (client.readyState !== client.OPEN) {
    throw new Error('socket not connected yet')
  }

  client.send(message)
}

export function sendJSON (obj) {
  let message = JSON.stringify(obj)
  sendMessage(message)
}

export function sendCommand (command, value) {
  sendJSON({
    command,
    value
  })
}
