// Tasks to be done \\
// Create working lock function \\

// Build story \\

// Add inventory items to rooms \\

// Figure out how to remove items from arrays \\
// indexof splice \\ 

// Read paper at muddy waters + 2 health points\\

// change room names to actual room names\\

//--------------------------------------------------------------------------------------------------

// const chalk = require('chalk'); chalk does not work on my machine - it throws an error
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
    console.log('Invalid state transition attempted - from ' + currentRoom.name + ' to ' + newRoom.name + "\nPlease choose a valid direction.")
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

const main182 = new Room('182 Main St', "\nYou're at 182 Main St.\nThe home of the Burlington Code Academy!\n\nDown the street are Mr. Mikes and Muddy Waters.\nAhead of you is a door.\nOn the door is a hand written sign.\n", ["rock", "coin", "chewed gum"], true)
const foyer = new Room('Foyer', "\nYou're in the foyer.\nThe foyer is a foyer.\nThere are stairs ahead of you.\nThe door to 182 Main St. is behind you.\nIt is not locked.", "", true)
const classroom = new Room('Classroom', "\nYou're in the Classroom.\nBob, the instructor, is not currently here.\nHe's probably either making tea or skiing.\nYou could wait for him, but it might be a long wait.\nYou can go back down stairs, or you can stay here.", "")
const muddyWaters = new Room("Muddy Waters", "\nYou're inside Muddy Waters.\nIt's kind of dark since they keep the lights low.\nIt adds atmosphere.", "")
const mrMikes = new Room("Mr Mikes", "\nYou're inside Mr Mikes.\nSmell the lovely odor of rancid, overcooked oil!\nBeware: if you stay here for more than 2 minutes,\nyour clothes will permanently smell like pizza grease.\nThere is something written on the specials board.", "")
const mainSt2 = new Room('MainSt2', "\nYou're in front of Muddy Waters, one of Burlington's finest cafes.\nThey serve many types of coffee, tea and pastries.\nThe bathrooms also do not require a key!", "")
const mainSt3 = new Room('MainSt3', "\nYou're in front of Mr. Mikes, an ok pizza place that is mostly fequented by students.\nYou can get pizza here if you realllllly want,\nbut I wouldn't recommend it.\nDown the street are the Muddy Waters and the Burlington Code Academy.", "")


//--------------------------------------------------------------------------------------------------
// Other Objects that need to be interacted with \\

const sign = { message: "The password is 12345" }
const rock = {}
const paper = {}
//--------------------------------------------------------------------------------------------------
// Main Function \\

let currentRoom = main182;
let answer = ""
let playerName = ""
let player = {
  name: playerName,
  health: 100,
  inventory: [],
  status: function () {
    if (this.health <= 80) {
      return ("Seems like you're getting kinda tired.\nMaybe grab some coffee?")
    }
    else if (this.health <= 90) {
      return ("Looks like you're getting kinda hungry.\nMaybe grab some food?")
    }
    else {
      return " "
    }
  }
}
start();

async function start() {

  // this is the set up to the game: 

  playerName = await ask("Before we begin, what is your name? ")
  const welcomeMessage = ("Good evening, " + playerName + ". You're about to tour lovely downtown Burlington.")
  console.log(welcomeMessage)
  infoResponse = await ask("Hit enter for some useful information.")
  console.log("\nKeep these tips in mind as you play:\n\n     Typing i will bring up your inventory.\n     Typing h will bring up your health.\n     Typing r will tell you which room you're in.\n\nAnd be sure to read the messages carefully!\n")
  beginGame = await ask("Ready? Just hit enter to begin. ")
  console.log(main182.message);
  console.log('There is a shiny rock on the ground.')
  console.log(player)

  // this loop contains the entire game logic: 

  while (answer !== 'exit') {
    answer = (await ask('>_')).trim().toLowerCase()
    player.health--
    console.log(player.status())

    if (answer === 'read sign') {
      console.log(/*chalk.redBright.underline*/(sign.message))
    }
    else if (answer === 'h') {
      console.log(player.health)
    }
    else if (answer === 'i') {
      console.log("You are carrying:\n" + player.inventory)
    }
    else if (answer === 'r') {
      console.log(currentRoom)
    }
    else if (answer === "pick up rock" || answer === "take rock" || answer === "grab rock") {
      item = "rock"
      takeItem(item)
    }
    else if (answer === "drop rock" || answer === "leave rock") {
      item = "rock"
      dropItem(item)
    }
    else if (answer === "open door" || answer === "enter 182 main") {
      console.log("Bzzzzzt!\n~Hint~\nMaybe try a password.")
    }
    else if (answer === "input password" || answer === "12345") {
      unlock(foyer)
      moveToRoom(foyer)
      console.log(/*chalk.redBright.underline*/(foyer.message))
    }
    else if (answer === "go up stairs") {
      moveToRoom(classroom)
      console.log(/*chalk.redBright.underline*/(classroom.message))
    }
    else if (answer === "go down stairs") {
      moveToRoom(foyer)
      console.log(/*chalk.redBright.underline*/(foyer.message))
    }
    else if (answer === "go to 182 main st") {
      moveToRoom(main182)
      console.log(/*chalk.redBright.underline*/(main182.message))
    }
    else if (answer === "go to muddy waters") {
      moveToRoom(mainSt2)
      console.log(/*chalk.redBright.underline*/(mainSt2.message))
    }
    else if (answer === "enter muddy waters") {
      moveToRoom(muddyWaters)
      console.log(/*chalk.redBright.underline*/(muddyWaters.message))
      let coffeeAnswer = await ask("Would you like to get a coffee?\n>_")
      if (coffeeAnswer === "yes") {
        player.health = player.health + 5
        console.log("What next?")
      } else {
        console.log("What next?")
      }
    }
    else if (answer === "exit muddy waters") {
      moveToRoom(mainSt2)
      console.log(/*chalk.redBright.underline*/(mainSt2.message))
    }
    else if (answer === "go to mr mikes" || answer === "go to mr. mikes") {
      moveToRoom(mainSt3)
      console.log(/*chalk.redBright.underline*/(mainSt3.message))
    }
    else if (answer === "enter mr mikes" || answer === "enter mr. mikes") {
      moveToRoom(mrMikes)
      console.log(/*chalk.redBright.underline*/(mainSt3.message))
      let pizzaAnswer = await ask("Would you like to get some pizza?\n>_")
      if (pizzaAnswer === "yes") {
        player.health = player.health + 10
        console.log("What next?")
      } else {
        console.log("What next?")
      }
    }
    else if (answer === "exit mr mikes" || answer === "exit mr. mikes" || answer === "leave mr mikes" || answer === "leave mr. mikes") {
      moveToRoom(mainSt3)
      console.log(/*chalk.redBright.underline*/(mainSt3.message))
    }
    else if (answer === 'go to sleep' || answer === 'sleep') {
      console.log('Congrats! You found the goal of our game. To sleep... Something we all need!')
      process.exit()
    }

    else {
      console.log("Sorry, I don't understand '" + answer + "'!")
    }
  }
  process.exit()
}
//--------------------------------------------------------------------------------------------------
// In Game Functions \\

// takeItem function to allow player to pick up items from rooms and add to own inventory; checks if item is actually in the current room's inventory

function takeItem() {
  if (!currentRoom.inventory.includes(item)) {
    console.log("The item you seek cannot be found.")
  } else {
    let n = currentRoom.inventory.indexOf(item)
    console.log(n)
    let arrayItem = currentRoom.inventory.splice(n, 1)
    let roomItem = arrayItem.join()
    player.inventory.push(roomItem)
    console.log(player.inventory)
    console.log(currentRoom.inventory)
  }
}

// dropItem function to allow player to drop an item from their inventory; item is then added to current room inventory; checks if the item is actually in the player's inventory

function dropItem() {
  if (!player.inventory.includes(item)) {
    console.log("You cannot leave behind what you do not have.")
  } else {
    let n = player.inventory.indexOf(item)
    console.log(n)
    let arrayItem = player.inventory.splice(n, 1)
    let roomItem = arrayItem.join()
    currentRoom.inventory.push(roomItem)
    console.log(player.inventory)
    console.log(currentRoom.inventory)
  }
}

// allows user to unluck the door to the foyer and any other we choose to have locked

function unlock(room) {
  if (room.locked = true && answer === "input password" || answer === "12345") {
    room.locked = false
    console.log("The door unlocks with an audible click.")

  }
}