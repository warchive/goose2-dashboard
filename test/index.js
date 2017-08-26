const io = require('socket.io')()
const readLine = require('readline')
const command = require('./commandTest')

const PORT = 8000

io.on('connection', client => {
  console.log('client connected')
  client.on('control', evt => {
    console.log(evt)
    client.emit('command_received', JSON.stringify({
      received: JSON.parse(evt)
    }))
  })
})

io.listen(PORT)

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', (input) => {
  command(input, io)
})
