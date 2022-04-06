const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentShooterIndex = 202
let width = 15 //15 squares is width of board
let direction = 1
let invadersId = 0
let goingRight = true


for (let i = 0; i < 225; i++) {//for loop to create 225 divs and append to grid class
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [ //indexes where aliens are going to be in
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw() {
    for (let i=0; i < alienInvaders.length; i++) {//loop over all alienInvaders and increment by 1
        squares[alienInvaders[i]].classList.add('invader') //go into squares array and pass through alienInvaders, then add invader class
    }
}

draw()


function remove() {
    for (let i=0; i < alienInvaders.length; i++) {//loop over all alienInvaders and increment by 1
        squares[alienInvaders[i]].classList.remove('invader') //go into squares array and pass through alienInvaders, then remove invader class
    }
}


squares[currentShooterIndex].classList.add('shooter')

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) currentShooterIndex -=1
            break
        case 'ArrowRight':
            if (currentShooterIndex % width < width -1) currentShooterIndex += 1
            break 
    }
    squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter)

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0 //if first invader is on position 0 i.e. on the left edge, that is how we know we are on the left edge, because all these values modules give a remainder of 0 
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
    remove()

    if (rightEdge  && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width +1 //wherever invaders are, I add full width minus 1
            direction = -1
            goingRight = false //good as long as going right = true, but immediatley after change of direction, goingRight=false
        }
    }

    if(leftEdge && !goingRight) { //if i is on leftEdge and not goingRight
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width -1 //the -1 means i has to go back by one (only becomes apparent by testing)
            direction = 1
            goingRight = true                
        }
    }

    for (let i=0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction   //passing through an i means we get each one of the invaders
    }
    draw()

    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) { //if whatever square we are in contains both invader and shooter
        resultsDisplay.innerHTML = 'GAME OVER'
        clearInterval(invadersId)
    }
    for (let i = 0; i < alienInvaders.length; i++) {
        if(alienInvaders[i] > (squares.length)) {
        resultsDisplay.innerHTML = 'GAME OVER'
        clearInterval(invadersId)
                
        }
    }

}

invadersId = setInterval(moveInvaders, 500)

function shoot(e) {
    let laserId
    let currentLaserIndex = //wherever current shooter is on board that is where current laser is going to start from
    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser')//remove laser from where it is
        currentLaserIndex -= width//then move laser up a whole index, i.e. minus a hole width which is minus 15 in width
        squares[currentLaserIndex].classList.add('laser')

    }   
}