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
    var cpu = Game.cpu.getUsed();
    console.log('-- START CPU Used: ' + Game.cpu.getUsed());

    //Clears dead creeps from memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    console.log('CPU Used (Dead Creeps Wipe): ' + (Game.cpu.getUsed() - cpu));
    cpu = Game.cpu.getUsed();
    console.log('CPU Used (nothing): ' + (Game.cpu.getUsed() - cpu));
    cpu = Game.cpu.getUsed();

    var tower = Game.getObjectById('583a8f5241c739212e902d4c');
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
            //SafeMode
            if (tower.pos.inRangeTo(closestHostile, 8)){ //hostile too close
                if (!tower.room.controller.safeMode){ //not safe mode already
                    tower.room.controller.activateSafeMode();
                }
            }
        } else {
            //console.log('noHostiles');
            var closestDamagedWall = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => (structure.hits < structure.hitsMax *0.8 && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART) || (structure.hits < structure.hitsMax * 0.00006 && structure.structureType == STRUCTURE_WALL) || (structure.hits < structure.hitsMax * 0.01 && structure.structureType == STRUCTURE_RAMPART)
            });
            //console.log(closestDamagedWall);
            if(closestDamagedWall){
                tower.repair(closestDamagedWall);
            }
        }

    }

    console.log('CPU Used (TOWER): ' + (Game.cpu.getUsed() - cpu));
    cpu = Game.cpu.getUsed();

    for (var name in Game.rooms){
        var room = Game.rooms[name];
        roomManager.setup(room);
    }

    console.log('CPU Used (ROOMS): ' + (Game.cpu.getUsed() - cpu));
    cpu = Game.cpu.getUsed();

    structureSpawner.run(Game.spawns['Spawn1']);
    structureSpawner.run(Game.spawns['Spawn2']);

    console.log('CPU Used (SPAWN):' + (Game.cpu.getUsed() - cpu));
    cpu = Game.cpu.getUsed();

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

    console.log('CPU Used (CREEPS): ' + (Game.cpu.getUsed() - cpu));
    cpu = Game.cpu.getUsed();
}