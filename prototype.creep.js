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
        //var closestContID = this.pos.findClosestByPath(this.room.memory.containers).id;
        if (!this.memory.closestContainerID){
            var closest = this.pos.findClosestByPath(this.room.memory.containersNotEmpty);
            if (closest){
                this.memory.closestContainerID = closest.id;
                if (!this.memory.closestContainerID){
                    //try alternative energy source - otimizar
                    this.harvestFromSource();
                }
            }
        } else { //already knows destination
            var targetContainer = Game.getObjectById(this.memory.closestContainerID);
            var withdrew = this.withdraw(targetContainer, RESOURCE_ENERGY);
            if (withdrew == ERR_NOT_IN_RANGE){
                this.moveTo(targetContainer);
            } else if(withdrew == OK || withdrew == ERR_NOT_ENOUGH_RESOURCES){
                this.memory.closestContainerID = null;
                if (withdrew == OK){
                    return OK;
                }
            }
        }
    };
    Creep.prototype.distributeContainerEnergy =
    function() {
        if (this.carry.energy == 0){
            this.memory.loaded = false;
        }
        if (this.carry.energy == this.carryCapacity){
            this.memory.loaded = true;
        }
        if (!this.memory.decided){
            var destination = this.room.controller.pos.findClosestByRange(this.room.memory.containers);
            var otherContainers = _.filter(this.room.memory.containersNotEmpty, (cont) => cont.id != destination.id && cont.store[RESOURCE_ENERGY] > cont.storeCapacity/2);
            var origin = otherContainers[0];
            if (destination && origin ){
                this.memory.decided = true;
            }
        }
        if (this.memory.decided){
            if(!this.memory.loaded){ // not loaded - go load
                if(this.withdraw(origin, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    this.moveTo(origin);
                } else if (this.withdraw(origin, RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES){
                    this.memory.decided = false;
                }
            } else { //loaded - go transfer
                if (this.transfer(destination, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    this.moveTo(destination);
                } else {
                    this.memory.decided = false;
                }
            }
        }
    };
};
