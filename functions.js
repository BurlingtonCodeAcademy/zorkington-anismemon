// take function to allow player to pick up items from rooms and add to own inventory

// userInput = "take rock"

let roomInv = ["table", "chair", "rock", "lamp"]
let playerInv = ["paper"]

let item = "rock"
takeItem()


function takeItem() {
    // let inputArray = userInput.split(" ")
    // console.log(inputArray)
    // let item = inputArray[1]
    // console.log(item)
    let n = roomInv.indexOf(item)
    console.log(n)
    let arrayItem = roomInv.splice(n, 1)
    let roomItem = arrayItem.join()
    playerInv.push(roomItem)
    console.log(playerInv)
    console.log(roomInv)
}


// drop function to allow player to drop an item from his / her inventory, which is added to current room inventory

// userInput = "drop rock"

// let roomInv = ["table", "chair", "lamp"]
// let playerInv = ["paper", "rock"]

// function dropItem() {
//     let inputArray = userInput.split(" ")
//     console.log(inputArray)
//     let item = inputArray[1]
//     console.log(item)
//     let n = playerInv.indexOf(item)
//     console.log(n)
//     let arrayItem = playerInv.splice(n, 1)
//     let playerItem = arrayItem.join()
//     roomInv.push(playerItem)
//     console.log(playerInv)
//     console.log(roomInv)
// }


