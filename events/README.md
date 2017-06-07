# Events
Provides a temporary API for all the commands that can be sent to the pod
And all of the data that can be recieved from the pod

## Commands

```js 
// These are sent as a Object over websockets to the pod
{
  "Command": "Emergency Stop"
}

// Some commands also have values:
{
  "Command": "Speed",
  "Value": [60] // Value is array in case there's more than one speed
}
```

| Command        | Value        | Description                        |
| -------------- | ------------ | ---------------------------------- |
| Emergency Stop | N/A          | Activate emergency stop prodcedure |
| Brake          | Boolean?     | Activates Brakes                   |
| Speed          | Array<Float> | Changes the speed of the pod       |