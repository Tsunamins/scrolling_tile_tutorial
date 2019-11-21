const Player = function(x, y){ //player class
    this.x = x;
    this.y = y;

}; 

Player.prototype = {//setting up the player to move in direction of mouse click
    moveTo:function(x, y) {
        this.x = x - 92 * 0.5; //the math is so that, the player avatar will center itself onto the mouse click location rather than the top left corner of the image
        this.y = y - 92 * 0.5; //well this is sort of accomplished, needs to change based on player sprite size, currently I have the sprite size stretched to 92x92
    }
}

//next aspect of getting canvas to scroll, need viewport class
const Viewport = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;


};

Viewport.prototype = {

};
//this and above construct provides an area to view tile map through

let scaled_size = 32;
let sprite_size = 32; //may change based on sprite input/import

const columns = 24;
const rows = 24;

//map is 24 x 24, each value corresponds to diff image
const map = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,
             2,2,2,2,0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0,
             3,3,2,2,2,2,2,2,2,2,3,3,3,3,3,3,2,2,2,2,0,0,0,0,
             3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,
             3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,
             3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
             3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
             3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
             3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
             1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
             1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
             1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
             2,2,2,2,2,2,2,2,2,2,3,3,3,3,2,2,2,2,2,2,2,2,2,2,
             2,2,2,2,2,2,2,2,2,2,3,3,3,3,2,2,2,2,2,2,2,2,2,2,
             2,2,2,2,2,2,2,2,2,2,3,3,3,3,2,2,2,2,2,2,2,2,2,2,
             2,2,2,2,2,2,2,2,2,2,3,3,3,3,2,2,2,2,2,2,2,2,2,2,
             2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,
             2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,
             2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,
             3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
             3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
             3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
             2,2,2,2,2,3,3,3,3,2,2,2,2,3,3,3,3,3,3,2,2,2,2,2,
             2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
             ];

const context = document.querySelector("canvas").getContext('2d');

let height = document.documentElement.clientHeight;
let width = document.documentElement.clientWidth;

var player = new Player(100, 100); //sets player initial position

var viewport = new Viewport(200, 200, 300, 300);//make a new viewport for viewing
//the first 2 coordinates above is where the viewport is hovering over the map
//next step is to figure out what tiles are underneath the viewport in question, also can think of as a camera view
//have to find out minimum and maxiumum values of rows and columns, those that are visible

var pointer = {x: 0, y: 0}//defines pointer for player movement

//game loop func, defined
function loop(){
    window.requestAnimationFrame(loop);//requestAnimationFrame ensures smooth animations only called when browser ready to repaint window

    //viewport.x++ //scrolling L to R test
    //viewport.y++ //scrolling Top to Bottom test

    let height = document.documentElement.clientHeight; //set these here again to set anytime screen happens to change
    let width = document.documentElement.clientWidth;
    context.canvas.height = height;
    context.canvas.width = width;
    context.imageSmoothingEnabled = false; //sharpens blurry/rough images

    player.moveTo(pointer.x, pointer.y);
    
    //place to find min and max value columns and rows ==== may need to adjust scaled size to 92?
    var x_min = Math.floor(viewport.x / scaled_size); //round down for min size, round up for max size
    var y_min = Math.floor(viewport.y / scaled_size);
    var x_max = Math.ceil((viewport.x + viewport.w) / scaled_size); //getting right side
    var y_max = Math.ceil((viewport.y + viewport.h) / scaled_size); //added semi-colons and parenthesis here, as one other adjusment an seems to work based on tutorial results now
    
    //map creation, looping over x and y columns
    //next going to change this so it is only displaying the viewport/camera view
    for(let x = x_min; x < x_max; x++){
        for(let y = y_min; y < y_max; y++){
            //get tile value out of the map
            //get 2D map coordinates form 1D array coordinates
            let value = map[y * columns + x];
            let tile_x = (x * scaled_size) - viewport.x + width * 0.5 - viewport.w * 0.5; //viewport.x and y subtracted to keep viewport in top left of screen
            let tile_y = (y * scaled_size) - viewport.y + height * 0.5 - viewport.h * 0.5;  //add height/width * 0.5 to center viewport
            context.drawImage(tile_sheet, value * scaled_size, 0, scaled_size, scaled_size, tile_x, tile_y, scaled_size, scaled_size) //draws tiles
        }
    }  
    viewport.x++;  
    context.drawImage(player_tile, 0, 0, 57, 56, player.x, player.y, 92, 92)//draws player    

    //viewport theory, highlights viewport as it is in theory:
    context.strokeStyle = "#ffffff";
    context.rect(width * 0.5 - viewport.w * 0.5, height * 0.5 - viewport.h * 0.5, viewport.w, viewport.h);
    context.stroke();
}//end game loop function

var tile_sheet = new Image();
tile_sheet.src = "images/randomfirstsprites.png"
var player_tile = new Image();
player_tile.src = "images/pixelcat.png" //using individual tile image for player sprite

 document.addEventListener('DOMContentLoaded', function () {
    loop();

}); 

context.canvas.addEventListener("click", (event) =>{ //means of moving player around screen
    pointer.x = event.pageX;
    pointer.y = event.pageY;
});




