import {URL as defaultURL, PROMPT_FOR_URL} from '../../config'
import {BroadcastListener} from './api/Listener.js'
import * as Actions from '../store/Actions'
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
  var pingReceived = true
  console.log(SocketIO)
  setInterval(200, sendPing)
  client = SocketIO(url)
  client.on('connect', onopen)
  client.on('pi', onmessage)
  client.on('disconnect', onclose)
  client.on('ping', receivePing)
  // client.onerror = onerror
  // client.onclose = onclose
  // client.onmessage = onmessage
  // client.onopen = onopen
}

export function sendPing(){
  if(pingReceived){
    client.emit('ping', {timeSent: Date.now()})
    pingReceived = false;
  }
}
export function receivePing(data){
    var latency = Date.now - data.timeSent
    dispatchEvent({type: Actions.UPDATE_CONNECTION_LATENCY, data: latency})
    pingReceived = true;
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
