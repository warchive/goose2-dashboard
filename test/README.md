# Testing the client

You can use the included test server (index.js) to test the client

## Easy to set up:

* Install all dependencies on the parent folder ```yarn install```
* Run the test server on console ```npm run testServer```

## How to use

There are only two possible meaningful commands that you can give to the interpretor as of now

```begin-full-test delay [wiggle=0]```

Will make the server start sending the full array of data to the dashboard in a smooth sinuoidal way.
This way you can see how the dashboard responds when data reaches its maximum or minimum.

You can also specify wiggle, which will randomly shift the value of a data point by it's range multiplied by wiggle/100

The calculation is:

```js
function calculateDataPoint(min, max, wiggle){
  return Math.sin((Date.now() / 1000)) * ((max - min) / 2) + ((max + min) / 2) +
    (Math.random() > 0.5 ? -1 : 1) * Math.random() * (wiggle / 100) * (max - min)
}
```

The next command is

```@ message```

which will send your message to the dashboard for it to log


[Commands and Events for Websocket Communication](https://github.com/teamwaterloop/control-front/tree/master/events)

Using this system, every Broadcast should be able to be tested
