import {URL as defaultURL, PROMPT_FOR_URL} from '../../config'
const SocketIO = require('socket.io-client')

/**
 * connection used to send/recieve messages from the server
 * @type {Connection}
 */
let client

/**
 * Establishes connection with socket
 * @param {String} url
 */
export function connect (listeners, onopen, onerror,
  onclose, url = defaultURL) {
  if (PROMPT_FOR_URL) {
    url = window.prompt('Please input the server url', url)
  }

  client = SocketIO(url)
  client.on('connect', onopen)
  client.on('disconnect', onclose)

  Object.keys(listeners).forEach(v => client.on(v, listeners[v]))
}

export function sendMessage (message) {
  if (!client) {
    throw new Error("socket hasn't been established yet")
  }
  if (client.readyState !== client.OPEN) {
    throw new Error('socket not connected yet')
  }

  client.emit('control', message)
}

export function sendJSON (obj) {
  let message = JSON.stringify(obj)
  sendMessage(message)
}

export function sendCommand (cmd, val) {
  sendJSON({
    cmd,
    val
  })
}
