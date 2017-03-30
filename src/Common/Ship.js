import Entity from './Entity';

export default class Ship extends Entity {

    constructor(app) {
        super(app);

        this.app.physics.createBody(this, 'circle', this.x, this.y, 65);
    }

    update() {
        super.update();
    }

}
