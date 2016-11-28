require('prototype.creep');

var roleTransporter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var roomMemory = creep.room.memory;
        creep.pickupClosestEnergy();
        var closestHarvester = creep.pos.findClosestByRange (roomMemory.Harvesters);
        creep.withdraw(closestHarvester, RESOURCE_ENERGY);

        //creep.memory.source = 1;
        if (creep.carry.energy == 0){
            creep.memory.loaded = false;
        }
        if (creep.carry.energy == creep.carryCapacity){
            creep.memory.loaded = true;
        }
        if(!creep.memory.loaded) {
            var target = creep.pos.findClosestByPath(roomMemory.containersNotEmpty);
            if(target) {
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
        else {
            var targets = [];
            //console.log(' targets length ' + targets.length);
            //console.log('Towers: ' + roomMemory.towersNotFull);
            if (roomMemory.towersNotFull.length > 0) targets = targets.concat(roomMemory.towersNotFull);  // = targets.concat(roomMemory.towersNotFull).concat(roomMemory.spawnNotFull).concat(roomMemory.extensionsNotFull);
            if (roomMemory.spawnsNotFull.length > 0) targets = targets.concat(roomMemory.spawnsNotFull);
            if (roomMemory.extensionsNotFull.length > 0) targets = targets.concat(roomMemory.extensionsNotFull);
            if (roomMemory.storageNotFull.length > 0) targets = targets.concat(roomMemory.storageNotFull);
            //Concatenar container-hardcoded
            //console.log('spawns not full: ' + roomMemory.spawnsNotFull);
            //targets.push(roomMemory.towersNotFull);
            //console.log('targets ' + targets);
            if(targets.length > 0) {
                //console.log('transferindo para ' + targets[0] + ' ' + creep.transfer(targets[0], RESOURCE_ENERGY));
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                /*targets = creep.room.find(FIND_CREEPS, {
                 filter: (c) => {
                 return (c.memory.role == 'upgrader'
                 && c.carry.energy < c.carryCapacity/2);
                 }
                 });*/
                targets = _.filter(Game.creeps, (c) => c.memory.role == 'upgrader' && c.carry.energy < c.carryCapacity/2 && c.memory.upgrading == true);
                creep.say(targets);
                if (targets.length){
                    creep.say(targets[0].name);
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                    //target = Game.getObjectById('58347d0eab6a695f1c9d0d56');
                    //if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    //    creep.moveTo(target);
                } else{
                    creep.memory.loaded = false;
                    targets = roomMemory.spawns;
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
};

module.exports = roleTransporter;