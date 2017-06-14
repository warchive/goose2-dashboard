const WebSocketServer = require('websocket').server
const express = require('express')
const path = require('path')
const http = require('http')

const PORT = 8080

const app = express()
app.use(express.static(path.join(__dirname, '..', 'dist'))); // eslint-disable-line

let server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server opened up on port ${PORT}`)
})

let wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
})

wsServer.on('request', (req) => {
  let connection = req.accept('echo-protocol', req.origin)

  console.log('Client connected')

  connection.on('message', (message) => {
    console.log(message)
    connection.sendUTF(JSON.stringify({name: 'start', value: true}))
  })
})
