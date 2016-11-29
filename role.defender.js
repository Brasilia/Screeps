require('prototype.creep');

var roleDefender = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //creep.moveTo(Game.flags['Flag1']);
        //Roubar energia
        if (creep.memory.source == 0){
            creep.pickupClosestEnergy();
            //creep.memory.source = 1;

            var flag = Game.flags['Flag1'];

            if (creep.carry.energy == 0){
                creep.memory.loaded = false;
            }
            if (creep.carry.energy == creep.carryCapacity){
                creep.memory.loaded = true;
            }
            if(!creep.memory.loaded) {
                var target = flag;//.pos.findClosestByRange(FIND_STRUCTURES);
                if (creep.pos.inRangeTo(flag, 1)){
                    console.log('Ta na posicao da flag');
                    target = flag.pos.findClosestByRange(FIND_STRUCTURES);
                }
                //var target = Game.getObjectById('5838a0a7538a78003a686363');
                console.log('Defender: ' + creep.withdraw(target, RESOURCE_ENERGY));
                if(target && false) {
                    if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    creep.moveTo(flag);
                }
            }
            else{
                var target = Game.getObjectById('5839d8b4d62c379b1fd0ce9b');
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }

        //Reciclar
        if (creep.memory.source == 1){
            creep.moveTo(Game.spawns['Spawn1']);
            Game.spawns['Spawn1'].recycleCreep(creep);
        }

        //Atacar
        if (creep.memory.source == 2){

            creep.moveTo(Game.flags['Attack1']); return;
            var target = Game.flags['Attack1'].pos.findClosestByRange(FIND_STRUCTURES,
                {filter: (structure) =>
                structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_CONTAINER ||
                structure.structureType == STRUCTURE_ROAD
                });
            if (creep.attack(target) == ERR_NOT_IN_RANGE){
                creep.moveTo(target);
            }
        }


        //Reparar
        if (creep.memory.source == 3){
            creep.pickupClosestEnergy();
            //creep.memory.source = 1;

            var flag = Game.flags['Repair'];

            if (creep.carry.energy == 0){
                creep.memory.loaded = false;
            }
            if (creep.carry.energy == creep.carryCapacity){
                creep.memory.loaded = true;
            }
            if(!creep.memory.loaded) {
                //var target = flag;//.pos.findClosestByRange(FIND_STRUCTURES);
                if (creep.pos.inRangeTo(flag, 1)){
                    console.log('Ta na posicao da flag');
                    var target = flag.pos.findClosestByRange(FIND_SOURCES);
                }
                //var target = Game.getObjectById('5838a0a7538a78003a686363');
                console.log('Defender: ' + creep.harvest(target));
                if(target) {
                    console.log('Erro de harvest: ' + creep.harvest(target));
                    if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                    creep.moveTo(flag);
                }
            }
            else{
                var target = Game.getObjectById('583392e862193c75260d6fe5');
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }



        //Curar
        if (creep.memory.source == 4){
            var closestDamagedMyCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {filter: (c) => c.hits < c.hitsMax});
            if (closestDamagedMyCreep){
                //creep.moveTo(closestDamagedMyCreep);
                creep.heal(closestDamagedMyCreep);
            } else {
                creep.moveTo(Game.flags['Heal1']);
            }
        }

        //Tanker
        if (creep.memory.source == 5){
            if (creep.hits == creep.hitsMax){
                creep.memory.tanking = true;
            }
            if (creep.hits < 1000){
                creep.memory.tanking = false;
            }
            if(creep.memory.tanking){
                creep.moveTo(Game.flags['Tank1'])
            } else {
                creep.moveTo(Game.flags['Heal1'])
            }
        }

        //Claimer
        if (creep.memory.source == 6){
            var flag = Game.flags['Claim'];
            creep.moveTo(flag);
            if (creep.pos.inRangeTo(flag, 1)){
                console.log('Claim in range');
                console.log(creep.reserveController(creep.room.controller) );
            }
        }



    }//fim da function







    /*
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
     }*/
};

module.exports = roleDefender;