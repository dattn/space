import { Body } from 'matter-js';

export default class Entity {

    constructor(app) {
        this.app = app;
    }

    get x() {
        if (this.physicsBody) {
            return this.physicsBody.position.x;
        }
        return this._x || 0;
    }

    set x(x) {
        if (this.physicsBody) {
            return Body.setPosition(this.physicsBody, {
                x: x,
                y: this.y
            });
        }
        this._x = x;
    }

    get y() {
        if (this.physicsBody) {
            return this.physicsBody.position.y;
        }
        return this._y || 0;
    }

    set y(y) {
        if (this.physicsBody) {
            return Body.setPosition(this.physicsBody, {
                x: this.x,
                y: y
            });
        }
        this._y = y;
    }

    get angle() {
        if (this.physicsBody) {
            return this.physicsBody.angle;
        }
        return this._angle || 0;
    }

    set angle(angle) {
        if (this.physicsBody) {
            return Body.setAngle(this.physicsBody, angle);
        }
        this._angle = angle;
    }

    update() {
        this.old = {
            x: this.x,
            y: this.y,
            angle: this.angle
        };
    }

    getState() {
        var state = {
            x: this.x,
            y: this.y,
            angle: this.angle,
            physics: this.app.physics.getState(this)
        };
        return state;
    }

}
