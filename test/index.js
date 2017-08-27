const io = require('socket.io')()
const readLine = require('readline')
const command = require('./commandTest')

const PORT = 8000

let podState = {
  mag: 0,
  drive: 0,
  drop: false,
  dpr: false,
  bv: false,
  brake: false,
  batt48: false,
  batt24: false,
  state: 0
}

io.on('connection', client => {
  client.on('control', evt => {
    let parsed = JSON.parse(evt)

    let {
      cmd,
      val
    } = parsed

    if (cmd === 'emg') { podState.state = 6 } else if (cmd === 'brk') { podState.brake = Boolean(val[0]) } else if (cmd === 'battery24') { podState.batt24 = Boolean(val[0]) } else if (cmd === 'battery48') { podState.batt48 = Boolean(val[0]) } else if (cmd === 'spddrive') { podState.drive = val[0] } else if (cmd === 'bv') { podState.bv = Boolean(val[0]) } else if (cmd === 'spdmag') { podState.mag = val[0] } else if (cmd === 'state') { podState.state = val[0] } else if (cmd === 'dpr') { podState.dpr = Boolean(val[0]) }
  })

  setInterval(() => {
    client.emit('state', JSON.stringify({
      time: Date.now(),
      type: 'state',
      data: {
        mag: [podState.mag],
        drive: [podState.drive],
        drop: [Number(podState.drop)],
        dpr: [Number(podState.dpr)],
        bv: [Number(podState.bv)],
        brake: [Number(podState.brake)],
        batt48: [Number(podState.batt48)],
        batt24: [Number(podState.batt24)],
        state: [Number(podState.state)]
      }
    }))
  }, 100)
})

io.listen(PORT)

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', (input) => {
  command(input, io)
})
