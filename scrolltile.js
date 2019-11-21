const Player = function(x, y){ //player class
    this.x = x;
    this.y = y;

}; 

Player.prototype = {//setting up the player to move in direction of mouse click
    moveTo: function(x, y) {
        this.x += (x - this.x - 92 * 0.5) * 0.05; //the math changed to make movement less jumpy
        this.y += (y - this.y - 92 * 0.5) * 0.05; //the last multiplication factor eases this transition
    }
}

//next aspect of getting canvas to scroll, need viewport class
const Viewport = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
};

//next part of scroll feature, scroll to player position
Viewport.prototype = {
    scrollTo: function(x, y){
        this.x = x - this.w * 0.5;
        this.y = y - this.y * 0.5;
    }

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

var viewport = new Viewport(200, 200, 300, 300); //make the viewport

var pointer = {x: 0, y: 0};//defines pointer for player movement

//game loop func, defined
function loop(){
    window.requestAnimationFrame(loop);//requestAnimationFrame ensures smooth animations only called when browser ready to repaint window

    let height = document.documentElement.clientHeight; //set these here again to set anytime screen happens to change
    let width = document.documentElement.clientWidth;
    context.canvas.height = height;
    context.canvas.width = width;
    context.imageSmoothingEnabled = false; //sharpens blurry/rough images

    //implement the player moveTo function, first, before scrollTo
    player.moveTo(pointer.x, pointer.y); //move the player based on on click coordinates

    //implement the scrollTo function
    viewport.scrollTo(player.x, player.y);    //however need to offset mousepointer by scroll location next, to make look better
   
    var x_min = Math.floor(viewport.x / scaled_size); //round down for min size, round up for max size
    var y_min = Math.floor(viewport.y / scaled_size);
    var x_max = Math.ceil((viewport.x + viewport.w) / scaled_size); //getting right side
    var y_max = Math.ceil((viewport.y + viewport.h) / scaled_size); 

    //prevent excessive scrolling and issues at map edges
          if (x_min < 0) x_min = 0;
          if (y_min < 0) y_min = 0;
          if (x_max > columns) x_max = columns;
          if (y_max > rows) y_max = rows;

    //map creation, looping over x and y columns, with viewport view now   
    for(let x = x_min; x < x_max; x++){
        for(let y = y_min; y < y_max; y++){
            //get tile value out of the map
            //get 2D map coordinates form 1D array coordinates
            let value = map[y * columns + x];
            let tile_x = Math.floor((x * scaled_size) - viewport.x + width * 0.5 - viewport.w * 0.5); //Math.floor to smooth out any lines bewtween tiles
            let tile_y = Math.floor((y * scaled_size) - viewport.y + height * 0.5 - viewport.h * 0.5);  //add height/width * 0.5 to center viewport
            context.drawImage(tile_sheet, value * scaled_size, 0, scaled_size, scaled_size, tile_x, tile_y, scaled_size, scaled_size) //draws tiles
        }
    }  

    //add some player/map interaction
    //get player position information based on cetner of player - may need to change scaled size to 92 once again
    let player_index = Math.floor((player.y + scaled_size * 0.5) / scaled_size) * columns + Math.floor((player.x + scaled_size * 0.5) / scaled_size);

    //if where the player is is one of the pink tiles, change it to a the brown looking tile after walking over it
    if (map[player_index] === 1) map[player_index] = 3;
      
    context.drawImage(player_tile, 0, 0, 57, 56, Math.round(player.x - viewport.x + width * 0.5 - viewport.w * 0.5), Math.round(player.y - viewport.y + height * 0.5 - viewport.h * 0.5), 92, 92)//draws player    

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
    //so here will move pointers location to offset positions scrolling by:
    pointer.x = event.pageX + viewport.x - width * 0.5 + viewport.w * 0.5;
    pointer.y = event.pageY + viewport.y - height * 0.5 + viewport.h * 0.5;  //and this is fine for mouse vs scroll, but now not offsetting player locaiton any longer, so that next
});




