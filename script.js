const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d'); 
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var img = new Image();
var arr = [-9, 18, 44, 70, 96, 122];
var backgroundImg = new Image();
const catOffset = 28;
var frame = 0;

var x_vel = 0;
var x_acel = 0;
var direction = 1;
var x = 400;
var y = 240;


document.addEventListener('keydown', function(event){
    //Call user movement function
    if(event.keyCode == '37'){
        x_acel = 10;
        x_vel = 5; 
        direction = -1;
    }
    else if(event.keyCode == '39'){
        x_acel = 10;
        x_vel = 5;
        direction = 1;
    }
    
})

//Cycle through every asset and add it to an img[] after it's loaded
function load_assets(){
        
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

function player_render(){
    //if x_vel > 0: running animation
    //else: idle_animate
    if (img.complete == true && backgroundImg.complete == true){
        console.log(x_vel)
        if (x_vel > 0){
            //temp, need to reset the idle animate frame back to 0
            frame = 0;

            x += x_vel * direction;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(backgroundImg, 0, 0);
            //cycle through run spritemap at a rate that correlates with velocity
            ctx.drawImage(img, 0, 16, 32, 32, x, 238, 64, 64);
        }
        else{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(backgroundImg, 0, 0);
            ctx.drawImage(img, 0, arr[Math.floor(frame / 30)], 32, 32, x, 240, 64, 64);
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
    player_render()

    if (x_vel > .0015){
        x_vel *= .85;
    }
    else{
        x_vel = 0;
    }

    window.requestAnimationFrame(animate);
}



idle_load();

draw(0, 0, 1720, 1080, "./assets/backgrounds/example.png");
//draw(400, 260, 100, 100, "./assets/characters/player1/idle/Meow-Knight_Idle1.png");
//setInterval(function(){idle_animate()}, 300);

window.requestAnimationFrame(animate);



