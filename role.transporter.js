require('prototype.creep');

var roleTransporter = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var roomMemory = creep.room.memory;
        creep.pickupClosestEnergy();
        var closestHarvester = creep.pos.findClosestByRange (roomMemory.Harvesters);
        creep.withdraw(closestHarvester, RESOURCE_ENERGY);

        this.distributeContainerEnergy();
	}
};

module.exports = roleTransporter;