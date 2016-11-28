var structureSpawner = {
    run: function(spawner){
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
        var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

        if (harvesters.length < 4){
            if (!spawner.memory.harvesters){
                spawner.memory.harvesters = 0;
            }
            var src = (spawner.memory.harvesters % 2);
            if (spawner.createCreep([MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK], undefined, {role: 'harvester', source: src}) != ERR_NOT_ENOUGH_ENERGY){
                console.log('Harvesters: ' + harvesters.length);
                console.log('Spawning harvester');
                spawner.memory.harvesters++;
            }

        } else {
            if (builders.length < 1 && spawner.room.find(FIND_CONSTRUCTION_SITES).length){ // se nÃ£o hÃ¡ builders suficientes e hÃ¡ locais de construÃ§Ã£o
                spawner.createCreep([MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, WORK, WORK, WORK], undefined, {role: 'builder', source: 1});
                console.log('Builders: ' + builders.length);
                console.log('Spawning builder');
            } else {
                if (upgraders.length < 7 - builders.length - transporters.length){
                    spawner.createCreep([MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK], undefined, {role: 'upgrader', source: 1});
                    //console.log('Upgraders: ' + upgraders.length);
                    console.log('Spawning upgrader');
                }
                //else {
                if (transporters.length < 2){
                    spawner.createCreep([MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], undefined, {role: 'transporter', source: 0});
                    console.log('Transporters: ' + transporters.length);
                    console.log('Spawning transporter');
                }
                //}
            }
        }
    }

};

module.exports = structureSpawner;