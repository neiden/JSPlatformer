
const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d'); 
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const img = new Image();
const bgImg = new Image();
const wall1 = new Image();
const floor1 = new Image();

bgImg.src = './assets/backgrounds/example.png';
bgImg.addEventListener("load", () => {
},
"false",);

img.src = './assets/player1/WALK.png';
img.addEventListener("load",    () => {
},
"false",);

wall1.src = './assets/backgrounds/wall1.png';
wall1.addEventListener("load",    () => {
},
"false",);

floor1.src = './assets/backgrounds/floor1.png';
floor1.addEventListener("load", () =>{

},
"false",);




const bg = new GameObject(ctx, 0, 0, 1728, 1080, bgImg, 0, 0);
var player = new Player(ctx, 300, 150, 32, 32, img, 0, 0);


const wall = new GameObject(ctx, 488, 200, 150, 200, wall1, 0, 0);
const floor = new GameObject(ctx, 200, 300, 300, 100, floor1, 0, 0);

const map = [wall, floor];

var grounded = false;


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



//1.) Handle Inputs
//2.) Update game state
//3.) Render game
function tick(){
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
        width: player.width * player.sizeMultiplier,
        height: player.height * player.sizeMultiplier
    }

    let horzRect = {
        x: player.x + player.xVel,
        y: player.y, 
        width: player.width * player.sizeMultiplier,
        height: player.height * player.sizeMultiplier
    }
    
    //Check for collision and update player accordingly
    for (let i = 0; i < map.length; i++){
        if (player.isIntersected(map[i], horzRect)){
            while(player.isIntersected(map[i], horzRect)){
                horzRect.x += -Math.sign(player.xVel);
            }
            player.x = horzRect.x;
            player.xVel = 0;
        }
        if (player.isIntersected(map[i], vertRect)){
            while(player.isIntersected(map[i], vertRect)){
                vertRect.y += -Math.sign(player.yVel);
            }
            player.y = vertRect.y - 1;
            player.yVel = 0;
            if (Math.abs(player.xVel) > 0) {
                player.changeState("runState");
            }
            else{
                player.changeState("idleState");
            }
        }
    }

    player.x += player.xVel;
    player.y += player.yVel;
    //console.log(player.yVel)
    //Render
    if(player.img.complete == true && bg.img.complete == true && wall.img.complete == true){
        //console.log("Current state: " + player.state.toString())
        bg.render();
        player.render();
        wall.render();
        floor.render();
    }

    window.requestAnimationFrame(tick);
}

window.requestAnimationFrame(tick);

