const chalk = require('chalk');
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// remember the StateMachine lecture
// https://bootcamp.burlingtoncodeacademy.com/lessons/cs/state-machines

let states = {
  'Main St': { canChangeTo: ['Muddy Waters', 'Mr. Mikes', '182 Main St'] },
  '182 Main St': { canChangeTo: ['Foyer', 'Main St'] },
  'Foyer': { canChangeTo: ['Classroom', '182 Main St'] },
  'Classroom': { canChangeTo: ['Foyer'] },
  'Muddy Waters': { canChangeTo: ['Main St'] },
  'Mr Mikes': { canChangeTo: ['Main St'] }
};
//Updated State Machine to handle our rooms. 

//--------------------------------------------------------------------------------------------------



function moveToRoom(newRoom) {
  let validTransitions = states[currentRoom.name].canChangeTo;
  if (validTransitions.includes(newRoom.name)) {
    currentRoom = newRoom;
  } else {
    throw 'Invalid state transition attempted - from ' + currentRoom + ' to ' + newRoom;
  }
}

//--------------------------------------------------------------------------------------------------
// Created the basic room objects. Will need to add more to these
// player object
// room directions
let player = {
  health: 100,
  status: function(){
// status is going to help determine players energy level or hunger level
  }

}
class Room {
  constructor(name, message, north, south, east, west, locked = false) {
    this.name = name
    this.message = message
    this.locked = locked

    this.north = north
// north south east and west are going to help our character move. I think there needs to be a function involved
    this.south = south

    this.east = east

    this.west = west
  }

}


const room1 = new Room('182 Main St', "You're at 182 Main St", true)
const room2 = new Room('Foyer', "You're in the Foyer")
const room3 = new Room('Classroom', "You're in the Classroom")
const room4 = new Room("Muddy Waters", "You're at Muddy Waters")
const room5 = new Room("Mr Mikes", "You're at Mr Mikes")
const room6 = new Room("Main St", "You're on Main St")

const sign = {message: "The password is 12345"}
//--------------------------------------------------------------------------------------------------

let currentRoom = room1;
start();
locked();

async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
  let answer = await ask(welcomeMessage);

}
  console.log('Now write your code to make this work!');
  process.exit();



function locked() {
  if (Room.locked == true)
    console.log(chalk.bold.red('Bzzzzt Locked!'))
}