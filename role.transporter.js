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
            targets = targets.concat(roomMemory.spawnNotFull).concat(roomMemory.extensionNotFull);
            if(targets.length > 0) {
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
                targets = _.filter(Game.creeps, (c) => c.memory.role == 'upgrader' && c.carry.energy < c.carryCapacity/2);
                creep.say(targets);
                if (targets.length){
                    creep.say(targets[0].name);
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
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