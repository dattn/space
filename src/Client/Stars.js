import Entity from '../Common/Entity';
import * as PIXI from 'pixi.js';

export default class Stars extends Entity {

    constructor(app) {
        super(app);

        this.layer = this.app.createLayer(0);

        this.stars1 = new PIXI.extras.TilingSprite(
            PIXI.Texture.fromImage('images/stars1.png'),
            this.app.renderer.width,
            this.app.renderer.height
        );
        this.stars1.tileScale.x = 1.2;
        this.stars1.tileScale.y = 1.2;

        this.stars2 = new PIXI.extras.TilingSprite(
            PIXI.Texture.fromImage('images/stars2.png'),
            this.app.renderer.width,
            this.app.renderer.height
        );
        this.stars2.tileScale.x = 1.2;
        this.stars2.tileScale.y = 1.2;

        this.nebula = new PIXI.extras.TilingSprite(
            PIXI.Texture.fromImage('images/nebula.png'),
            this.app.renderer.width,
            this.app.renderer.height
        );
        this.nebula.tileScale.x = 5;
        this.nebula.tileScale.y = 5;
        this.nebula.blendMode = PIXI.BLEND_MODES.ADD;

        this.layer.addChild(this.stars1);
        this.layer.addChild(this.stars2);
        this.layer.addChild(this.nebula);
    }

    render() {
        this.stars1.tilePosition.x = this.app.stage.position.x / 50;
        this.stars1.tilePosition.y = this.app.stage.position.y / 50;

        this.stars2.tilePosition.x = this.app.stage.position.x / 30;
        this.stars2.tilePosition.y = this.app.stage.position.y / 30;

        this.nebula.tilePosition.x = this.app.stage.position.x / 5;
        this.nebula.tilePosition.y = this.app.stage.position.y / 5;
    }

}
