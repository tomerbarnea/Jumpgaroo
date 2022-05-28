let switchingScene = false;
function sceneHandler(){
    if(player.position.y + player.height + player.velocity.y <= canvas.height - canvas.height && !switchingScene){
        switch(currentScene){
            case scene1: 
                currentScene = scene2
                playFade(music23)
                player.position.y = canvas.height
                switchingScene = true;
                setTimeout(() => { switchingScene = false;
                
                }, 100);
                console.log(currentScene)
                break
            case scene2: 
                currentScene = scene3
                player.position.y = canvas.height
                switchingScene = true;
                setTimeout(() => { switchingScene = false;
                    
                }, 100);
                console.log(currentScene)
                break
            case scene3: 
                currentScene = scene4
                //music4.play();
                stopFade(music23)
                playFade(music4)
                player.position.y = canvas.height
                switchingScene = true;
                setTimeout(() => { switchingScene = false;
                    
                }, 100);
                console.log(currentScene)
                break
            case scene4: 
                currentScene = scene5
                //music4.pause()
                //music4.currentTime = 0
                stopFade(music4)
                playFade(music5)
                player.position.y = canvas.height
                switchingScene = true;
                setTimeout(() => { switchingScene = false;
                    
                }, 100);
                console.log(currentScene)
                break
            case scene5: 
                currentScene = scene6
                //music5.pause()
                //music5.currentTime = 0
                stopFade(music5)
                gravity = 0.43
                player.position.y = canvas.height
                player.velocity.y /= 1.6
                player.velocity.x /= 1.3
                switchingScene = true;
                setTimeout(() => { switchingScene = false;
                    
                }, 100);
                console.log(currentScene)
                break
            case scene6:
                endGame();
        }
    }
}
