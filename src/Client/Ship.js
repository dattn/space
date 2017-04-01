import CommonShip from '../Common/Ship';
import * as PIXI from 'pixi.js';

export default class Ship extends CommonShip {

    constructor(app) {
        super(app);

        this.sprite = PIXI.Sprite.fromImage('images/ship.png');
        this.sprite.anchor.set(0.5);
        this.sprite.scale.x = 0.5;
        this.sprite.scale.y = 0.5;

        this.flame1 = PIXI.Sprite.fromImage('images/flame.png');
        this.flame1.anchor.set(0.5, 0);
        this.flame1.scale.x = 0.5;
        this.flame1.scale.y = 0.5;
        this.flame1.pivot.x = 30;
        this.flame1.pivot.y = -80;

        this.flame2 = PIXI.Sprite.fromImage('images/flame.png');
        this.flame2.anchor.set(0.5, 0);
        this.flame2.scale.x = 0.5;
        this.flame2.scale.y = 0.5;
        this.flame2.pivot.x = -30;
        this.flame2.pivot.y = -80;

        this.shield = new PIXI.Graphics();
        this.shield.beginFill(0x005500, 0.5);
        this.shield.lineStyle(2, 0x009900, 0.5);
        this.shield.drawCircle(0, 0, 65);
        this.shield.blendMode = PIXI.BLEND_MODES.ADD;

        this.app.stage.addChild(this.sprite);
        this.app.stage.addChild(this.flame1);
        this.app.stage.addChild(this.flame2);
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

        this.flame1.x = this.sprite.x;
        this.flame1.y = this.sprite.y;
        this.flame1.rotation = this.sprite.rotation + Math.PI;
        this.flame1.visible = this.accelerating;

        this.flame2.x = this.sprite.x;
        this.flame2.y = this.sprite.y;
        this.flame2.rotation = this.sprite.rotation + Math.PI;
        this.flame2.visible = this.accelerating;

        this.shield.position.x = this.sprite.x;
        this.shield.position.y = this.sprite.y;
    }

    onCollision() {
        this.shieldVisible = 5;
    }

}
