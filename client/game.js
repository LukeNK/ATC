// game code, AVIATION UNITS 1PX = 1FEET, 1tick = 1second
export default class Plane {
    constructor(x, y, hdg, spd, alt) {
        this.x = x;
        this.y = y;
        this.hdg = hdg; // degree
        this.spd = spd; // feet per tick
        this.alt = alt; // feet per tick
    }
    tick() {
        this.x += this.spd * Math.cos(this.hdg);
        this.y += this.spd * Math.sin(this.hdg);
    }
}