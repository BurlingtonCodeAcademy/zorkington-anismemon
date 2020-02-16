// take function to allow player to pick up items from rooms and add to own inventory

answer = "drop the paper"

let currentRoomInv = ["table", "chair", "rock", "lamp"]
let playerInv = ["paper"]


if (answer.split(" ")[0] === 'take' || answer.split(" ")[0] === 'pick' || answer.split(" ")[0] === 'grab') {
    takeItem()
} else if (answer.split(" ")[0] === 'drop' || answer.split(" ")[0] === 'leave') {
    dropItem()
}

function takeItem() {
    let tempArray = []
    for (let item of answer.split(" ")) {


        if (currentRoomInv.includes(item)) {
            let n = currentRoomInv.indexOf(item)
            console.log(n)
            let arrayItem = currentRoomInv.splice(n, 1)
            let roomItem = arrayItem.join()
            playerInv.push(roomItem)
            console.log(playerInv)
            console.log(currentRoomInv)
            tempArray.push(item)
            console.log(tempArray)


        } else if (!currentRoomInv.includes(item)) {
            tempArray = tempArray

        }
    } if (tempArray.length === 0) {
        console.log("What you seek cannot be found.")
    }
}

function dropItem() {
    let tempArray = []
    for (let item of answer.split(" ")) {
        if (playerInv.includes(item)) {
            let n = playerInv.indexOf(item)
            console.log(n)
            let arrayItem = playerInv.splice(n, 1)
            let playerItem = arrayItem.join()
            currentRoomInv.push(playerItem)
            console.log(playerInv)
            console.log(currentRoomInv)
            tempArray.push(item)
            console.log(tempArray)
        } else if (!playerInv.includes(item)) {
            tempArray = tempArray

        }
    } if (tempArray.length === 0) {
        console.log("You cannot leave behind what you do not have.")
    }
}
