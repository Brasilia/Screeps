var structureSpawner = {
  run: function(spawner){
      var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
      var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
      var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
      var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
      var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
      var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
      
      if (harvesters.length < 1){
          spawner.createCreep([MOVE, CARRY, WORK, WORK], undefined, {role: 'harvester', source: 0});
          console.log('Harvesters: ' + harvesters.length);
          console.log('Spawning harvester');
      } else {
          if (builders.length < 5 && spawner.room.find(FIND_CONSTRUCTION_SITES).length){ // se não há builders suficientes e há locais de construção
              spawner.createCreep([MOVE, CARRY, WORK, WORK], undefined, {role: 'builder', source: 1});
              console.log('Builders: ' + builders.length);
              console.log('Spawning builder');
          } else {
              if (upgraders.length < 8 - builders.length - transporters.length){
                  spawner.createCreep([MOVE, MOVE, CARRY, CARRY, WORK], undefined, {role: 'upgrader', source: 0});
                  console.log('Upgraders: ' + upgraders.length);
                  console.log('Spawning upgrader');
              }
              //else {
                  if (transporters.length < 1){
                      spawner.createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], undefined, {role: 'transporter', source: 0});
                      console.log('Transporters: ' + transporters.length);
                      console.log('Spawning transporter');
                  }
              //}
          }
      }
  }  
    
};

module.exports = structureSpawner;