//This is my fractal tree!
//I was too lazy to add leaves, instead I just made a gradient to color the end branches green. Now it's like a weeping willow.

//Sets up the canvas variables
var myCanvas = document.getElementById("my-canvas");
var ctx = myCanvas.getContext("2d");

function random(min, max) {
    return Math.random() * (max - min) + min;
}

//The main draw function
function drawTree(startX, startY, length, angle, branchWidth, hue, sat, light) {
    //Sets line width
    ctx.lineWidth = branchWidth;

    //Starts a path
    ctx.beginPath();

    //Adds current canvas to call stack
    ctx.save();

    //Uses template literals to get the color of the nodes (in HSL)
    ctx.strokeStyle = `hsl(${random(hue - 10, hue + 10)}, ${sat}%, ${light}%`;
    ctx.fillStyle = `hsl(${hue}, ${sat}%, ${light}%`;

    //Translates the branch and rotates it
    ctx.translate(startX, startY);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length);
    ctx.stroke();

    //Some nice shadow blur and color
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";

    //Returns the last canvas
    if (length < 10) {
        ctx.restore();
        return;
    }

    //The recursive part: when a branch is long enough,, draw two branches on it's end in different angles
    //Changes the hue, saturation and lightness to create a gradient based on where the node is (nearer the top = greener)
    drawTree(
        0,
        //Starts at the end of the previous branch
        -length,
        //A little bit smaller
        length * 0.8,
        //Angles it
        angle - 12.5,
        //Makes it thinner
        branchWidth * 0.8,
        //And adjusts the colors
        (hue += 2),
        100,
        (light += 1)
    );
    drawTree(
        0,
        //Starts at the end of the previous branch
        -length,
        //A little bit smaller
        length * 0.8,
        //Angles it
        angle + 12.5,
        //Makes it thinner
        branchWidth * 0.8,
        //And adjusts the colors
        (hue += 2),
        100,
        (light += 1)
    );

    ctx.restore();
}

//The first branch being drawn

drawTree(500, 675, 120, 0, 10, 30, 100, 29);