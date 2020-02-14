// Tasks to be done \\
// Create working lock function \\

// Build story \\

// Add inventory items to rooms \\

// Figure out how to remove items from arrays \\
// indexof splice \\ 

// Read paper at muddy waters + 2 health points\\

// change room names to actual room names\\

//--------------------------------------------------------------------------------------------------

const chalk = require('chalk');
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//--------------------------------------------------------------------------------------------------

let states = {
  //'MainSt1': { canChangeTo: ['MainSt2', '182 Main St', 'MainSt3'] },
  'MainSt2': { canChangeTo: ['182 Main St', 'MainSt3', 'Muddy Waters'] },
  'MainSt3': { canChangeTo: ['MainSt2', 'Mr Mikes', "182 Main St"] },
  '182 Main St': { canChangeTo: ['Foyer', 'MainSt2', "MainSt3"] },
  'Foyer': { canChangeTo: ['Classroom', '182 Main St'] },
  'Classroom': { canChangeTo: ['Foyer'] },
  'Muddy Waters': { canChangeTo: ['MainSt2'] },
  'Mr Mikes': { canChangeTo: ['MainSt3',] }
};

// State Machine to handle our rooms \\ 

function moveToRoom(newRoom) {
  let validTransitions = states[currentRoom.name].canChangeTo;
  if (validTransitions.includes(newRoom.name)) {
    currentRoom = newRoom;
  } else {
    console.log('Invalid state transition attempted - from ' + currentRoom.name + ' to ' + newRoom.name + "\nChoose a valid direction.")
  }
}
//--------------------------------------------------------------------------------------------------
// Rooms \\

class Room {
  constructor(name, message, inventory, locked = false) {
    this.name = name
    this.message = message
    this.locked = locked
    this.inventory = inventory

  }
}

const room1 = new Room('182 Main St', "\nYou're at 182 Main St.\nThe home of the Burlington Code Academy!\n\nAhead of you is a door.\nDown the street is Mr Mikes and Muddy Waters.\nOn the door is a hand written sign", ["rock", "coin", "chewed gum"], true)
const room2 = new Room('Foyer', "\nYou're in the foyer.\nThe foyer is a foyer.\nThere are stairs ahead of you.\nThe door to 182 Main St. is behind you.\nIt is not locked.", "", true)
const room3 = new Room('Classroom', "\nYou're in the Classroom.\nBob, the instructor, is not currently here.\nHe's probably either making tea or skiing.\nYou could wait for him, but it might be a long wait.\nYou can go back down stairs, or you can stay here.", "")
const room4 = new Room("Muddy Waters", "\nYou're inside Muddy Waters.\nIt's kind of dark since they keep the lights low.\nIt adds atmosphere.", "")
const room5 = new Room("Mr Mikes", "\nYou're inside Mr Mikes.\nSmell the lovely odor of rancid, overcooked oil!\nBeware: if you stay here for more than 2 minutes,\nyour clothes will permanently smell like pizza grease.\nThere is something written on the specials board.", "")

const room7 = new Room('MainSt2', "\nYou're in front of Muddy Waters, one of Burlington's finest cafes.\nThey serve many types of coffee, tea and pastries.\nThe bathrooms also do not require a key!", "")
const room8 = new Room('MainSt3', "\nYou're in front of Mr. Mikes, an ok pizza place that is mostly fequented by students.\nYou can get pizza here if you realllllly want,\nbut I wouldn't recommend it.\nDown the street is 182 main st and Muddy Waters.", "")


//--------------------------------------------------------------------------------------------------
// Other Objects that need to be interacted with \\

const sign = { message: "The password is 12345" }
const rock = {}
const paper = {}
//--------------------------------------------------------------------------------------------------
// Main Function \\

let currentRoom = room1;
let answer = ""

let player = {
  name: "",
  health: 100,
  inventory: [],
  status: function () {
    if (this.health <= 80) {
      return ("Seems like you're getting kinda tired.\nMaybe grab some coffee?")
    }
    else if (this.health <= 90) {
      return ("Looks like you're getting kinda hungry. \nMaybe grab some food.")
    }
    else {
      return " "
    }
  }
}
start();

async function start() {
  player.name = await ask("Before we begin, what is your name?")
  const welcomeMessage = "Good evening fellow student! You're about to tour around our lovely campus.\nSome helpful information along your way:\nTyping i will bring up your inventory.\nTyping h will bring up your health.\nRemember to read the messages closely."
  console.log(welcomeMessage)
  console.log(room1.message);
  console.log('There is a rock on the ground')

  while (answer !== 'exit') {
    answer = (await ask('>_')).trim().toLowerCase()
    player.health--
    console.log(player.status())

    if (answer === 'read sign') {
      console.log(chalk.redBright.underline(sign.message))
    }
    else if (answer === 'h') {
      console.log(player.health)
    }
    else if (answer === 'i') {
      console.log("You are carrying:\n" + player.inventory)
    }
    else if (answer === 'r'){
      console.log(currentRoom)
    }
    else if (answer === "pick up rock") {
      let rock = room1.inventory.pop()

      player.inventory.push(rock)

      console.log(player.inventory)
      console.log(room1.inventory)
    }
    else if (answer === "input password") {
      room2.locked = false
      moveToRoom(room2)
      console.log(chalk.redBright.underline(room2.message))
    }
    else if (answer === "go up stairs") {
      moveToRoom(room3)
      console.log(chalk.redBright.underline(room3.message))
    }
    else if (answer === "go down stairs") {
      moveToRoom(room2)
      console.log(chalk.redBright.underline(room2.message))
    }
    else if (answer === "go to 182 main st") {
      moveToRoom(room1)
      console.log(chalk.redBright.underline(room1.message))
    }
    else if (answer === "go to muddy waters") {
      moveToRoom(room7)
      console.log(chalk.redBright.underline(room7.message))
    }
    else if (answer === "enter muddy waters") {
      moveToRoom(room4)
      console.log(chalk.redBright.underline(room4.message))
      let coffeeQuestion = await ask("Would you like to buy a coffee?\n>_")
      if (coffeeQuestion === "yes") {
        player.health = player.health + 5
        console.log("What next?")
      } else {
        console.log("What next?")
      }
    }
    else if (answer === "exit muddy waters") {
      moveToRoom(room7)
      console.log(chalk.redBright.underline(room7.message))
    }
    else if (answer === "go to mr mikes" || answer === "go to mr. mikes") {
      moveToRoom(room8)
      console.log(chalk.redBright.underline(room8.message))
    }
    else if (answer === "enter mr mikes" || answer === "enter mr. mikes") {
      moveToRoom(room5)
      console.log(chalk.redBright.underline(room8.message))
      let pizzaQuestion = await ask("Would you like to buy some pizza?\n>_")
      if (pizzaQuestion === "yes") {
        player.health = player.health + 10
        console.log("What next?")
      } else {
        console.log("What next?")
      }
    }
    else if (answer === "exit mr mikes" || answer === "exit mr. mikes" || answer === "leave mr mikes" || answer === "leave mr. mikes") {
      moveToRoom(room8)
      console.log(chalk.redBright.underline(room8.message))
    }
  
    else {
      console.log("Sorry, I dont understand " + answer + "!")
    }
  }
  process.exit()
}
//--------------------------------------------------------------------------------------------------
// In Game Functions \\

