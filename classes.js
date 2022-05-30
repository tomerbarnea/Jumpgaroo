class Character{
    constructor({position, velocity, width, height, scale = 1,frameMax = 1}){
        this.img = new Image(width, height)
        this.position = position
        this.velocity = velocity
        this.height = height
        this.width = width
        this.isGrounded = false
        this.isOnPlatform = false
        this.frameCurrent = 0
        this.frameMax = frameMax
        this.scale = scale

        this.sprites = {
            idle: {
                right : new Image(50,71),
                left : new Image(50,71)
            }
        }
        this.sprites.idle.right.src = './img/Background/kangorooright.png'
        this.sprites.idle.left.src = './img/Background/kangorooleft.png'
        this.currentSprite = this.sprites.idle.right

        this.colliderBox = {
            position: this.position,
            width: 32,
            height: this.height
        },
        
        this.chargeBar = {
            position: this.colliderBox.position,
            width: 53,
            height: 10,
            tick : {
                width: 3.7,
                height: 8
            }
        },
        

        this.isJumping = true,
        this.canJump = false
        this.isShovedX = false
        this.isShovedY = false
    }
    //render the player
    draw(){
        c.drawImage(
            this.currentSprite,
            this.frameCurrent * (this.img.width / this.frameMax),
            0,
            this.img.width / this.frameMax,
            this.img.height ,
            this.position.x,
            this.position.y,
            (this.img.width / this.frameMax) * this.scale,
            this.img.height)

        /*
        c.fillStyle = 'red'
        c.fillRect(checkColliderSide() , this.colliderBox.position.y , this.colliderBox.width ,this.colliderBox.height )
        */
        
        if(keyPressed[87] && !this.isJumping){

            c.fillStyle = '#433732'
            c.fillRect(this.currentSprite === this.sprites.idle.right ? this.position.x : this.position.x - 10,
            this.chargeBar.position.y - 20,
            this.chargeBar.width,
            this.chargeBar.height)

            c.fillStyle = '#EAA141'
            c.fillRect((this.currentSprite === this.sprites.idle.right ? this.position.x : this.position.x - 10) + 1,
            this.chargeBar.position.y - 19,
            this.chargeBar.tick.width,
            this.chargeBar.tick.height)

            this.chargeBar.tick.width += 0.9
        }
    }
    //handle specific instance updating for player
    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        //detect canvas walls collide and bounce off
        if((this.position.x + this.width >= canvas.width - 1 || this.position.x <= canvas.width - canvas.width + 1)
            && !this.isOnPlatform){
            playAudioOnce('wallSfx')
            this.velocity.x *= -1
            switch(player.currentSprite){
                case player.sprites.idle.right:
                    player.currentSprite = player.sprites.idle.left
                    console.log('wtf1')
                    break;
                case player.sprites.idle.left:
                    player.currentSprite = player.sprites.idle.right
                    console.log('wtf2')
                    break;
            }
            //this.velocity.x *= -1
        }
        if(this.position.x + this.width + 1 === canvas.width){
            this.velocity.x--
        }else if(this.position.x - 1 <= canvas.width - canvas.width){
            this.velocity.x++
        }

    
        
    currentScene.platformsSprite.forEach(platform => {
        if(platform.collider.isWall){
            if(platform.collider.isActive){
                if(player.colliderBox.position.y + player.colliderBox.height <= platform.collider.position.y 
                    && player.colliderBox.position.y + player.colliderBox.height + player.velocity.y >= platform.collider.position.y
                    && checkColliderSide() + player.colliderBox.width >= platform.collider.position.x - 5
                    && checkColliderSide() <= platform.collider.position.x + platform.collider.width - 1){
                        if(player.isOnPlatform === false){
                                playAudioOnce('landSfx')
                        }
                        player.isOnPlatform = true;
                        player.isJumping = false;
                        keyReleased[87] = false
                        player.velocity.y = 0;
                        player.velocity.x = 0;
                }
            }
            if(player.position.y <= platform.position.y + platform.height
                && player.colliderBox.position.y + player.colliderBox.height + player.velocity.y >= platform.collider.position.y
                && checkColliderSide() + player.colliderBox.width >= platform.collider.position.x
                && checkColliderSide() <= platform.collider.position.x + platform.collider.width
                && !this.isOnPlatform){
                    if(this.isShovedY === false && this.isShovedX === true){
                        player.velocity.y *= -1
                        playAudioOnce('wallSfx')
                        this.isShovedY = true
                        setTimeout(() => this.isShovedY = false, 100)
                    }
                }
        }
    })
        //detect specific platform walls and bounce off thier x
        currentScene.platformsSprite.forEach(platform => {
            if(platform.collider.isWall){
                if(!(player.position.x + player.width + player.velocity.x <= platform.collider.position.x + 1
                    || player.position.x + player.velocity.x >= platform.collider.position.x + platform.collider.width)){
                        if(player.position.y <= platform.position.y + platform.height
                            && player.position.y + player.height >= platform.position.y){
                            if(this.isShovedX === false && !this.isOnPlatform){
                                playAudioOnce('wallSfx')
                                this.velocity.x *= -1
                                switch(player.currentSprite){
                                    case player.sprites.idle.right:
                                        player.currentSprite = player.sprites.idle.left
                                        break
                                    case player.sprites.idle.left:
                                        player.currentSprite = player.sprites.idle.right
                                        break
                                }
                                console.log('huh ?')
                                this.isShovedX = true
                                setTimeout(() => this.isShovedX = false, 100)
                            }
                        }
                }
            }
        }) 

        //detect floor collision and apply gravity
        if(!switchingScene){
            if(this.position.y + this.height + this.velocity.y >= canvas.height){
                if(currentScene === scene1){
                    if(player.isGrounded === false){
                        playAudioOnce('landSfx')
                        this.isGrounded = true;
                    }
                    this.velocity.y = 0;
                    this.velocity.x = 0;
                } else{
                    switch(currentScene){
                        case scene6: 
                            currentScene = scene5
                            playFade(music5)
                            gravity = 0.7
                            player.position.y = 0
                            switchingScene = true;
                            setTimeout(() => { switchingScene = false;
                            }, 10);
                            console.log(currentScene)
                            break
                        case scene5:
                            currentScene = scene4
                            player.position.y = 0
                            stopFade(music5)
                            playFade(music4)
                            switchingScene = true;
                            setTimeout(() => { switchingScene = false;
                                
                            }, 10);
                            console.log(currentScene)
                            break
                        case scene4: 
                            currentScene = scene3
                            //music4.pause()
                            stopFade(music4)
                            playFade(music23)
                            player.position.y = 0
                            switchingScene = true;
                            setTimeout(() => { switchingScene = false;
                                
                            }, 10);
                            console.log(currentScene)
                            break
                        case scene3: 
                            currentScene = scene2
                            player.position.y = 0
                            switchingScene = true;
                            setTimeout(() => { switchingScene = false;
                                
                            }, 10);
                            console.log(currentScene)
                            break
                        case scene2: 
                            currentScene = scene1
                            stopFade(music23)
                            player.position.y = 0
                            switchingScene = true;
                            setTimeout(() => { switchingScene = false;
                                
                            }, 10);
                            console.log(currentScene)
                            break
                    }
                }
            } else {
                if(player.velocity.y <= 15){  
                    this.velocity.y += gravity;}
                this.isGrounded = false;
            }
         }
        if(this.velocity.y === 0){
            this.isJumping = false;
        }
    }
}

class Sprite{
    constructor({position, imgSrc, width, height, borderY = 1, borderWidth = 1 ,isWall = false, scale = 1,frameMax = 1}){
        this.img = new Image(width, height);
        this.img.src = imgSrc;
        this.position = position
        this.height = this.img.height
        this.width = this.img.width
        this.scale = scale;
        this.frameMax = frameMax;
        this.frameCurrent = 0
        this.collider = {
            position: {
                x: this.position.x,
                y: borderY === 1 ? this.position.y : borderY},
            width: borderWidth === 1 ? this.width : borderWidth,
            height: this.height-this.height,
            isActive: true,
            isWall : isWall === false ? false : isWall
        }
    }
    //render the img and animate it 
    draw(){
        c.drawImage(
            this.img,
            this.frameCurrent * (this.img.width / this.frameMax),
            0,
            this.img.width / this.frameMax,
            this.img.height ,
            this.position.x,
            this.position.y,
            (this.img.width / this.frameMax) * this.scale,
            this.img.height * this.scale)
     c.fillRect(this.collider.position.x, this.collider.position.y, this.collider.width, this.collider.height)
    }
    //handle specific instance updating
    update(){
        this.draw();
    }
}  

class Scene{
    constructor(backgroundSprite, platformsSprite){
        this.backgroundSprite = backgroundSprite
        this.platformsSprite = platformsSprite
    }
    draw(){
        //draw background
        c.drawImage(
            this.backgroundSprite.img,
            this.backgroundSprite.frameCurrent * (this.backgroundSprite.img.width / this.backgroundSprite.frameMax),
            0,
            this.backgroundSprite.img.width / this.backgroundSprite.frameMax,
            this.backgroundSprite.img.height ,
            this.backgroundSprite.position.x,
            this.backgroundSprite.position.y,
            (this.backgroundSprite.img.width / this.backgroundSprite.frameMax) * this.backgroundSprite.scale,
            this.backgroundSprite.img.height * this.backgroundSprite.scale)

        //draw background collider
        c.fillRect(this.backgroundSprite.collider.position.x,
            this.backgroundSprite.collider.position.y, 
            this.backgroundSprite.collider.width, 
            this.backgroundSprite.collider.height)

        //draw each platform
        this.platformsSprite.forEach(platform => {
            c.drawImage(
                platform.img,
                platform.frameCurrent * (platform.img.width / platform.frameMax),
                0,
                platform.img.width / platform.frameMax,
                platform.img.height ,
                platform.position.x,
                platform.position.y,
                (platform.img.width / platform.frameMax) * platform.scale,
                platform.img.height * platform.scale)

            //draw each platform collider
            /*
            c.fillRect(platform.collider.position.x,
                platform.collider.position.y, 
                platform.collider.width, 
                platform.collider.height)*/
        })
    }
    update(){
        this.draw();
    }
}
const audioHandler = {}

function playAudioOnce(audio){
    if(!audioHandler[audio]){
        const newAudio = new Audio(`./audio/${audio}.wav`)
        audioHandler[audio] = newAudio
    }

    audioHandler[audio].pause()
    audioHandler[audio].currentTime = 0
    audioHandler[audio].play()
}

function playFade(audio){
    audio.volume = 0
    audio.play()
    setTimeout(() => audio.volume = 0.2 , 20)
    setTimeout(() => audio.volume = 0.4 , 40)
    setTimeout(() => audio.volume = 0.6 , 60)
    setTimeout(() => audio.volume = 0.8 , 80)
    setTimeout(() => audio.volume = 1 , 100)

}

function stopFade(audio){
    setTimeout(() => audio.volume = 0.8 , 30)
    setTimeout(() => audio.volume = 0.6 , 60)
    setTimeout(() => audio.volume = 0.4 , 90)
    setTimeout(() => audio.volume = 0.2 , 120)
    setTimeout(() => audio.volume = 0 , 150)
    setTimeout(() => {
        audio.pause()
        audio.currentTime = 0
    }, 180)

}

function checkColliderSide(){
    if(player.currentSprite === player.sprites.idle.right){
        return (player.colliderBox.position.x + player.width - 32)
    } else if(player.currentSprite === player.sprites.idle.left){
        return (player.colliderBox.position.x)
    }
}