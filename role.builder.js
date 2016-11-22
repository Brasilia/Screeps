require('prototype.creep');

var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var roomMemory = creep.room.memory;
        creep.pickupClosestEnergy();
        //creep.memory.source = 0;
        
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }
        console.log('Closer Connstruction Site ' + creep.pos.findClosestByRange(roomMemory.constructionSites));
	    if(creep.memory.building) {
	        console.log('Closer Connstruction Site ' + creep.pos.findClosestByRange(roomMemory.constructionSites));
	        var target = creep.pos.findClosestByRange(roomMemory.constructionSites);
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else { // no construction sites
                creep.say('Upgrader!');
                //creep.memory.role = 'upgrader';
            }
	    }
	    else {
	        var closestContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
	            filter: (structure) => {
	                return structure.structureType == STRUCTURE_CONTAINER
                            && structure.store[RESOURCE_ENERGY] > 0
	            }
	        });
	        if (closestContainer){
	            if(creep.withdraw(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
	                creep.moveTo(closestContainer);
	            }
	        } else {
	            var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[creep.memory.source]);
                }
	        }
	    }
	}
};

module.exports = roleBuilder;