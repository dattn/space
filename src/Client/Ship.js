import CommonShip from '../Common/Ship';
import * as PIXI from 'pixi.js';

export default class Ship extends CommonShip {

    constructor(app) {
        super(app);

        this.sprite = PIXI.Sprite.fromImage('ship.png');
        this.sprite.anchor.set(0.5);
        this.sprite.scale.x = 0.5;
        this.sprite.scale.y = 0.5;

        this.shield = new PIXI.Graphics();
        this.shield.beginFill(0x005500, 0.5);
        this.shield.lineStyle(2, 0x009900, 0.5);
        this.shield.drawCircle(0, 0, 65);
        this.shield.blendMode = PIXI.BLEND_MODES.ADD;

        this.app.stage.addChild(this.sprite);
        this.app.stage.addChild(this.shield);

        this.shieldVisible = 0;
    }

    update() {
        super.update();

        if (this.shieldVisible > 0) {
            this.shieldVisible--;
        }
    }

    render(t) {
        this.shield.visible = this.shieldVisible > 0;

        this.sprite.x = this.old.x + (t * (this.x - this.old.x));
        this.sprite.y = this.old.y + (t * (this.y - this.old.y));
        this.sprite.rotation = (this.old.angle + (t * (this.angle - this.old.angle))) - (Math.PI / 2);

        this.shield.position.x = this.sprite.x;
        this.shield.position.y = this.sprite.y;
    }

    onCollision() {
        this.shieldVisible = 5;
    }

}