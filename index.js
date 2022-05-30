//const canvas = document.querySelector('canvas');
const canvas = document.createElement('canvas')
const c = canvas.getContext('2d');

const music23 = new Audio('./audio/scene23music.wav')
music23.loop = true
const music4 = new Audio('./audio/scene4music.wav')
music4.loop = true
const music5 = new Audio('./audio/scene5music.wav')
music5.loop = true
//music.loop = true

canvas.width = 480;
canvas.height = 720; 
c.fillRect(0, 0, canvas.width, canvas.height);

//global variables
let lastJump = Date.now();
let gravity = 0.7;
let force = 0;
let jumpGauge = 0;
const jumpMaxGauge = 2000;

//Instance of background
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    width: 480,
    height: 720,
    imgSrc: './img/Background/bgreal-export.png'
})
//Instances of platforms with colliders in mid
const platforms = [new Sprite({
    position: {
        x: 300,
        y: 400
    },
    width: 100,
    height: 42,
    imgSrc: './img/Background/platform1.png',
    borderY: 1,
    borderWidth: 1

}), new Sprite({
    position: {
        x: 0,
        y: 280
    },
    width: 205,
    height: 53,
    imgSrc: './img/Background/sideplatform.png',
    borderY: 1,
    borderWidth: 1
}), new Sprite({
    position: {
        x: 200,
        y: 100
    },
    width: 105,
    height: 53,
    imgSrc: './img/Background/groundsmall.png',
    borderY: 1,
    borderWidth: 1
}), new Sprite({
    position: {
        x: 190,
        y: 600
    },
    width: 105,
    height: 53,
    imgSrc: './img/Background/groundsmall.png',
    borderY: 1,
    borderWidth: 1
}), new Sprite({
    position: {
        x: 00,
        y: 700
    },
    width: 480,
    height: 47,
    imgSrc: './img/Background/scene1ground.png',
    borderY: 1,
    borderWidth: 1
})]

const backgroundScene2 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    width: 480,
    height: 720,
    imgSrc: './img/Background/bgreal-scene2new.png'
})

const platformsScene2 = [ new Sprite({
    position: {
        x: 165,
        y: 530
    },
    width: 105,
    height: 53,
    imgSrc: './img/Background/groundsmall.png',
    borderY: 1,
    borderWidth: 1
}), new Sprite({
    position: {
        x: 185,
        y: 100
    },
    width: 105,
    height: 53,
    imgSrc: './img/Background/groundsmall.png',
    borderY: 1,
    borderWidth: 1
}), new Sprite({
    position: {
        x: 290,
        y: 330
    },
    width: 105,
    height: 53,
    imgSrc: './img/Background/groundsmall.png',
    borderY: 1,
    borderWidth: 1
}), new Sprite({
    position: {
        x: 0,
        y: 220
    },
    width: 100,
    height: 42,
    imgSrc: './img/Background/platform1.png',
    borderY: 1,
    borderWidth: 1
}),new Sprite({
    position: {
        x: 280,
        y: -30
    },
    width: 30,
    height: 171,
    imgSrc: './img/Background/highwallnormal.png',
    borderY : 1,
    borderWidth: 1,
    isWall: true
})]

const backgroundScene3 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    width: 480,
    height: 720,
    imgSrc: './img/Background/bgreal-scene3.png'
})

const platformsScene3 = [new Sprite({
    position: {
        x: 110,
        y: 400
    },
    width: 48,
    height: 55,
    imgSrc: './img/Background/platform2redt.png',
    borderY : 1,
    borderWidth : 1
}),new Sprite({
    position: {
        x: 385,
        y: 630
    },
    width: 48,
    height: 55,
    imgSrc: './img/Background/platform2redt.png',
    borderY: 1,
    borderWidth: 1
}), new Sprite({
    position: {
        x: 30,
        y: 90
    },
    width: 48,
    height: 55,
    imgSrc: './img/Background/platform2redt.png',
    borderY: 1,
    borderWidth: 1
}),new Sprite({
    position: {
        x: 250,
        y: 150
    },
    width: 74,
    height: 37,
    imgSrc: './img/Background/newcloud.png',
    borderY : 160,
    borderWidth: 1
}),new Sprite({
    position: {
        x: 305,
        y: 270
    },
    width: 30,
    height: 171,
    imgSrc: './img/Background/highwall.png',
    borderY : 1,
    borderWidth: 1,
    isWall: true
}),new Sprite({
    position: {
        x: 280,
        y: 638
    },
    width: 30,
    height: 171,
    imgSrc: './img/Background/highwall.png',
    borderY : 1,
    borderWidth: 1,
    isWall: true
})]


const backgroundScene4 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    width: 480,
    height: 720,
    imgSrc: './img/Background/bgreal-scene4.png'
})

const platformsScene4 = [new Sprite({
    position: {
        x: 30,
        y: 610
    },
    width: 74,
    height: 37,
    imgSrc: './img/Background/newcloud.png',
    borderY : 625,
    borderWidth : 1
}), new Sprite({
    position: {
        x: 220,
        y: 550
    },
    width: 45,
    height: 32,
    imgSrc: './img/Background/cloudsmall.png',
    borderY : 560,
    borderWidth: 1
}), new Sprite({
    position: {
        x: 100,
        y: 300
    },
    width: 45,
    height: 32,
    imgSrc: './img/Background/cloudsmall.png',
    borderY : 310,
    borderWidth: 1
}), new Sprite({
    position: {
        x: 230,
        y: 100
    },
    width: 74,
    height: 37,
    imgSrc: './img/Background/newcloud.png',
    borderY : 110,
    borderWidth: 1
}),new Sprite({
    position: {
        x: 345,
        y: -10
    },
    width: 30,
    height: 294,
    imgSrc: './img/Background/highwallscene52.png',
    borderY : 1,
    borderWidth: 1,
    isWall: true
}),new Sprite({
    position: {
        x: 345,
        y: 480
    },
    width: 30,
    height: 294,
    imgSrc: './img/Background/highwallscene52.png',
    borderY : 1,
    borderWidth: 1,
    isWall: true
})]

const backgroundScene5 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    width: 480,
    height: 720,
    imgSrc: './img/Background/bgreal-scene5.png'
})

const platformsScene5 = [new Sprite({
    position: {
        x: 250,
        y: 600
    },
    width: 48,
    height: 48,
    imgSrc: './img/Background/platformscene52.png',
    borderY : 1,
    borderWidth : 1
}), new Sprite({
    position: {
        x: 350,
        y: 400
    },
    width: 38,
    height: 45,
    imgSrc: './img/Background/platformscene523.png',
    borderY : 1,
    borderWidth: 1
}), new Sprite({
    position: {
        x: 350,
        y: 300
    },
    width: 38,
    height: 45,
    imgSrc: './img/Background/platformscene523.png',
    borderY : 1,
    borderWidth: 1
}), new Sprite({
    position: {
        x: 80,
        y: 210
    },
    width: 38,
    height: 45,
    imgSrc: './img/Background/platformscene523.png',
    borderY : 1,
    borderWidth: 1
}), new Sprite({
    position: {
        x: 230,
        y: 80
    },
    width: 258,
    height: 55,
    imgSrc: './img/Background/platformscene5groundwall.png',
    borderY : 1,
    borderWidth: 1,
    isWall: true
}),new Sprite({
    position: {
        x: 230,
        y: 250
    },
    width: 30,
    height: 224,
    imgSrc: './img/Background/highwallscene5.png',
    borderY : 1,
    borderWidth: 1,
    isWall: true
}),new Sprite({
    position: {
        x: 345,
        y: 700
    },
    width: 30,
    height: 294,
    imgSrc: './img/Background/highwallscene52.png',
    borderY : 1,
    borderWidth: 1,
    isWall: true
})]

const backgroundScene6 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    width: 480,
    height: 720,
    imgSrc: './img/Background/bgreal-scene6.png'
})

const platformsScene6 = [new Sprite({
    position: {
        x: 60,
        y: 550
    },
    width: 48,
    height: 48,
    imgSrc: './img/Background/scene6rock1png.png',
    borderY : 1,
    borderWidth : 1
}), new Sprite({
    position: {
        x: 350,
        y: 400
    },
    width: 48,
    height: 48,
    imgSrc: './img/Background/scene6rock1png.png',
    borderY : 1,
    borderWidth : 1
}), new Sprite({
    position: {
        x: 100,
        y: 300
    },
    width: 48,
    height: 48,
    imgSrc: './img/Background/scene6rock1png.png',
    borderY : 1,
    borderWidth : 1
}), new Sprite({
    position: {
        x: 230,
        y: 100
    },
    width: 48,
    height: 48,
    imgSrc: './img/Background/scene6rock1png.png',
    borderY : 1,
    borderWidth : 1
})]


//activates platforms colliders
background.collider.isActive = false
backgroundScene2.collider.isActive = false
backgroundScene3.collider.isActive = false
backgroundScene4.collider.isActive = false
backgroundScene5.collider.isActive = false
backgroundScene6.collider.isActive = false

//creating scene 1 and attaching a background and its platforms to it 
const scene1 = new Scene(background,platforms)
const scene2 = new Scene(backgroundScene2,platformsScene2)
const scene3 = new Scene(backgroundScene3,platformsScene3);
const scene4 = new Scene(backgroundScene4,platformsScene4);
const scene5 = new Scene(backgroundScene5,platformsScene5);
const scene6 = new Scene(backgroundScene6,platformsScene6);

//defaulting current scene to scene 1
let currentScene = scene1;

//Instance of player
const player = new Character({
    position: {
    x: 100,
    y: 300},
    velocity: {
    x: 0,
    y: 0
    },
    width: 50,
    height: 71
})

//data for key presses
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false,
        released: false
    },
}
let keyPressed = {};
let keyReleased = {};
let lastKey;
let keyUp;

const fps = 90
//Handling the global updating , gets called every frame
function animate(){
    //calls animate function every window frame
    setTimeout(() => {
        window.requestAnimationFrame(animate)
        //update current scene
        currentScene.update();
        //update the player 
        player.update();
        //handles scene changing 
        sceneHandler();
        //check if jump is at max gauge if true jump 
        if(jumpGauge >= jumpMaxGauge){
            console.log('max gauge')
            player.isJumping = true;
            player.chargeBar.tick.width = 3.7
            jumpGauge = jumpMaxGauge;
            if(keyPressed[65] && lastKey === 'a'){
                player.currentSprite = player.sprites.idle.left
                playAudioOnce('jumpSfx')
                player.velocity.x = -4 - (jumpGauge/550)
                player.velocity.y = -3 - (jumpGauge/100)
                if(currentScene === scene6){
                    player.velocity.y /= 1.6
                    player.velocity.x /= 1.3
                }
                player.isOnPlatform = false
                lastJump = Date.now();
                keyReleased[87] = false
            } else if (keyPressed[68] && lastKey === 'd'){
                player.currentSprite = player.sprites.idle.right
                //jumpSfx.play()
                playAudioOnce('jumpSfx')
                player.velocity.x = 4 + (jumpGauge/550)
                player.velocity.y = -3 - (jumpGauge/100)
                if(currentScene === scene6){
                    player.velocity.y /= 1.6
                    player.velocity.x /= 1.3
                }
                player.isOnPlatform = false
                lastJump = Date.now();
                keyReleased[87] = false
            }else{
                playAudioOnce('jumpSfx')
                player.velocity.y = -3 - (jumpGauge/100)
                if(currentScene === scene6){
                    player.velocity.y /= 1.6
                }
                player.isOnPlatform = false
                lastJump = Date.now();
                keyReleased[87] = false
            }
        jumpGauge = 0
        //check jump input and jump if conditions are met with current jumpGauge
        } else if(keyReleased[87]){
            if(player.isGrounded || player.isOnPlatform){
                player.chargeBar.tick.width = 3.7
                if(keyPressed[65] && lastKey === 'a'){
                    player.currentSprite = player.sprites.idle.left
                    playAudioOnce('jumpSfx')
                    player.velocity.x = -4 - (jumpGauge/550)
                    player.velocity.y = -3 - (jumpGauge/100)
                    if(currentScene === scene6){
                            player.velocity.y /= 1.6
                            player.velocity.x /= 1.3
                    }
                    player.isJumping = true;
                    player.isOnPlatform = false
                    lastJump = Date.now();
                    keyReleased[87] = false
                } else if (keyPressed[68] && lastKey === 'd'){
                    player.currentSprite = player.sprites.idle.right
                    playAudioOnce('jumpSfx')
                    player.velocity.x = 4 + (jumpGauge/550)
                    player.velocity.y = -3 - (jumpGauge/100)
                    if(currentScene === scene6){
                        player.velocity.y /= 1.6
                        player.velocity.x /= 1.3
                    }
                    player.isJumping = true;
                    player.isOnPlatform = false
                    lastJump = Date.now();
                    keyReleased[87] = false
                }else{
                    playAudioOnce('jumpSfx')
                    player.velocity.y = -3 - (jumpGauge/100)
                    if(currentScene === scene6){
                        player.velocity.y /= 1.6
                    }
                    player.isJumping = true;
                    player.isOnPlatform = false
                    lastJump = Date.now();
                    keyReleased[87] = false
                }
    
            }
            jumpGauge = 0
        }
        // check collision of all current scene's platforms in array and stop player if true
        currentScene.platformsSprite.forEach(platform => {
            if(platform.collider.isActive){
                if(player.colliderBox.position.y + player.colliderBox.height <= platform.collider.position.y 
                    && player.colliderBox.position.y + player.colliderBox.height + player.velocity.y >= platform.collider.position.y
                    && checkColliderSide() + player.colliderBox.width >= platform.collider.position.x - 5
                    && checkColliderSide() <= platform.collider.position.x + platform.collider.width - 1){
                        if(player.isOnPlatform === false){
                                playAudioOnce('landSfx')
                                console.log('ground')
                        }
                        player.isOnPlatform = true;
                        player.isJumping = false;
                        keyReleased[87] = false
                        player.velocity.y = 0;
                        player.velocity.x = 0;
                }
            }
        })
        keyHandlerFunc()
    }
    ,1000/fps)
}


animate();


//Handle the players input when pressing down a key
window.addEventListener('keydown', (event) => {
    keyPressed[event.keyCode || event.which] = true;
})

//Handle the players input when leaving a key
window.addEventListener('keyup', (event) => {
    switch(event.keyCode){
        case 87:
            keyPressed[event.keyCode || event.which] = false;
            keyReleased[event.keyCode || event.which] = true;
            break
        case 68:
            setTimeout(()=>{
                keyPressed[event.keyCode || event.which] = false;
                keyReleased[event.keyCode || event.which] = true;
            },100)
            break
        case 65:
            setTimeout(()=>{
                keyPressed[event.keyCode || event.which] = false;
                keyReleased[event.keyCode || event.which] = true;
            },100)


    }
    //keyPressed[event.keyCode || event.which] = false;
    //keyReleased[event.keyCode || event.which] = true;
})

function keyHandlerFunc(){
    // w press check
    if(keyPressed[87]){
        if(!player.isJumping){
            keys.w.pressed = true;
            if(jumpGauge < jumpMaxGauge && (player.isGrounded || player.isOnPlatform)){
                jumpGauge += 40
            }
       }
    }
    else {
        jumpGauge = 0
    }
    // w release check
    if(keyReleased[87]){
        player.isJumping = true
    }
    // d press check
    if(keyPressed[68]){
        lastKey = 'd'
    }
    // d release check
    if(keyReleased[68]){
        keyUp = 'd'
    }
    // a press check
    if(keyPressed[65]){
        lastKey = 'a'
    }
    // a release check
    if(keyReleased[65]){
        keyUp = 'a'
    }
}

const menu2 = document.getElementById('main-menu')
function startGame(){
    const menu = document.getElementById('main-menu')
    menu.remove()
    const container = document.getElementById('canvas-container')
    playAudioOnce('landSfx')
    container.prepend(canvas)
}

function endGame(){
    canvas.remove();
    delete player
    const container = document.getElementById('canvas-container')
    container.prepend(menu2)
    currentScene = scene1
}

