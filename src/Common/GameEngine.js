import PhysicsEngine from './PhysicsEngine';
import Factory from './Factory';

var nextEntityID = 1;

export default class GameEngine {

    constructor(loop) {
        this.loop = loop;
        this.physics = new PhysicsEngine();
        this.entities = [];

        this.states = [];
        this.maxStateCount = 100;
        this.updateStep = 0;

        this.loop.on('update', this.update.bind(this));
    }

    createEntity(entityName) {
        var ID = nextEntityID;
        nextEntityID++;

        var entity = Factory.create(entityName, this);

        entity.ID = ID;
        entity.name = entityName;
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
        this.updateStep++;
        var updateData = {
            step: this.updateStep
        };

        this.entities.forEach(entity => {
            if (entity.update) {
                entity.update(updateData);
            }
        });
        this.physics.update(updateData);

        this._saveState();
    }

    _saveState() {
        var state = {
            step: this.updateStep,
            entities: []
        };

        this.entities.forEach(entity => {
            var entityData = {
                ID: entity.ID,
                name: entity.name,
                state: entity.getState()
            };
            state.entities.push(entityData);
        });

        this.states.push(state);
        if (this.states.length > this.maxStateCount) {
            this.states.splice(0, this.states.length - this.maxStateCount);
        }

        console.log(this.states.length, state.entities);

        return state;
    }

    start() {
        this.loop.start();
    }

}
