import GameEngineCommon from '../Common/GameEngine';
import Keyboard from './Keyboard';
import * as PIXI from 'pixi.js';

export default class GameEngine extends GameEngineCommon {

    constructor(loop, containerNode) {
        super(loop);

        this.containerNode = containerNode || document.body;
        this.layers = new PIXI.Container();

        this.renderer = PIXI.autoDetectRenderer(
            this.containerNode.clientWidth,
            this.containerNode.clientHeight,
            {
                antialias: true,
                transparent: false,
                resolution: 1,
                backgroundColor: 0x000000
            }
        );
        this.containerNode.appendChild(this.renderer.view);

        this.stage = this.createLayer();
        this.stage.pivot.x = -(this.renderer.width / 2);
        this.stage.pivot.y = -(this.renderer.height / 2);

        // TODO: bind to game node
        this.keyboard = new Keyboard(document.body);

        this.loop.on('render', this.render.bind(this));
    }

    createLayer(index) {
        var layer = new PIXI.Container();
        if (typeof index !== 'undefined') {
            this.layers.addChildAt(layer, index);
        } else {
            this.layers.addChild(layer);
        }
        return layer;
    }

    update() {
        this.keyboard.update();

        super.update();
    }

    render(delta) {
        this.entities.forEach(entity => {
            if (entity.render) {
                entity.render(delta);
            }
        });
        this.renderer.render(this.layers);
    }

}
