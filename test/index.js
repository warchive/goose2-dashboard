const io = require('socket.io')()
const readLine = require('readline')
const command = require('./commandTest')

const PORT = 8000

io.on('connection', client => {
  console.log('client connected')
  client.on('command', evt => console.log(evt))
})

io.on('command', evt => console.log(evt))
io.listen(PORT)

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', (input) => {
  command(input, io)
})
