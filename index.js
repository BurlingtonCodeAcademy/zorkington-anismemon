
const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//--------------------------------------------------------------------------------------------------

let states = {
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

const main182 = new Room('182 Main St', "\nYou're at 182 Main St.\nThe home of the Burlington Code Academy!\n\nDown the street are Mr. Mikes and Muddy Waters.\nAhead of you is a door.\nOn the door is a hand-written sign.\n", ["rock", "coin", "chewed gum"], true)
const foyer = new Room('Foyer', "\nYou're in the foyer.\nThe foyer is a foyer.\nThere are stairs ahead of you.\nThe door to 182 Main St. is behind you.\nIt is not locked.", "", true)
const classroom = new Room('Classroom', "\nYou're in the Classroom.\nBob, the instructor is waiting patiently to start class.\nYou can go back down stairs, stay here and attend class.\nOr maybe talk to Bob.\nYou see a really cool Burlington code academy pen.\nAnd a really comfy looking couch... did someone say sleep?", ["pen"])
const muddyWaters = new Room("Muddy Waters", "\nYou're inside Muddy Waters.\nIt's kind of dark since they keep the lights low.\nIt adds atmosphere.\nThere is a newspaper rack with the current\nedition of 7Days.\n\nPsssst... Bob likes tea", ["paper", "napkins", "tea"])
const mrMikes = new Room("Mr Mikes", "\nYou're inside Mr Mikes.\nSmell the lovely odor of rancid, overcooked oil!\nBeware: if you stay here for more than 2 minutes,\nyour clothes will permanently smell like pizza grease.\nThere is something written on the specials board.", ["napkins"])
const mainSt2 = new Room('MainSt2', "\nYou're in front of Muddy Waters, one of Burlington's finest cafes.\nThey serve many types of coffee, tea and pastries.\nThe bathrooms also do not require a key!\nFrom here you can go to 182 Main st or Mr. Mikes", "")
const mainSt3 = new Room('MainSt3', "\nYou're in front of Mr. Mikes, an ok pizza place that is mostly fequented by students.\nYou can get pizza here if you realllllly want,\nbut I wouldn't recommend it.\nDown the street are the Muddy Waters and the Burlington Code Academy.", "")

//--------------------------------------------------------------------------------------------------
//  objects that have messages \\

const sign = { message: "The password is 12345" }
const paper = { message: "The headline reads: 'President Sanders Changes Constitution to Become\nPresident For Life.'" }
const mikesSpecials = { message: "The board says: 'We're out of anchovies today. Sorry.'" }

//--------------------------------------------------------------------------------------------------
// Main Function \\

let currentRoom = main182;
let answer = ""
let playerName = ""
let item = ""

// Bob object

let bob = {
  name: "Bob",
  health: 25,
  inventory: [""],
  tiredMessage: "hsdbvkfdbdfjbnfkjbnv",
  rejuvenateMessage: "Hi " + playerName + "Thanks for the tea! Now we can begin class! You should go sit and get ready for class.",
  status: function () {
    if (this.invetory = ["tea"] && player.inventory.includes("tea")) {
      return this.rejuvenateMessage
    }
    else {
      return " "
    }
  }
}



// Our player object

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


  // this loop contains the entire game logic: 
  // Most statements are pretty explanatory as to what they do.

  while (answer !== 'exit') {
    answer = (await ask('>_')).trim().toLowerCase()
    player.health--
    console.log(player.status())
    let arrayAnswer = answer.split(" ")[0]

    if (answer === 'read sign') {
      console.log(sign.message)
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

    //--------------------------------------------------------------------------------------------------
    // Drop & Add Logic \\

    else if (arrayAnswer === 'take' || arrayAnswer === 'pick' || arrayAnswer === 'grab' || arrayAnswer === 'get') {
      takeItem()
    }
    else if (arrayAnswer === 'drop' || arrayAnswer === 'leave') {
      dropItem()
    }

    //--------------------------------------------------------------------------------------------------
    //Foyer & 182 Main Logic \\

    else if (answer === "open door" || answer === "enter 182 main") {
      console.log("Bzzzzzt!\n~Hint~\nMaybe try a password.")
    }
    else if (answer === "input password" || answer === "12345") {
      unlock(foyer)
      moveToRoom(foyer)
      console.log(foyer.message)
    }
    else if (answer === "go up stairs") {
      moveToRoom(classroom)
      console.log(classroom.message)
    }
    else if (answer === "go down stairs") {
      moveToRoom(foyer)
      console.log(foyer.message)
    }
    else if (answer === "go to 182 main st" || answer === "exit foyer" || answer === "go to 182") {
      moveToRoom(main182)
      console.log(main182.message)
    }

    //--------------------------------------------------------------------------------------------------
    // Muddy Waters Logic \\

    else if (answer === "go to muddy waters" || answer === "go to muddy") {
      moveToRoom(mainSt2)
      console.log(mainSt2.message)
    }
    else if (answer === "enter muddy waters" || answer === "enter muddy") {
      moveToRoom(muddyWaters)
      console.log(muddyWaters.message)
      let coffeeAnswer = await ask("Would you like to get a coffee?\n>_")
      if (coffeeAnswer === "yes") {
        player.health = player.health + 5
        console.log("That's sooooome java!")
      } else {
        console.log("What next?")
      }
    }
    else if (answer === "read paper" || answer === "open paper" || answer === "read 7 days" || answer === "open 7 days" || answer === "read 7days" || answer === "open 7days") {
      console.log(paper.message)
      console.log("In your excitement at the headline, you accidentally run your hand on some gum stuck under your chair.")
      player.health = player.health + 2
    }
    else if (answer === "remove gum" || answer === "rub off gum" || answer === "try to remove gum" || answer === "wipe off gum" || answer === "clean hands" || answer === "clean gum" || answer === "clean off gum") {
      console.log("That's some tenacious gum. You'll need to wash it off in the bathroom.\nAnd remember: you don't need a key!")
    }

    else if (answer === "drink coffee") {
      console.log("That's better!")
    }
    else if (answer === "exit muddy waters" || answer === "exit muddy") {
      moveToRoom(mainSt2)
      console.log(mainSt2.message)
    }

    //--------------------------------------------------------------------------------------------------
    // Bathroom logic for Muddy Waters and Mr. Mikes \\

    else if (answer === "use bathroom" && (currentRoom === muddyWaters || currentRoom === mrMikes) || answer === "go to the bathroom" && (currentRoom === muddyWaters || currentRoom === mrMikes) || answer === "go to bathroom" && (currentRoom === muddyWaters || currentRoom === mrMikes)) {
      console.log("That's better! But remember: All employees must wash hands before returning to work...\nand so should you!")
    }
    else if (answer === "wash hands") {
      console.log("Good hygiene is essential. Who wants to catch the corona virus?")
    }
    else if (answer === "use bathroom" && (currentRoom !== muddyWaters || currentRoom !== mrMikes) || answer === "go to the bathroom" && (currentRoom !== muddyWaters || currentRoom !== mrMikes)) {
      console.log("Hey! It may be urgent, but please try to find a place that actually has a bathroom!")
    }

    //--------------------------------------------------------------------------------------------------
    // Mr Mikes Logic \\

    else if (answer === "go to mr mikes" || answer === "go to mr. mikes") {
      moveToRoom(mainSt3)
      console.log(mainSt3.message)
    }
    else if (answer === "enter mr mikes" || answer === "enter mr. mikes") {
      moveToRoom(mrMikes)
      console.log(mrMikes.message)
    }
    else if (answer === "read specials board" || answer === "read specials") {
      console.log(mikesSpecials.message)
      let pizzaAnswer = await ask("Would you like to get some pizza?\n>_")
      if (pizzaAnswer === "yes") {
        player.health = player.health + 10
        console.log("I'd recommend stocking up on napkins.")
      } else {
        console.log("Okay, so What next?")
      }
    }
    else if (answer === "exit mr mikes" || answer === "exit mr. mikes" || answer === "leave mr mikes" || answer === "leave mr. mikes") {
      moveToRoom(mainSt3)
      console.log(mainSt3.message)
    }

    //--------------------------------------------------------------------------------------------------
    // Classroom logic \\

    else if (answer === "sit down" || answer === "sit") {
      player.health = player.health - 10
      console.log("Wow, that was a long class!")
    }
    else if (answer === "talk to bob") {
      (console.log(bob.tiredMessage))
    }
    else if (arrayAnswer === 'give' && answer.split(" ")[1] === "bob") {
      giveBob()
      console.log(bob.status())
    }
    else if (answer === 'go to sleep' || answer === 'sleep') {
      console.log('Congrats! You found the goal of our game. To sleep... Something we all need!')
      process.exit()
    }
    else if (answer === 'exit class') {
      moveToRoom(foyer)
      console.log(foyer.message)
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
  let tempArray = []
  for (let item of answer.split(" ")) {

    if (currentRoom.inventory.includes(item)) {
      let indexOfItem = currentRoom.inventory.indexOf(item)
      let arrayItem = currentRoom.inventory.splice(indexOfItem, 1)  
      let roomItem = arrayItem.join()   
      player.inventory.push(roomItem)
      tempArray.push(item)
      console.log(capitalize(item) + " added to your inventory.")
      console.log(player.inventory)

    } tempArray = tempArray

  } if (tempArray.length === 0) {
    console.log("What you seek cannot be found.")
  }
}

// dropItem function to allow player to drop an item from their inventory; item is then added to current room inventory; checks if the item is actually in the player's inventory

function dropItem() {
  let tempArray = []
  for (let item of answer.split(" ")) {

    if (player.inventory.includes(item)) {
      let indexOfItem = player.inventory.indexOf(item)
      let arrayItem = player.inventory.splice(indexOfItem, 1)      
      let playerItem = arrayItem.join()
      currentRoom.inventory.push(playerItem)
      tempArray.push(item)
      console.log(capitalize(item) + ' removed from your inventory.')

    } tempArray = tempArray

  } if (tempArray.length === 0) {
    console.log("You cannot leave behind what you do not have.")
  }
}

// Give bob stuff function

function giveBob() {
  let tempArray = []
  for (let item of answer.split(" ")) {

    if (player.inventory.includes(item)) {
      let indexOfItem = player.inventory.indexOf(item)
      let arrayItem = player.inventory.splice(indexOfItem, 1)      
      let playerItem = arrayItem.join()
      bob.inventory.push(playerItem)
      tempArray.push(item)
      console.log(capitalize(item) + ' removed from your inventory.')

    } tempArray = tempArray
    
  } if (tempArray.length === 0) {
    console.log("You cannot give what you do not have.")
  }
}


// unlock function allows user to unluck the door to the foyer and any other we choose to have locked

function unlock(room) {
  if (room.locked = true && answer === "input password" || answer === "12345") {
    room.locked = false
    console.log("The door unlocks with an audible click.")

  }
}

// capitalize function to capitalize the first letter of words (only used here for taking / adding)

function capitalize(string) {
  string = string.toString().trim()
  return string[0].toUpperCase() + string.slice(1).toLowerCase()
}
