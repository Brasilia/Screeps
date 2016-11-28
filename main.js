var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleDefender = require('role.defender');
var roleTransporter = require('role.transporter');
var structureSpawner = require('structure.spawner');
var roomManager = require('room.manager');
require ('prototype.creep')();

module.exports.loop = function () {
    //Clears dead creeps from memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var tower = Game.getObjectById('583a8f5241c739212e902d4c');
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        } else {
            //console.log('noHostiles');
            var closestDamagedWall = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => (structure.hits < structure.hitsMax * 0.00004 && structure.structureType == STRUCTURE_WALL) || (structure.hits < structure.hitsMax * 0.01 && structure.structureType == STRUCTURE_RAMPART)
            });
            //console.log(closestDamagedWall);
            if(closestDamagedWall){
                tower.repair(closestDamagedWall);
            }
        }

    }


    for (var name in Game.rooms){
        var room = Game.rooms[name];
        roomManager.setup(room);
    }
    structureSpawner.run(Game.spawns['Spawn1']);

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        } else
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        } else
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        } else
        if(creep.memory.role == 'defender') {
            roleDefender.run(creep);
        } else
        if(creep.memory.role == 'transporter') {
            roleTransporter.run(creep);
        }
    }
}