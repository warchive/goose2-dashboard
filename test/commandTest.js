let intervalId = {}

/**
 * @param {String} input
 * @param {*} connection
 */
function command (input, io) {
  // General command
  if (input.startsWith('!')) {
    let sections = input.split(' ')

    return io.emit('command_received', JSON.stringify({
      time: Date.now(),
      received: {
        cmd: sections[1],
        val: [
          sections[2].toLowerCase() == 't'? 1 : 0
        ]
      }
    }))
  }

  if (input.startsWith('@')) {
    let sections = input.split(' ')

    return io.emit('pi', packet(sections[1], sections[2]))
  }

  if (input.startsWith('#')) {
    let sections = input.split(' ')

    return io.emit('pi', packet(sections[1], Number(sections[2])))
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

  if(input.startsWith('^')){
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
        Array(Number(dim)).fill(0).map(() => Math.random() * (max - min) + min) ))
      , time)
  }
  if (input.startsWith('%')) {
    let sections = input.split(' ')

    let [, name] = sections
    clearInterval(intervalId[name])
  }
}

const startTime = Date.now()

function packet (name, value) {
  let json = JSON.stringify({
    time: Date.now() - startTime,
    sensor: name,
    data: value})
  return json
}

module.exports = command
