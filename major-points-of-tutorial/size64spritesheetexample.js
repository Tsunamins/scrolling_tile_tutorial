const Player = function(x, y){ //player class
    this.x = x;
    this.y = y;

}; 

let sprite_size = 16; //reason for this is typical sprite size

const columns = 24;
const rows = 24;


//map is 24 x 24, each value corresponds to diff image
const map = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
             0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
             0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
             0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
             0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
             0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
             1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
             1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
             1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
             1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
             1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
             1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
             2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
             2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
             2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
             2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
             2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
             2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
             3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
             3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
             3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
             3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
             3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
             3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3
             ];

const context = document.querySelector("canvas").getContext('2d');

let height = document.documentElement.clientHeight;
let width = document.documentElement.clientWidth;

var player = new Player(100, 100); //sets player position

function loop(){
    window.requestAnimationFrame(loop);//requestAnimationFrame ensures smooth animations only called when browser ready to repaint window
    let height = document.documentElement.clientHeight; //set these here again to set anytime screen happens to change
    let width = document.documentElement.clientWidth;

    context.canvas.height = height;
    context.canvas.width = width;

    context.fillStyle = "#008000"; //check to see if above is working
    context.fillRect(0,0, width - 10, height - 10); //subtract 10 to not fill up whole window

    context.drawImage(tile_sheet, 128, 0, 64, 64, player.x, player.y, 120, 120) //drawing player image from sprite sheet at location in png file, based on size of sprites


}
//uses a sprite sheet for display, collection of all images together
 var tile_sheet = new Image();
 

// //once loaded call loop
//  tile_sheet.addEventListener("load", (event) => {
//     loop();

//  });

 tile_sheet.src = "tiles.png" //currently using open source dungeon tiles

 document.addEventListener('DOMContentLoaded', function () {
    loop();

}); 


