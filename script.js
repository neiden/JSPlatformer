/*TODO: 
    > Find map pack and create a level layout []
    > Smooth tile scroll                      []
        - Add a small space the player can move
        without the camera locking
    > Create function to load all assets      []
    > Clean up frames when switching state    []
        - Need to set back to 0
    > Smooth horizontal collision             []
        - Maybe unique animation for when
        user is intentionally pushing 
        against a wall
    > Fix vertical collision                  []
        - fix jumping into platforms above player
        - find a way to work without
        using vertRect.y - 1
    > Add sounds                              []
    


    > Sprint jump ??                          [X]
    > Implement tile scrolling                [x]

*/


const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d'); 
const origin = [window.innerWidth/2, window.innerHeight/2];
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const img = new Image();
const bgImg = new Image();


bgImg.src = './assets/backgrounds/example.png';
bgImg.addEventListener("load", () => {
},
"false",);
img.src = './assets/player1/WALK.png';
img.addEventListener("load",    () => {
},
"false",);




const bg = new GameObject(ctx, 0, 0, 1728, 1080, bgImg, 0, 0);
var player = new Player(ctx, window.innerWidth/2, window.innerHeight/2 - 100, 32, 32, img, 0, 0);



var cameraLocked = false;


var keymap = {
    16: 'shiftLeft',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

var keydown = {};

document.addEventListener('keydown', function(e){
    keydown[keymap[e.which]] = true;
})

document.addEventListener('keyup', function(e){
    keydown[keymap[e.which]] = false;
});


var backgroundMusic = new Audio('./assets/sounds/background.mp3');

//1.) Handle Inputs
//2.) Update game state
//3.) Render game
function tick(){
    backgroundMusic.play();
    console.log(keydown, player.state, player);
    //Inputs
    player.input(keydown);


    //Update
    if(Math.abs(player.xVel) > .0015){
        player.xVel *= .85;
    }
    else{
        player.xVel = 0;
    }

    if (player.yVel < 15){
        player.yVel += 1;
    }

    let vertRect = {
        x: player.x,
        y: player.y + player.yVel,
        width: player.width * player.sizeMultiplier - 20,
        height: player.height * player.sizeMultiplier
    }
    
    let horzRect = {
        x: player.x + player.xVel,
        y: player.y, 
        width: player.width * player.sizeMultiplier - 20,
        height: player.height * player.sizeMultiplier
    }
    
    this.tileMap.tiles.forEach((tile) => {
        if (player.isIntersected(tile, horzRect)){
            while(player.isIntersected(tile, horzRect)){
                horzRect.x += -Math.sign(player.xVel);
            }
            player.x = horzRect.x;
            player.xVel = 0;
        }
        if (player.isIntersected(tile, vertRect)){
            while(player.isIntersected(tile, vertRect)){ 
                vertRect.y += -Math.sign(player.yVel);
            }
            player.yVel = 0;
            if (Math.abs(player.xVel) > 0) {
                player.changeState("runState");
            }
            else{
                player.changeState("idleState");
            }
        }
    });


    if (originDistance()){
        this.tileMap.tiles.forEach((tile) => {
            tile.x += -player.xVel;
            tile.y += -player.yVel;
        });
    }
    else{
        player.x += player.xVel;
        player.y += player.yVel;
    }

    //Render
    if(player.img.complete == true && bg.img.complete == true){
        bg.render();
        player.render();
        tileMap.render(ctx);
    }

    window.requestAnimationFrame(tick);
}

//TODO actually implement and use division of distance to create sliding camera effect
function originDistance(){
    // let xDistance = player.x - origin[0];
    // let yDistance = player.y - origin[1];
    // return Math.abs(xDistance) > 100 || Math.abs(yDistance) > 100;
    return true;
}


var tileMap = new TileMap("./assets/backgrounds/Tileset.png", "temp", 32, 100, 300)


window.requestAnimationFrame(tick);

