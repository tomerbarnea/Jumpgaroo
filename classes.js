class Character{
    constructor({position, velocity, width, height, scale = 1,frameMax = 1}){
        this.img = new Image(width, height)
        //this.img.src = imgSrc
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
            width: 28,
            height: this.height
        },


        this.isJumping = true,
        this.canJump = false
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
        //collider
        c.fillStyle = 'red'
        
        /*    
        c.fillRect(
            this.currentSprite === this.sprites.idle.right ? this.colliderBox.position.x + 19 : this.colliderBox.position.x + 5,
            this.colliderBox.position.y,
            this.colliderBox.width,
            this.colliderBox.height)
            */
        

    }
    //handle specific instance updating for player
    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        //detect canvas walls collide and bounce off
        if(this.position.x + this.width >= canvas.width || this.position.x <= canvas.width - canvas.width){
            this.velocity.x *= -1
            playAudioOnce('wallSfx')
            switch(player.currentSprite){
                case player.sprites.idle.right:
                    player.currentSprite = player.sprites.idle.left
                    break
                case player.sprites.idle.left:
                    player.currentSprite = player.sprites.idle.right
                    break
            }
        }
        //detect specific platform walls and bounce off thier x
        currentScene.platformsSprite.forEach(platform => {
            if(platform.collider.isWall){
                if(!(player.position.x + player.width + player.velocity.x <= platform.collider.position.x 
                    || player.position.x + player.velocity.x >= platform.collider.position.x + platform.collider.width)){
                        if(player.position.y <= platform.position.y + platform.height
                            && player.position.y + player.height >= platform.position.y){
                            this.velocity.x *= -1
                            playAudioOnce('wallSfx')
                            switch(player.currentSprite){
                                case player.sprites.idle.right:
                                    player.currentSprite = player.sprites.idle.left
                                    break
                                case player.sprites.idle.left:
                                    player.currentSprite = player.sprites.idle.right
                                    break
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
                        //this.isJumping = false;
                    }
                    this.velocity.y = 0;
                    this.velocity.x = 0;
                } else{
                    switch(currentScene){
                        case scene6: 
                            currentScene = scene5
                            player.position.y = 0
                            switchingScene = true;
                            setTimeout(() => { switchingScene = false;
                            }, 10);
                            console.log(currentScene)
                            break
                        case scene5: 
                        currentScene = scene4
                            player.position.y = 0
                            switchingScene = true;
                            setTimeout(() => { switchingScene = false;
                                
                            }, 10);
                            console.log(currentScene)
                            break
                        case scene4: 
                            currentScene = scene3
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
                            player.position.y = 0
                            switchingScene = true;
                            setTimeout(() => { switchingScene = false;
                                
                            }, 10);
                            console.log(currentScene)
                            break
                    }
                }
            } else {
                if(player.velocity.y <= 17){  
                    this.velocity.y += gravity;}
                //this.velocity.x += force;
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
        const newAudio = new Audio(`./audio/${audio}.mp3`)
        audioHandler[audio] = newAudio
    }

    audioHandler[audio].pause()
    audioHandler[audio].currentTime = 0
    audioHandler[audio].play()
}