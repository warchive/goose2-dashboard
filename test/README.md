# Testing the client

You can use the included test server (index.js) to test the client

## Easy to set up:

* Install all dependencies on the parent folder ```yarn install```
* Run the test server on console ```npm run testServer```

## How to use

### Commands are displayed on the screen

Any commands the the client sends to the server will be printed on the screen. For example, if you presss the start button, you should see:

```js
// Start command
{ type: 'utf8', utf8Data: '{"Command":"start","value":true}' }

// Acceleration command
{ type: 'utf8',
  utf8Data: '{"Command":"acceleration","value":46}' }
```

### Broadcasts can be sent to the client

There are 2 types of broadcasts:

* General broadcasts that look like ```[type] name [args ...]```
* ~~Specific test broadcasts that look like ```command```~~ **no implementation yet**

These broadcast commands are typed into the console where the node server is runing

#### General broadcasts

Type is the value type, these are represented by 3 characters

* ! - Boolean
* @ - String
* \# - Number
* $ - _special_ Generates random values
* % - _special_ Stop generating special values

Some example broadcasts and what they yield:

```JSON
// ! start t
{
  "sensor": "start",
  "time": 132,
  "data": [true]
}

// ! start f
{
  "sensor": "start",
  "time": 1235
  "data": [false]
}

// String broadcasts aren't really useful right now

// # speed 50
{
  "sensor": "speed",
  "time": 21352,
  "data": [50]
}
```

#### Special General Broadcasts

You can also tell the server to continuously sending random data

The $ command takes in 3 arguments: ```$ <broadcast name> <min bound> <max bound> <delay time>```

For example:

```JSON
// $ speed 0 100 200
// Will produce data like:

{
  "sensor": "speed",
  "time": 12315,
  "data": [24]

}

// Where 0 <= data <= 100 every 200 milliseconds
```

The % command takes in 1 argument: ```% <broadcast name>```

It will stop the broadcast with the same name from repeating itself

So ```% speed``` willl stop the reptition

<br/>

Broadcasts, Broadcasts types and bounds can be found here:

[Commands and Events for Websocket Communication](https://github.com/teamwaterloop/control-front/tree/master/events)

Using this system, every Broadcast should be able to be tested
