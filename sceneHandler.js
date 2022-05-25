let switchingScene = false;
function sceneHandler(){
    if(player.position.y + player.height + player.velocity.y <= canvas.height - canvas.height && !switchingScene){
        switch(currentScene){
            case scene1: 
                currentScene = scene2
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
                player.position.y = canvas.height
                switchingScene = true;
                setTimeout(() => { switchingScene = false;
                    
                }, 100);
                console.log(currentScene)
                break
            case scene4: 
                currentScene = scene5
                player.position.y = canvas.height
                switchingScene = true;
                setTimeout(() => { switchingScene = false;
                    
                }, 100);
                console.log(currentScene)
                break
            case scene5: 
                currentScene = scene6
                player.position.y = canvas.height
                switchingScene = true;
                setTimeout(() => { switchingScene = false;
                    
                }, 100);
                console.log(currentScene)
                break
        }
    }
}
