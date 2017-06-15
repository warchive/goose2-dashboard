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

  switch (input) {
    case 'speed': {
      intervalId['speed'] = setInterval(() => connection.sendUTF(
        packet('speed', Math.random() * 100)),
        200
      )
      return
    }
    case 'stop speed': {
      return clearInterval(intervalId['sp'])
    }
    case 'start': {
      return connection.sendUTF(packet('start', true))
    }

    case 'stop start': {
      return connection.sendUTF(packet('start', false))
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
