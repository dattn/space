import Ship from './Ship';

export default class Player extends Ship {

    update() {
        super.update();

        if (this.app.keyboard.isDown(37)) {
            this.turnLeft();
        }
        if (this.app.keyboard.isDown(39)) {
            this.turnRight();
        }
        if (this.app.keyboard.isDown(38)) {
            this.accelerate();
        }
    }

    render(t) {
        super.render(t);

        this.app.stage.position.x = -this.sprite.x;
        this.app.stage.position.y = -this.sprite.y;
    }

}
