const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d'); 
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var img = new Image();
var arr = [16, 44, 70, 96, 122];
const catOffset = 28;
var frame = 0;

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
    ctx.clearRect(400, 200, 100, 100);
    var img = new Image();
    img.src = src;
    img.width = width;  
    img.height = height;
    img.x = x;
    img.y = y;
    
    img.addEventListener("load",    () => {
        ctx.drawImage(img, x, y);
    },
    "false",);
}

function idle_load(){
    var ctx = canvas.getContext("2d");
    img.src = './assets/characters/player1/idle/Meow-Knight_Idle.png';
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
    if (img.complete == true){
        ctx.clearRect(400, 240, 64, 64);
        ctx.drawImage(img, 0, arr[frame], 32, 32, 400, 240, 64, 64);
        frame++;
        if(frame > 4){
            frame = 0;
        }
    }
}

idle_load();



draw(0, 0, 1720, 1080, "./assets/backgrounds/example.png");
//draw(400, 260, 100, 100, "./assets/characters/player1/idle/Meow-Knight_Idle1.png");
setInterval(function(){idle_animate()}, 400);
