var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var hero = new Image();
var bg = new Image();
var fg = new Image();
var blockUp = new Image();
var blockDown = new Image();

hero.src = "img/hero.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
blockDown.src = "img/blockDown.png";
blockUp.src = "img/block.png";

var x = 20;
var y = 200;
var grav = 1.5;

var score = 0;

document.addEventListener("keydown", moveUp);

function moveUp() {
	y -= 35;
}

var blocks = [];
blocks[0] = {
	x: cvs.width,
	y: 0
}

function draw() {
	ctx.drawImage(bg, 0, 0);

	for (var i = 0; i < blocks.length; i++) {

		ctx.drawImage(blockUp, blocks[i].x, blocks[i].y);
		ctx.drawImage(blockDown, blocks[i].x, blocks[i].y+blockUp.height+100);

		blocks[i].x --;

		if (blocks[i].x == 100) {
			blocks.push({
				x: cvs.width,
				y: Math.floor(Math.random()*blockUp.height) - blockUp.height
			})
		}
	

		if ( x + hero.width >= blocks[i].x
		&& x <= blocks[i].x + blockUp.width 
		&& ( y <= blocks[i].y + blockUp.height 
			|| y + hero.height >= blocks[i].y + blockUp.height + 100 ) 
		|| y + hero.height >= cvs.height - fg.height ) {
			location.reload();
		}

		if (blocks[i].x == 5) {
			score++;
		}
	
	}

	ctx.drawImage(fg, 0, cvs.height - fg.height);

	ctx.drawImage(hero, x, y);

	y += grav;

	ctx.fillStyle = "#000"
	ctx.font = "24px Verdana"
	ctx.fillText("Счет: " + score, 10, cvs.height - 20)


	requestAnimationFrame(draw);
}

blockDown.onload = draw;
