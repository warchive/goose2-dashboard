# Testing the client

You can use the included test server (index.js) to test the client

## Easy to set up:

* Install all dependencies on the parent folder ```yarn install```
* Run the test server on console ```npm run testServer```

## How to use

### Commands are displayed on the screen

Any commands the the client sends to the server will be printed on the screen. For example, if you presss the start button, you should see:

```json
// Start command
{ type: 'utf8', utf8Data: '{"Command":"start","value":true}' }

// Acceleration command
{ type: 'utf8',
  utf8Data: '{"Command":"acceleration","value":46}' }
```

### Broadcasts can be sent to the client

There are 2 types of broadcasts:

* General broadcasts that look like ```[type] name val```
* Specific test broadcasts that look like ```command```

These broadcast commands are typed into the console where the node server is runing

#### General broadcasts

Type is the value type, these are represented by 3 characters

* ! - Boolean
* @ - String
* \# - Number

Some example broadcasts and what they yield:
```JSON
// ! start t
{
  "name": "start",
  "value": true
}

// ! start f
{
  "name": "start",
  "value": false
}

// String broadcasts aren't really useful right now

// # speed 50
{
  "name": "speed",
  "value": 50
}
```

Broadcasts, Broadcasts types and bounds can be found here:

[Commands and Events for Websocket Communication](https://github.com/teamwaterloop/control-front/tree/master/events)

Using this system, every Broadcast should be able to be tested

#### Specific broadcasts

These are preprogrammed broadcasts that you can use to test

| name  | action                                                                     |
| ----- | -------------------------------------------------------------------------- |
| speed | Starts the speed test (generates random speed data every 200 mili seconds) |
| stop speed | Stops the speed test |
