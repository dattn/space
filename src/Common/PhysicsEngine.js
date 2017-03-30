import { Engine, World, Events, Bodies } from 'matter-js';

export default class PhysicsEngine {

    constructor() {
        this.engine = Engine.create();
        this.world = this.engine.world;

        Events.on(this.engine, 'collisionStart', this._handleCollisions.bind(this));
        Events.on(this.engine, 'collisionActive', this._handleCollisions.bind(this));

        this.world.gravity.x = 0;
        this.world.gravity.y = 0;
    }

    update() {
        Engine.update(this.engine, 1000 / 20);
    }

    createBody(entity, type) {
        var body = Bodies[type].apply(Bodies, [...arguments].slice(2));
        entity.physicsBody = body;
        body.userData = { entity };
        World.add(this.world, body);
        return body;
    }

    destroyBody(entity) {
        if (entity.physicsBody) {
            delete entity.physicsBody.entity;
            delete entity.physicsBody;
            World.remove(this.world, entity.physicsBody);
        }
    }

    _handleCollisions(ev) {
        ev.pairs.forEach(collision => {
            var dataA = collision.bodyA.userData || {};
            var dataB = collision.bodyB.userData || {};
            if (dataA.entity && dataA.entity.onCollision) {
                dataA.entity.onCollision(dataB.entity || null, collision);
            }
            if (dataB.entity && dataB.entity.onCollision) {
                dataB.entity.onCollision(dataA.entity || null, collision);
            }
        });
    }

}
