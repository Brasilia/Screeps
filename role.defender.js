require('prototype.creep');

var roleDefender = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        creep.pickupClosestEnergy();
        
        creep.room.memory.defenders ++;
        
	    if(creep.memory.defending && creep.carry.energy == 0) {
            creep.memory.defending = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.defending && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.defending = true;
	        creep.say('defending');
	    }

	    if(creep.memory.defending) {
	        var brothersAtArms = creep.room.find(FIND_MY_CREEPS, {
	            filter: (mycreep) => mycreep.memory.role == 'defender' &&
	                mycreep.memory.defending == true
	        });
	        if (brothersAtArms.length < 4){
	            creep.say('gathering');
	            var closestFriend = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
	              filter: (mycreep) => mycreep.memory.role == 'defender'  
	            });
	            if (closestFriend){
	                creep.moveTo(closestFriend);
	            }
	        } else {
	            var closestHostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
    	        if (closestHostile){
    	            if (creep.attack(closestHostile) == ERR_NOT_IN_RANGE){
    	                creep.moveTo(closestHostile);
    	            }
    	        }
	        }
	        
	        
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.source]);
            }
	    }
	}
};

module.exports = roleDefender;