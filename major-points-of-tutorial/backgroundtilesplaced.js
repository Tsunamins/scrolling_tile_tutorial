const Player = function(x, y){ //player class
    this.x = x;
    this.y = y;

}; 
let scaled_size = 32;
let sprite_size = 32; //may change based on sprite input/import


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

    context.fillStyle = "#008000"; //check to see if above is working, green screen if working
    context.fillRect(0,0, width - 10, height - 10); //subtract 10 to not fill up whole window, prob subtract more later for player menu

    context.imageSmoothingEnabled = false; //sharpens blurry/rough images, pixel squares more square, without this can't see pixelation square as much but looks blurry
    var tile_sheet = new Image();
    tile_sheet.src = "images/randomfirstsprites.png"

    //map creation, looping over x and y columns
    for(let x=0; x < columns; x++){
        for(let y=0; y < rows; y++){
            //get tile value out of the map
            //get 2D map coordinates form 1D array coordinates
            let value = map[y * columns + x];
            let tile_x = x * scaled_size;
            let tile_y = y * scaled_size;
            context.drawImage(tile_sheet, value * scaled_size, 0, scaled_size, scaled_size, tile_x, tile_y, scaled_size, scaled_size)
        }
    }


    //context.drawImage(tile_sheet, 10, 12, 100, 100, player.x, player.y, 120, 120) //drawing player image from sprite sheet at location in png file, based on size of sprites
    context.drawImage(player_tile, 0, 0, 57, 56, player.x, player.y, 120, 120)
    //current explanation of this(variable to draw, startin x, y coord, ending x,y coord, position to place on screen, scaling adjustments)
}

 var player_tile = new Image();
 //var player_tile = newImage();



 player_tile.src = "images/pixelcat.png" //using individual tile image for player sprite
//below is working properly
 document.addEventListener('DOMContentLoaded', function () {
    loop();

}); 

//player_tile.src = "firsttile.png";


