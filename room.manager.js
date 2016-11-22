
var roomManager = {
    //var myCreeps;
    //var structures;
    setup: function(room) {
        //console.log('setup room');
        //MyCreeps
        var myCreeps = room.find(FIND_MY_CREEPS);
        room.memory.creeps = myCreeps;
        room.memory.harvesters = _.filter(myCreeps, (creep) => creep.memory.role == 'harvester');
        room.memory.upgraders = _.filter(myCreeps, (creep) => creep.memory.role == 'upgrader');
        room.memory.builders = _.filter(myCreeps, (creep) => creep.memory.role == 'builder');
        room.memory.repairers = _.filter(myCreeps, (creep) => creep.memory.role == 'repairer');
        room.memory.defenders = _.filter(myCreeps, (creep) => creep.memory.role == 'defender');
        room.memory.transporters = _.filter(myCreeps, (creep) => creep.memory.role == 'transporter');
        //Estruturas
        var structures = room.find(FIND_STRUCTURES);
        room.memory.structures = structures;
        room.memory.spawns = _.filter(structures, (structure) => structure.structureType == STRUCTURE_SPAWN);
        room.memory.spawnsNotFull = _.filter(room.memory.spawns, (structure) => structure.energy < structure.energyCapacity);
        //console.log(spawnsNotFull);
        room.memory.extensions = _.filter(structures, (structure) => structure.structureType == STRUCTURE_EXTENSION);
        room.memory.extensionsNotFull = _.filter(room.memory.extensions, (structure) => structure.energy < structure.energyCapacity);
        room.memory.containers = _.filter(structures, (structure) => structure.structureType == STRUCTURE_CONTAINER);
        room.memory.containersNotFull = _.filter(room.memory.containers, (structure) => structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
        room.memory.containersNotEmpty = _.filter(room.memory.containers, (structure) => structure.store[RESOURCE_ENERGY] > 0);
        //Construction Sites
        room.memory.constructionSites = room.find(FIND_CONSTRUCTION_SITES);
        //Sources
        room.memory.sources = room.find(FIND_SOURCES);
    },
    
    findCreeps: function(room, creepRole){ //desnecessário
        return _.filter(room.memory.creeps, (creep) => creep.memory.role == creepRole);
    },
    
    findStructures: function(room, structureType){ //desnecessário
        return _.filter(room.memory.structures, (structure) => structure.structureType == structureType);
    }
    
};

module.exports = roomManager;