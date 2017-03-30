import Ship from './Ship';
import { Body } from 'matter-js';

export default class Player extends Ship {

    update() {
        super.update();

        // left
        if (this.app.keyboard.isDown(37)) {
            Body.rotate(this.physicsBody, -(Math.PI / 20));
        }
        // right
        if (this.app.keyboard.isDown(39)) {
            Body.rotate(this.physicsBody, Math.PI / 20);
        }
        // move
        if (this.app.keyboard.isDown(38)) {
            Body.applyForce(this.physicsBody, {
                x: this.x,
                y: this.y
            }, {
                x: Math.cos(this.angle) * 0.005,
                y: Math.sin(this.angle) * 0.005
            });
        }
    }

    render(t) {
        super.render(t);

        this.app.stage.position.x = -this.sprite.x;
        this.app.stage.position.y = -this.sprite.y;
    }

}
