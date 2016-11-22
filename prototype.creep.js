module.exports = function() {
    Creep.prototype.pickupClosestEnergy = 
    function(){
        var closestEnergy = this.pos.findClosestByPath(FIND_DROPPED_ENERGY);
        if (closestEnergy){
            if (this.pickup(closestEnergy) == ERR_NOT_IN_RANGE){
                //creep.moveTo(closestHostile);
            }
        }
    };
    Creep.prototype.harvestFromSource = 
    function(){
        var sources = this.room.memory.sources;
        if(this.harvest(sources[this.memory.source]) == ERR_NOT_IN_RANGE) {
            this.moveTo(sources[this.memory.source]);
        }
    };
};
