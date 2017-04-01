import Entity from './Entity';
import { Body } from 'matter-js';

export default class Ship extends Entity {

    constructor(app) {
        super(app);

        this.accelerating = false;
        this.turningLeft  = false;
        this.turningRight = false;

        this.app.physics.createBody(this, 'circle', this.x, this.y, 65, {
            frictionAir: 0.03
        });
    }

    turnLeft() {
        this.turningLeft = true;
        Body.rotate(this.physicsBody, -(Math.PI / 20));
    }

    turnRight() {
        this.turningRight = true;
        Body.rotate(this.physicsBody, Math.PI / 20);
    }

    accelerate() {
        this.accelerating = true;
        Body.applyForce(this.physicsBody, {
            x: this.x,
            y: this.y
        }, {
            x: Math.cos(this.angle) * 0.003,
            y: Math.sin(this.angle) * 0.003
        });
    }

    update() {
        super.update();

        this.accelerating = false;
        this.turningLeft  = false;
        this.turningRight = false;
    }

}
