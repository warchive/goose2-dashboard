let intervalId = {}

/**
 * @param {String} input
 * @param {*} connection
 */

let FullDataFormat = {
  imu: [
    [-1, 1],
    [-22, 11],
    [-1, 1],
    [-1, 1],
    [-22, 11],
    [-1, 1],
    [-1, 1],
    [-1, 1],
    [-1, 1]
  ],
  battery: [
    [0, 60],
    [5, 5.5],
    [0.4, 2.4],
    [0, 60],
    [24, 30],
    [0, 160],
    [0, 60],
    [47, 54.5],
    [0, 25]
  ],
  mag: [
    [0, 100],
    [0, 100],
    [0, 7500],
    [0, 7500],
    [0, 7500],
    [0, 7500]
  ],
  photo: [
    [20, 80],
    [20, 80],
    [-10, 10]
  ],
  pressure: [
    [0, 100],
    [0, 150],
    [150, 4520]
  ],
  color: [
    [0, 1600]
  ],
  reed: [
    [0, 1]
  ]
}

function generateSinusoidalValue(min, max, progress, wiggle) {
  return Math.sin((Date.now() / 1000)) * ((max - min) / 2) + ((max + min) / 2) +
    (Math.random() > 0.5 ? -1 : 1) * Math.random() * (wiggle / 100) * (max - min)
}


function command(input, io) {
  if (input.startsWith('begin-full-test')) {
    let interval = input.split(' ')[1]
    let wiggle = input.split(' ')[2] | 0
    clearInterval(intervalId['full-test'])

    setInterval(() => {
      let data = {}

      Object.keys(FullDataFormat).forEach(v => {
        data[v] = FullDataFormat[v].map(([min, max]) =>
          generateSinusoidalValue(min, max, Date.now() / 1000, wiggle))
      })

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
