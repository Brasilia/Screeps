require('prototype.creep');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var roomMemory = creep.room.memory;
        creep.pickupClosestEnergy();
       console.log(creep.transfer(creep.pos.findClosestByRange(roomMemory.extensionsNotFull), RESOURCE_ENERGY));
        //creep.memory.role = 'builder';
        //creep.memory.source = 1;
	    if (creep.carry.energy == 0){
	        creep.memory.loaded = false;
	    }
	    if (creep.carry.energy == creep.carryCapacity){
	        creep.memory.loaded = true;
	    }
	    if(!creep.memory.loaded) {
            creep.harvestFromSource();
        }
        else {
            var targets = [];
            targets = targets.concat(roomMemory.spawnsNotFull).concat(roomMemory.extensionsNotFull);
            var target = creep.pos.findClosestByRange(targets);
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                //targets = roomMemory.spawns;
                //creep.moveTo(targets[0]);
            }
        }
	}
};

module.exports = roleHarvester;