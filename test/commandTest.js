let intervalId = {}

/**
 * @param {String} input
 * @param {*} connection
 */

let FullDataFormat = {
  imu: [
    [0, 100],
    [0, 100],
    [0, 100],
    [0, 100],
    [0, 100],
    [0, 100],
    [0, 100],
    [0, 100],
    [0, 100],
  ],
  battery: [
    [0, 100],
    [0, 100],
    [0, 100],
    [0, 100],
    [0, 100],
    [0, 100],
    [0, 100],
    [0, 100],
    [0, 100]
  ],
  mag: [
    [0, 100],
    [0, 100],
    [0, 100],
    [0, 100],
    [0, 100],
    [0, 100]
  ],
  photo: [
    [0, 100],
    [0, 100],
    [0, 100]
  ],
  pressure: [
    [0, 100],
    [0, 100],
    [0, 100]
  ],
  color: [
    [0, 100]
  ],
  reed: [
    [0, 1]
  ]
}

function command(input, io) {
  if (input.startsWith('begin-full-test')) {
    let interval = input.split(' ')[1]

    clearInterval(intervalId['full-test'])

    setInterval(() => {
      let data = {}

      Object.keys(FullDataFormat).forEach(v => {
        data[v] = FullDataFormat[v].map(([min, max]) =>
          Math.sin((Date.now() / 1000)) * ((max - min) / 2) + ((max - min) / 2))
      })

      console.log(data)

      io.emit('sensor', JSON.stringify({
        type: 'sensor',
        time: Date.now(),
        data
      }))
    }, interval)
  }

  // General command
  if (input.startsWith('!')) {
    let sections = input.split(' ')
    console.log('command sent')
    return io.emit('command_received', JSON.stringify({
      time: Date.now(),
      received: {
        cmd: sections[1],
        val: [
          sections[2].toLowerCase() === 't' ? 1 : 0
        ]
      }
    }))
  }

  if (input.startsWith('@')) {
    return io.emit('message', JSON.stringify({
      time: Date.now() - startTime,
      message: input.substring(2, input.length)
    }))
  }

  if (input.startsWith('#')) {
    let sections = input.split(' ')

    return io.emit('sensor', packet(sections[1], [Number(sections[2])]))
  }

  if (input.startsWith('$')) {
    let sections = input.split(' ')
    let [, name, min, max, time] = sections

    clearInterval(intervalId[name])
    intervalId[name] = setInterval(() => io.emit('sensor',
        packet(name, [Math.random() * (max - min) + min])),
      time
    )
    return
  }

  if (input.startsWith('^')) {
    let sections = input.split(' ')
    let [, name, dim, min, max, time] = sections

    dim = Number(dim)
    min = Number(min)
    max = Number(max)
    time = Number(time)

    clearInterval(intervalId[name])
    intervalId[name] = setInterval(() => io.emit('sensor',
      packet(
        name,
        Array(Number(dim)).fill(0).map(() => Math.random() * (max - min) + min))), time)
  }

  if (input.startsWith('&')) {
    let sections = input.split(' ')
    let [, name, dim, min, max, time] = sections

    dim = Number(dim)
    min = Number(min)
    max = Number(max)
    time = Number(time)

    clearInterval(intervalId[name])
    intervalId[name] = setInterval(() => io.emit('sensor',
      packet(
        name,
        Array(Number(dim)).fill(0).map(() => Math.sin((Date.now() / 1000)) * ((max - min) / 2) + ((max - min) / 2)), time)), time)
  }

  if (input.startsWith('%')) {
    let sections = input.split(' ')

    let [, name] = sections
    clearInterval(intervalId[name])
  }
}

const startTime = Date.now()

function packet(name, value) {
  let json = JSON.stringify({
    time: (Date.now() - startTime) / 1000,
    sensor: name,
    data: value
  })
  return json
}

module.exports = command
