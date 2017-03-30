import Entity from '../Common/Entity';
import * as PIXI from 'pixi.js';

export default class Stars extends Entity {

    constructor(app) {
        super(app);

        this.layer = this.app.createLayer(0);

        this.tilingSprite = new PIXI.TilingSprite(
            PIXI.Texture.fromImage('background.jpg'),
            this.app.renderer.width,
            this.app.renderer.height
        );

        this.layer.addChild(this.tilingSprite);
    }

    render() {
        this.tilingSprite.tilePosition.x = this.app.stage.position.x / 4;
        this.tilingSprite.tilePosition.y = this.app.stage.position.y / 4;
    }

}
