let size_hexagons = 20;
let smaller_sizehexagons = 12;

function draw_one_frame(cur_frac) {
	let yellow_orange = color(242, 183, 5)
	let orange = color(242, 135, 5)
	let cream = color(242, 213, 160)
	let darker_orange = color(242, 116, 5);
	background(cream);

	stroke(yellow_orange)
	strokeWeight(10);
	fill(orange)

	// travelled bees
	// the background
	push();
	translate(-100+cur_frac*(width/1.8), height/4);
	buzzy_bee(50, 0, cur_frac, yellow_orange, 1.2, true)
	pop();

	push();
	translate(width/2+cur_frac*(width/1.8), height/1.5);
	buzzy_bee(50, 0, cur_frac, yellow_orange, 1.2, true)
	pop();

	buzzy_bee(width/9, height/1.5, cur_frac*cur_frac, yellow_orange, 1.2)
	buzzy_bee(width/1.5, height/3, cur_frac*cur_frac, yellow_orange, 1.2)
	
	// draw cow face shape
	draw_honeycomb(height/3.1, height/1.5, width/2.5, width/1.7);
	draw_honeycomb(height/1.5, height/1.1, width/2.7, width/1.6);

	// ear shape
	draw_honeycomb(height/5.2, height/3.3, width/3.4, width/1.4);

	// lil horns
	draw_honeycomb(height/13, height/9, width/2.5, width/2.4);
	draw_honeycomb(height/13, height/9, width/1.8, width/1.7);

	honey_drop(width/1.45, height/4, cur_frac, yellow_orange, orange, 35)
	honey_drop(width/2.9, height/4, cur_frac, yellow_orange, orange, 35);
	honey_drop(width/2, height/6, cur_frac, yellow_orange, orange, 45);
	honey_drop(width/1.68, height/1.5, cur_frac, yellow_orange, orange, 40);
	honey_drop(width/2.35, height/1.5, cur_frac, yellow_orange, orange, 40);
	// honey_drop(width/2.6, height/2, cur_frac, yellow_orange, orange, 30);

	// bees for the cows face features
	// the eyes
	buzzy_bee(width/3.6, height/4, 2, cream, 1.5)
	buzzy_bee(width/2.6, height/4, 4, cream, 1.5)

	// the mouth
	buzzy_bee(width/3, height/1.65, 4, darker_orange, 1.5)
	buzzy_bee(width/2.8, height/1.65, 2, darker_orange, 1.5)
	buzzy_bee(width/3.2, height/1.65, 2, darker_orange, 1.5)

}

function draw_honeycomb(heightMax, heightMin, widthMax, widthMin){
	const x_offset = size_hexagons * cos(PI / 6);
	const y_offset = size_hexagons * sin(PI / 6) + size_hexagons;
	const x_space = 2 * x_offset;
	const y_space = 2 * y_offset;
	for (let y = heightMax; y < heightMin; y += y_space) {
		for (let x = widthMax; x < widthMin; x += x_space) {
			hexagon(x, y, size_hexagons);
			hexagon(x + x_offset, y + y_offset, size_hexagons);

			// making orangier outline
			push();
			stroke(242, 116, 5) // darker orange
			strokeWeight(3)
			hexagon(x, y, smaller_sizehexagons, true);
			hexagon(x + x_offset, y + y_offset, smaller_sizehexagons, true);
			pop();
		}
	}
}

/**
 * Got this from kybr
 * @param x x position
 * @param y y position
 * @param r radius
 * @link https://editor.p5js.org/kybr/sketches/r_1FNQE5W
 */
function hexagon(x, y, r, lines) {
	push();
	if (lines){
		beginShape(LINES);
	}else {
		// shadow
		push();
		fill(242, 116, 5, 200)
		noStroke();
		let newX = x + 15;
		let newY = y + 15;
		beginShape();
		let angle = (2 * PI) / 6 / 2;
		for (let i = 0; i < 6; i++) {
			vertex(newX + r * cos(angle), newY + r * sin(angle));
			angle += (2 * PI) / 6;
			vertex(newX + r * cos(angle), newY + r * sin(angle));
		}
		endShape();
		pop();

		beginShape();
	}
	let angle = (2 * PI) / 6 / 2;
	for (let i = 0; i < 6; i++) {
	  vertex(x + r * cos(angle), y + r * sin(angle));
	  angle += (2 * PI) / 6;
	  vertex(x + r * cos(angle), y + r * sin(angle));
	}
	endShape();

	// lil shine
	if (!lines){
		noStroke();
		fill(242, 183, 5, 200)
		ellipse(x-5, y-3, 5, 10)
	}
	pop();
}

function honey_drop(x, y, cur_frac, light_color, dark_color, size){
	
	strokeWeight(4)
	let scale_height = 0;
	if(cur_frac <= 0.5){
		scale_height = map(cur_frac, 0, 0.5, 1, 1.5)
	}
	else{
		scale_height = map(cur_frac, 0.5,1, 1.5,1)
	}
	push();
	angleMode(DEGREES)
	translate(x, y)
	scale(1, scale_height)
	rotate(45);
	// shadow
	noStroke();
	fill(242, 116, 5, 90)
	rect(8, 0, size, size, 3,40,40);
	// actual drop
	fill(dark_color)
	stroke(light_color);
	rect(0, 0, size, size, 3,40,40);
	angleMode(RADIANS)
	pop();
	
	push();
	noStroke();
	translate(x-5, y+25)
	scale(1, scale_height)
	fill(light_color)
	ellipse(0, 0, 7, 15)
	pop();
}

function buzzy_bee(x, y, cur_frac, colour, size, mover){
	push();
	scale(size, size);
	let scale_height = 0;
	if(cur_frac <= 0.5){
		scale_height = map(cur_frac, 0, 0.5, 1, 1.3)
	}
	else{
		scale_height = map(cur_frac, 0.5,1, 1.3,1)
	}

	// shadow
	noStroke()
	fill(0, 0, 0, 90)
	ellipse(x+10, y+10, 35, 25)

	// buzzy bees
	rectMode(CENTER);
	fill(colour);
	ellipse(x, y, 35, 25);
	fill('black');
	rect(x, y, 5, 25, 30, 30, 30, 30);
	rect(x-10, y, 5, 20, 30, 30, 30, 30);
	rect(x+10, y, 5, 20, 30, 30, 30, 30);

	if (mover) {
		let manyLines = int(map(cur_frac, 0, 1, 0, x));
		for(let i =0; i < manyLines; i++ ){
			stroke(colour);
			strokeWeight(4);
			line(i*-10, y, i*-10, y);
		}
	}
	
	noStroke()
	// for wings
	fill(255, 255, 255, 200);
	angleMode(DEGREES);
	rectMode(CORNERS);
	
	// wing top
	push();
	translate(x, y)
	rotate(200 *scale_height);
	rect(0, 0, 20, 20, 3,40,40);
	pop();

	// wing bottom
	push();
	fill(255, 255, 255, 200)
	translate(x, y)
	rotate(200 *scale_height+180);
	rect(0, 0, 20, 20, 3,40,40);
	pop();

	angleMode(RADIANS);
	pop();
}