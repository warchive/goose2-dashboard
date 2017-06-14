# Events
Provides a temporary API for all the commands that can be sent to the pod
And all of the data that can be recieved from the pod

## Commands

Commands are the websocket objects sent to the pod
Definitions saved in commands.js

```js
// These are sent as a Object over websockets to the pod
{
  "Command": "emergencyStop",
  "Value": false
}

// Some commands also have values:
{
  "Command": "speed",
  "Value": 60.2 // Value can also be a number
}
```

| Command       | Value Type | Bound    | Description                                      |
| ------------- | ---------- | -------- | ------------------------------------------------ |
| acceleration  | Float      | [0, 100] | Changes acceleration of the pod                  |
| brake         | Boolean?   |          | Activates Brakes                                 |
| emergencyStop | Boolean    |          | Activate emergency stop prodcedure               |
| levitation    | Boolean    |          | Activates levitation                             |
| manualControl | Boolean    |          | Signals that manual controls are being activated |
| speed         | Float      | [0, 100] | Changes the speed of the pod                     |
| start         | Boolean    |          | Starts the pod                                   |


## Broadcasted Data

Definitions saved in broadcast.js

```js
// Not really sure what format these are going to be in yet
{
  "Name": "Speed"
  "Value": 90
}
```

| name         | Value Type                      | Description                                    |
| ------------ | ------------------------------- | ---------------------------------------------- |
| speed        | Float                           | Speed of the pod                               |
| acceleration | Array[3]\<Float> ?               | Represents x,y,z                               |
| airTankLevel | Float                           | PSI in Air Tank                                |
| batteryLevel | Float                           | Batteries percentage                           |
| temp         | Float                           | Maybe we have to account for different sensors |
| distance     |                                 |                                                |
| Float        | From the photo electric sensors |                                                |
| IMU          | Array[3]<Float> ?               | Data from inertial measurements sensor         |
