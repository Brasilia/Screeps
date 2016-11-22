require('prototype.creep');

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var roomMemory = creep.room.memory;
        creep.pickupClosestEnergy();
        
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('repairing');
	    }

	    if(creep.memory.building) {
	        creep.memory.hpThreshold = 0.25;
	        do {
	            var closestDamagedStructure = creep.pos.findClosestByPath(roomMemory.structures, {
                    filter: (structure) => structure.hits < structure.hitsMax * creep.memory.hpThreshold
                });
                creep.memory.hpThreshold += 0.25;
	        } while(!closestDamagedStructure && creep.memory.hpThreshold <= 1);
	        
            if(closestDamagedStructure) {
                if (creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE){
                    creep.moveTo(closestDamagedStructure);
                }
            } else { // no construction sites
                creep.memory.role = 'upgrader';
            }
	    }
	    else {
	        creep.harvestFromSource();
	    }
	}
};

module.exports = roleRepairer;