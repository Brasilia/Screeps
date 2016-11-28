require('prototype.creep');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var roomMemory = creep.room.memory;
        creep.pickupClosestEnergy();

        var damagedStructures = _.filter(roomMemory.structures, (structure) => structure.hits < structure.hitsMax * 0.5 && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART);
        if (damagedStructures.length){
            creep.memory.role = 'repairer';
        }


        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            creep.harvestFromSource();
        }
    }
};

module.exports = roleUpgrader;