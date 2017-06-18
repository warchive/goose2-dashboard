const io = require('socket.io')()
const readLine = require('readline')
const command = require('./commandTest')

const PORT = 8080

io.on('connection', client => {
  console.log('client connected')
})

io.listen(PORT)

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', (input) => {
  command(input, io)
})
