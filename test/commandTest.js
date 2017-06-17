let intervalId = {}

/**
 * @param {String} input
 * @param {*} connection
 */
function command (input, connection) {
  // General command
  if (input.startsWith('!')) {
    let sections = input.split(' ')

    return connection.sendUTF(packet(sections[1], sections[2].toLowerCase() === 't'))
  }

  if (input.startsWith('@')) {
    let sections = input.split(' ')

    return connection.sendUTF(packet(sections[1], sections[2]))
  }

  if (input.startsWith('#')) {
    let sections = input.split(' ')

    return connection.sendUTF(packet(sections[1], Number(sections[2])))
  }

  if (input.startsWith('$')) {
    let sections = input.split(' ')
    let [, name, min, max, time] = sections

    clearInterval(intervalId[name])
    intervalId[name] = setInterval(() => connection.sendUTF(
      packet(name, Math.random() * (max - min) + min)),
      time
    )
    return
  }

  if (input.startsWith('%')) {
    let sections = input.split(' ')

    let [, name] = sections
    clearInterval(intervalId[name])
    return
  }

  switch (input) {
    case 'speed': {
      clearInterval(intervalId['speed'])
      intervalId['speed'] = setInterval(() => connection.sendUTF(
        packet('speed', Math.random() * 100)),
        200
      )
      return
    }
    case 'stop speed': {
      return clearInterval(intervalId['speed'])
    }
    case 'acceleration': {
      clearInterval(intervalId['acceleration'])
      intervalId['acceleration'] = setInterval(() => connection.sendUTF(
        packet('acceleration', Math.random() * 100)),
        200
      )
      return
    }
    case 'stop acceleration': {
      return clearInterval(intervalId['acceleration'])
    }
    default:
      console.log('command not defined')
  }
}

function packet (name, value) {
  return JSON.stringify({
    name,
    value})
}

module.exports = command
