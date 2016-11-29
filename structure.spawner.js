var structureSpawner = {
    run: function(spawner){
        /*
         var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
         var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
         var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
         var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
         var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
         var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');


         .createCreep([MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], undefined, {role: 'transporter', source: 0})
         Game.spawns['Spawn1'].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], undefined, {role: 'defender', source: 0})
         */

        var harvesters = spawner.room.memory.harvesters;
        var transporters = spawner.room.memory.transporters;
        var builders = spawner.room.memory.builders;
        var upgraders = spawner.room.memory.upgraders;
        var repairers = spawner.room.memory.repairers;
        var defenders = spawner.room.memory.defenders;

        var harvesterBody;
        var transporterBody;
        var builderBody;
        var upgraderBody;

        if (spawner.name == 'Spawn1'){
            harvesterBody = [MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK];
            transporterBody = [MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
            builderBody = [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, WORK, WORK, WORK];
            upgraderBody = [MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK];
            //Ajustável pela memoria, sem codigo
            //spawner.memory.harvesterCount = 4;
            //spawner.memory.transporterCount = 2;
            //spawner.memory.builderCount = 3;
            //spawner.memory.upgraderCount = 9;
        }

        if (spawner.name == 'Spawn2'){
            harvesterBody = [MOVE, CARRY, WORK, WORK, WORK];
            transporterBody = [MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
            builderBody = [MOVE, MOVE, CARRY, CARRY, WORK, WORK];
            upgraderBody = [MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK];
            //Ajustável pela memoria, sem codigo
            //spawner.memory.harvesterCount = 1;
            //spawner.memory.transporterCount = 0;
            //spawner.memory.builderCount = 6;
            //spawner.memory.upgraderCount = 0;
        }


        if (harvesters.length < spawner.memory.harvesterCount){
            if (!spawner.memory.harvesters){
                spawner.memory.harvesters = 0;
            }
            var src = (spawner.memory.harvesters % 2);
            if (spawner.createCreep(harvesterBody, undefined, {role: 'harvester', source: src}) != ERR_NOT_ENOUGH_ENERGY){
                console.log('Harvesters: ' + harvesters.length);
                console.log('Spawning harvester');
                spawner.memory.harvesters++;
            }

        } else {
            console.log('oi');
            if (builders.length < spawner.memory.builderCount && spawner.room.find(FIND_CONSTRUCTION_SITES).length){ // se nÃ£o hÃ¡ builders suficientes e hÃ¡ locais de construÃ§Ã£o
                console.log(builderBody);
                spawner.createCreep(builderBody, undefined, {role: 'builder', source: 1});
                console.log('Builders: ' + builders.length);
                console.log('Spawning builder');
            } else {
                if (upgraders.length < spawner.memory.upgraderCount - builders.length - transporters.length){
                    spawner.createCreep(upgraderBody, undefined, {role: 'upgrader', source: 1});
                    //console.log('Upgraders: ' + upgraders.length);
                    console.log('Spawning upgrader');
                }
                //else {
                if (transporters.length < spawner.memory.transporterCount){
                    spawner.createCreep(transporterBody, undefined, {role: 'transporter', source: 0});
                    console.log('Transporters: ' + transporters.length);
                    console.log('Spawning transporter');
                }
                //}
            }
        }
    }

};

module.exports = structureSpawner;