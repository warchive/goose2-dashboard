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

| Command        | Value Type   | Description                        |
| -------------- | ------------ | ---------------------------------- |
| Emergency Stop | N/A          | Activate emergency stop prodcedure |
| Brake          | Boolean?     | Activates Brakes                   |
| Speed          | Array<Float> | Changes the speed of the pod       |
| Acceleration   |              | Changes acceleration of the pod    |


## Broadcasted Data

```js
// Not really sure what format these are going to be in yet
{
  "name": "Speed"
  "value": 90
}
```

| name         | Value Type        | Description                                    |
| ------------ | ----------------- | ---------------------------------------------- |
| speed        | Float             | Speed of the pod                               |
| Acceleration | Array[3]<Float> ? | Represents x,y,z                               |
| AirTank      | Float             | PSI in Air Tank                                |
| Batteries    | Float             | Batteries percentage                           |
| Temperature  | Float             | Maybe we have to account for different sensors |
| Distance     | Float             | From the photo electric sensors                |
| IMU          | Array[3]<Float> ? | Data from inertial measurements sensor         |
