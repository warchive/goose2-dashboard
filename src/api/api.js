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
export function connect (
  onopen, onmessage, onerror, onclose, url = defaultURL) {
  if (PROMPT_FOR_URL) {
    url = window.prompt('Please input the server url', url)
  }

  console.log(SocketIO)

  client = SocketIO(url)
  client.on('connect', onopen)
  client.on('pi', onmessage)
  client.on('disconnect', onclose)
  // client.onerror = onerror
  // client.onclose = onclose
  // client.onmessage = onmessage
  // client.onopen = onopen
}

export function sendMessage (message) {
  if (!client) {
    throw new Error("socket hasn't been established yet")
  }
  if (client.readyState !== client.OPEN) {
    throw new Error('socket not connected yet')
  }

  client.emit('command', message)
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
