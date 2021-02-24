let myGamePiece
let myObstacle

// invoke myGameArea.start() method, creates games component
startGame = () => {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myObstacle = new component(10, 200, "green", 300, 120)
    myGameArea.start();
}

//hjhjh
let myGameArea = {
    canvas: document.createElement('canvas'),
    start: function() {
        this.canvas.width = 480
        this.canvas.height = 270
        this.context = this.canvas.getContext('2d')
        document.body.insertBefore(this.canvas, document.body.childNodes[0])
        this.interval = setInterval(updateGameArea, 20)
        window.addEventListener('keydown', e => {
            myGameArea.keys = (myGameArea.keys || [])
            myGameArea.keys[e.keyCode] = true
        })
        window.addEventListener('keyup', e => myGameArea.keys = false)
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    stop: function() {
        clearInterval(this.interval)
    }
}

// setter - constructor which adds components onto gamearea
function component (width, height, color, x, y) {
    this.width = width
    this.height = height
    this.speedX = 0
    this.speedY = 0
    this.x = x
    this.y = y
    this.update = () => {
        ctx = myGameArea.context
        ctx.fillStyle = color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    this.newPos = () => {
        this.x += this.speedX
        this.y += this.speedY        
    }  
    this.crashWith = object => {
        let myLeft = this.x
        let myRight = this.x + this.width
        let myTop = this.y
        let myBottom = this.y + this.height
        let objectLeft = object.x
        let objectRight = object.x + object.width
        let objectTop = object.y
        let objectBottom = object.y + object.height
        let crash = true
        if (myBottom < objectTop || myTop > objectBottom || myRight < objectLeft || myLeft > objectRight) {
            crash = false
        }
        return crash
    }
}

function updateGameArea() {
    if (myGamePiece.crashWith(myObstacle)) {
        myGameArea.stop()
    } else {
        myGameArea.clear()
        myObstacle.x += -1
        myObstacle.update()
        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0;
        if (myGameArea.keys && myGameArea.keys[37]) myGamePiece.speedX = -1
        if (myGameArea.keys && myGameArea.keys[39]) myGamePiece.speedX = 1
        if (myGameArea.keys && myGameArea.keys[38]) myGamePiece.speedY = -1
        if (myGameArea.keys && myGameArea.keys[40]) myGamePiece.speedY = 1
        myGamePiece.newPos()
        myGamePiece.update()
    }
}

stopMove = () => {
    myGamePiece.speedX = 0
    myGamePiece.speedY = 0
}

moveup = () => myGamePiece.speedY -= 1

  
movedown = () => myGamePiece.speedY += 1

  
moveleft = () => myGamePiece.speedX -= 1

  
moveright = () => myGamePiece.speedX += 1


