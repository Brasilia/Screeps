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
    Creep.prototype.withdrawEnergyFromClosestContainer =
    function(){
        this.findClosestByPath(this.room.memory.containers).memory.demand += this.carryCapacity;

        if (!this.memory.closestContainer){
            this.memory.closestContainer = this.findClosestByPath(this.room.memory.containersNotEmpty);
            if (!this.memory.closestContainer){
                //try alternative energy source - otimizar
                this.harvestFromSource();
            }
        } else { //already knows destination
            var withdrew = this.withdraw(this.memory.closestContainer, RESOURCE_ENERGY);
            if (withdrew == ERR_NOT_IN_RANGE){
                this.moveTo(this.memory.closestContainer);
            } else if(withdrew == OK || withdrew == ERR_NOT_ENOUGH_RESOURCES){
                this.memory.closestContainer = null;
                if (withdrew == OK){
                    return OK;
                }
            }

        }
    };
};
