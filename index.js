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
  'Main St': { canChangeTo: ['Muddy Waters', 'Mr. Mikes', '182 Main St' ] },
  '182 Main St': { canChangeTo: ['Foyer', 'Main St']},
  'Foyer': { canChangeTo: [ 'Classroom', '182 Main St' ] },
  'Classroom': { canChangeTo: [ 'Foyer' ] },
  'Muddy Waters' : {canChangeTo: ['Main St']},
  'Mr Mikes' : {canChangeTo: ['Main St']}
};
//Updated State Machine to handle our rooms. 

//--------------------------------------------------------------------------------------------------

let currentRoom = "room1";

function e(newState) {
  let validTransitions = states[currentState].canChangeTo;
  if (validTransitions.includes(newState)) {
    currentState = newState;
  } else {
    throw 'Invalid state transition attempted - from ' + currentState + ' to ' + newState;
  }
}


//--------------------------------------------------------------------------------------------------
// Created the basic room objects. Will need to add more to these

let room1 = {
  name : "182 Main St",
}
let room2 = {
  name: "Foyer"
}

let room3 = {
  name : "Classroom"
}

let room4 = {
  name : "Muddy Waters"
}

let room5 = {
  name : "Mr. Mikes"
}

let room6 = {
  name : "Main St"
}

//--------------------------------------------------------------------------------------------------


start();

async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;
  let answer = await ask(welcomeMessage);
  console.log('Now write your code to make this work!');
  process.exit();
}
