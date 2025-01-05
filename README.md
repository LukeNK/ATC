# Air Traffic Controller
This is a project for me to practice using WebSocket.

## Gameplay
There are two possible roles to take: an air traffic controller or a pilot. As an air traffic controller, you can click on planes and give them commands to follow. As a pilot, you will will control your plane to follow the ATC's instruction. You can be a depature or an arrival plane, and the goal for both sides is to get the planes to the destination (just like in real life)

Possible control:
- Heading
- Speed
- Altitude

For departures, the ATC need to instruct the plane to reach a waypoint to exit the airspace. For arrivals, the planes will need to intercept the runway's glideslopes.

## Technical
Both roles will essentially share the same client but with a different permission.

There should be a way to convert between feet and pixel; or a pixel is a feet, then scale the canvas appropriately.

Store map as a SVG file. Remember to copy style
```html
<object id="obj" type="image/svg+xml" data="map.svg"></object>
```
```js
canvas.documentElement.append(document.querySelector('style'))
```

A plane will have these properties:
- Turning speed (degree/tick)
- Acceleration (feet/tick^2)
- Climb rate (feet/tick)

Every tick, the server will boardcast a message to inform about the planes and their position.