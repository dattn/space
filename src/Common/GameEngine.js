import PhysicsEngine from './PhysicsEngine';
import Factory from './Factory';

var nextEntityID = 1;

export default class GameEngine {

    constructor(loop) {
        this.loop = loop;
        this.physics = new PhysicsEngine();
        this.entities = [];

        this.loop.on('update', this.update.bind(this));
    }

    createEntity(entityName) {
        var ID = nextEntityID;
        nextEntityID++;

        var entity = Factory.create(entityName, this);

        entity.ID = ID;
        entity.label = entityName + '_' + ID;
        
        this.entities.push(entity);
        return entity;
    }

    destroyEntity(entity) {
        // call entity onDestroy function
        if (entity.onDestroy) {
            entity.onDestroy();
        }

        // destroy body if any
        this.physics.destroyBody(entity);

        // remove entity from entites array
        var index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }

    update() {
        this.entities.forEach(entity => {
            if (entity.update) {
                entity.update();
            }
        });
        this.physics.update();
    }

    start() {
        this.loop.start();
    }

}
