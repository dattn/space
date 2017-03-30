import Entity from '../Common/Entity';
import * as PIXI from 'pixi.js';

export default class Stars extends Entity {

    constructor(app) {
        super(app);

        this.tilingSprite = new PIXI.TilingSprite(
            PIXI.Texture.fromImage('background.jpg'),
            this.app.renderer.width,
            this.app.renderer.height
        );
        this.tilingSprite.anchor.set(0.5);

        this.app.stage.addChild(this.tilingSprite);
    }

    render() {
        this.tilingSprite.position.x = this.app.stage.position.x;
        this.tilingSprite.position.y = this.app.stage.position.y;

        console.log(this.tilingSprite.position);
    }

}
