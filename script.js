const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d'); 
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var img = new Image();
var runningMap = new Image();
var arr = [-9, 18, 44, 70, 96, 122];
var runningArr = [-8, ];

var backgroundImg = new Image();
const catOffset = 28;
var frame = 0;

var x_vel = 0;
var x_acel = 0;
var y_vel = 1;
var xdirection = 1;
var ydirection = 1;
var x = 450;
var y = 200;

var keymap = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

var keydown = {};

testPlatform = {
    x : 388,
    y : 290,
    width: 200,
    height: 25
};

testPlatformToo = {
    x : 280,
    y : 670,
    width: 200,
    height: 25
}

const tiles = [testPlatform, testPlatformToo];



document.addEventListener('keydown', function(event){
    keydown[keymap[event.which]] = true;

})

document.addEventListener('keyup', function(e){
    keydown[keymap[e.which]] = false;
});

//Cycle through every asset and add it to an img[] after it's loaded
function load_assets(){
    var ctx = canvas.getContext("2d");
    img.src = './assets/characters/player1/Meow-Knight_Idle.png';
    img.addEventListener("load",    () => {
        ctx.drawImage(img, 0, catOffset * frame, 32, 32, 400, 240, 64, 64);

        frame++;
    },
    "false",);

    runningMap.src = './assets/characters/player1/Meow-Knight_Run.png';
    runningMap.addEventListener("load", () =>{
        
    },
    "false");
}

function draw_image(x, y, width, height, src){
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.x = x;
    img.y = y;

    document.body.appendChild(img);
}



function draw(x, y, width, height, src){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImg.src = src;
    backgroundImg.width = width;  
    backgroundImg.height = height;
    backgroundImg.x = x;
    backgroundImg.y = y;
    
    img.addEventListener("load",    () => {
        ctx.drawImage(backgroundImg, x, y);
    },
    "false",);
}
function idle_load(){
    var ctx = canvas.getContext("2d");
    img.src = './assets/characters/player1/Meow-Knight_Idle.png';
    img.addEventListener("load",    () => {
        ctx.drawImage(img, 0, catOffset * frame, 32, 32, 400, 240, 64, 64);

        frame++;
    },
    "false",);

}

//Use spritemap and render only part of the image each interval. Change the offset of the rendered image each iteration.
//drawImage(src, x clip, y clip, x clip width, y clip width, x position on canvas, y position on canvas, width, height)
//              ^ 0 always |
//                         ^change by the size of sprite + border between images
function idle_animate(){
    if (img.complete == true && backgroundImg.complete == true){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImg, 0, 0);
        ctx.drawImage(img, 0, arr[frame], 32, 32, 400, 240, 64, 64);
        if(frame > 4){
            frame++;
            frame = 0;
        }
    }
}

//ideally should be given an (x,y) of player and search through list of coordinates.
function isCollided(x, y){
    //ctx.clearRect(testPlatform.x, testPlatform.y, testPlatform.width, testPlatform.height);
    for (let i = 0; i < tiles.length; i++){
        let tile = tiles[i];
        if ((x > tile.x && x < tile.x + tile.width) && (y > tile.y && y < tile.y + tile.height)){
            return true;
        }
    }
    return false;
}


function player_render(){
    //if x_vel > 0: running animation
    //else: idle_animate
    if (img.complete == true && backgroundImg.complete == true && runningMap.complete == true){
        console.log(x_vel);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImg, 0, 0);
        let nextY = y + y_vel + 50; //current position + next position + height of character
        let nextX = x + x_vel + 50;
        if (x_vel > 0){
            //temp, need to reset the idle animate frame back to 0
            frame = 0;

            x += x_vel * xdirection;
            if(y_vel > 0 && !isCollided(x, nextY)){
                y += y_vel * ydirection;
                ctx.drawImage(img, 0, arr[0], 32, 32, x, y, 64, 64);
            }
            //cycle through run spritemap at a rate that correlates with velocity
            //Draw normal vs reflected for left
            else if (xdirection > 0){
                ctx.drawImage(runningMap, 0, 44, 32, 32, x, y, 48, 48);
            }
            else{
                ctx.drawImage(runningMap, 26, -8, 32, 32, x, y, 48, 48);
            }
        }
        else if(y_vel > 0 && !isCollided(x, nextY)){
            y += y_vel * ydirection;
            ctx.drawImage(img, 0, arr[0], 32, 32, x, y, 64, 64);
        }
        else{
            ctx.clearRect(tiles[1].x, tiles[1].y, tiles[1].width, tiles[1].height);
            ctx.drawImage(img, 0, arr[Math.floor(frame / 30)], 32, 32, x, y, 64, 64);
            frame++;
            if(frame > 180){
                frame = 0;
            }
        }


    }
}

//Main function that calls every frame; should update all elements that are mutable
// i.e player, animations, projectiles, dynamic background items
function animate(){
    if (keydown['left']){
        x_vel = 5;
        xdirection = -1;
    }
    else if(keydown['right']){
        x_vel = 5;
        xdirection = 1;
    }

    player_render()

    if (x_vel > .0015){
        x_vel *= .85;
    }
    else{
        x_vel = 0;
    }

    if (y_vel < 10){
        // y_vel *= 1.030;
        y_vel += 0.1;
    }

    window.requestAnimationFrame(animate);
}



load_assets();

draw(0, 0, 1720, 1080, "./assets/backgrounds/example.png");
//draw(400, 260, 100, 100, "./assets/characters/player1/idle/Meow-Knight_Idle1.png");
//setInterval(function(){idle_animate()}, 300);

window.requestAnimationFrame(animate);



