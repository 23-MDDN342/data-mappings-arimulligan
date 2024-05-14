/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 3;

// other variables can be in here too
// here's some examples for colors used


const stroke_color = [95, 52, 8];

// example of a global function
// given a segment, this returns the average point [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len ];
}

// This where you define your own face object
function Face() {
  // these are state variables for a face
  // (your variables should be different!)
  this.detailColour = [204, 136, 17];
  this.mainColour = [51, 119, 153];
  this.num_eyes = 2;    // can be either 1 (cyclops) or 2 (two eyes)
  this.eye_shift = -1;   // range is -10 to 10
  this.mouth_size = 1;  // range is 0.5 to 8

  this.chinColour = [153, 153, 51]
  this.lipColour = [136, 68, 68]
  this.eyebrowColour = [119, 85, 17]

  // make random coordinates for head fluff
  this.fluffiList = getRandomCoordinates(20);
  this.ear_tilt = 0.8;
  this.wool_colour = 2;
  this.earrings = 2;
  this.eyeSize = 0.5;
  this.emotion = 'full of joy';

  angleMode(RADIANS);

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
   let faceSizeY = positions.chin[0][1] - positions.chin[(positions.chin.length-1)/2][1];
   let left_eye_pos = segment_average(positions.left_eye);
   let right_eye_pos = segment_average(positions.right_eye);


   let pink = color(227, 132, 163, 200);
   let mainSheepColour;
   let middleWoolColour;
   let outlineOfSheep;
   let shadowColour;
   let shineyWoolColour;
 
   if (this.wool_colour == 1){
     mainSheepColour = color('#BF8665'); // brown
     middleWoolColour = color('#A6754B'); // greyish brown
     outlineOfSheep = color('#593E25');
     shadowColour = color('#8a623e');
     shineyWoolColour = color('#D9A679');
   } else if (this.wool_colour == 2){
     mainSheepColour = color(250, 249, 230); // cream
     middleWoolColour = color(235, 240, 219); // middle cream
     outlineOfSheep = color(54, 49, 92); // navy blue
     shadowColour = color(224, 224, 206); // shadow cream
     shineyWoolColour = color('white');
   } else if (this.wool_colour == 3){
     mainSheepColour = color('#A6A6A6'); // grey
     middleWoolColour = color('#8C8B88'); // greyish
     outlineOfSheep = color(54, 49, 92);
     shadowColour = color('#8a8986');
     shineyWoolColour = color('#BFBFBF');
   } else {
     // the black sheep
     mainSheepColour = color('#4a4848');
     middleWoolColour = color('#3d3c3c');
     outlineOfSheep = color('black');
     shadowColour = color('#2e2d2d');
     shineyWoolColour = color('#636161');
   }

   // draw the sheep using private methods
   this._drawEarsAndFaceShape(positions.chin, left_eye_pos, right_eye_pos, positions.right_eyebrow[2][1], mainSheepColour, shadowColour);
   this._drawWool(shadowColour, middleWoolColour, mainSheepColour, shineyWoolColour);
   this._drawPupils(left_eye_pos, right_eye_pos, outlineOfSheep, mainSheepColour);
   
   // move cheeks, nose and mouth down according to faceSize
   push();
   translate(0, faceSizeY/2)
   this._drawCheeksAndNose(pink);
   
   // emotion
   push();
   noFill();
   stroke(outlineOfSheep);
   strokeWeight(0.15)
   if (this.emotion == 'full of joy'){
     scale(1.5, 1)
     arc(-0.25, 2.5, 0.5, 0.5, 0, PI, OPEN);
     arc(0.25, 2.5, 0.5, 0.5, 0, PI, OPEN);
     fill('pink')
     strokeWeight(0.2)
     arc(0, 2.8, 0.5, 0.5, 0, PI, OPEN);
     pop();
   } else if (this.emotion == 'depressed'){
     scale(1.5, -1);
     // sad mouth
     arc(0, -4, 1, 2, 0, PI, OPEN);
     arc(0, -4, 1, 1.5, 0, PI, OPEN);
     pop();
   } else if (this.emotion == 'tired'){
     line(-1, 3.3, 1, 3.3);
     pop();
   }
   pop();
 }

 this._drawEarsAndFaceShape = function(facePoints, ear_pos1, ear_pos2, yPos, mainColour, shadowColor){
   // ears
   stroke(shadowColor);
   strokeWeight(0.3);
   push()
   translate(1.5, 1)
   this._drawEars(ear_pos1[0], ear_pos1[1], mainColour); 
   pop();
   push();
   scale(-1, 1)
   this._drawEars(ear_pos2[0], ear_pos2[1], mainColour);
   pop();

   // shape of face
   stroke(shadowColor);
   fill(mainColour)
   // main area
   let arcX = facePoints[0][0];
   let faceSizeX = facePoints[facePoints.length-1][0] - facePoints[0][0];
   let faceSizeY = yPos - facePoints[(facePoints.length-1)/2][1];
   ellipse(arcX+faceSizeX/2, yPos-faceSizeY/3, faceSizeX, faceSizeY)

   // jaw
   beginShape();
    for(let i=0; i<facePoints.length; i++) {
     let px = facePoints[i][0];
     let py = facePoints[i][1];
     curveVertex(px, py);
    }
   endShape();
 }

 /**
  * A private helper method to draw the sheeps' eyes
  * @param {*} outlineOfSheep color of stroke
  */
 this._drawPupils = function(left_eye_pos, right_eye_pos, outlineOfSheep, mainColour){
   fill(outlineOfSheep);
   stroke(outlineOfSheep);
   
  if (this.emotion == 'tired'){
    ellipse(left_eye_pos[0], left_eye_pos[1], this.eyeSize, this.eyeSize);
    ellipse(right_eye_pos[0], right_eye_pos[1], this.eyeSize, this.eyeSize);
    noFill();
    strokeWeight(0.2) // tired wrinkles
    arc(left_eye_pos[0]-0.3, left_eye_pos[1]+0.5, this.eyeSize+0.5, this.eyeSize+0.5, 0, PI, OPEN);
    arc(right_eye_pos[0]-0.3, right_eye_pos[1]+0.3, this.eyeSize, this.eyeSize, 0, PI, OPEN);
  } else if (this.emotion == 'full of joy'){
    arc(left_eye_pos[0], left_eye_pos[1], this.eyeSize, this.eyeSize, PI, 0, OPEN);
    arc(right_eye_pos[0], right_eye_pos[1], this.eyeSize, this.eyeSize, PI, 0, OPEN);
  } else if (this.emotion == 'depressed') {
    fill(mainColour);
    ellipse(left_eye_pos[0], left_eye_pos[1]+0.6, this.eyeSize, this.eyeSize);
    arc(left_eye_pos[0]-0.6, left_eye_pos[1]-0.3, this.eyeSize+2, this.eyeSize+1, 0, PI-PI/2, OPEN);
    ellipse(right_eye_pos[0], right_eye_pos[1]+0.6, this.eyeSize, this.eyeSize);
    arc(right_eye_pos[0]-0.6, right_eye_pos[1]-0.3, this.eyeSize+2, this.eyeSize+1, PI/2, 0, OPEN);
  }
  
 }

 this._drawWool = function(shadowColour, middleWoolColour, mainSheepColour, shineyWoolColour){
   for (let i = 0; i < this.fluffiList.length; i++){
     let drawShine = false;
     if (this.fluffiList[i].y > -5.5){
       fill(shadowColour)
     } else if (this.fluffiList[i].y > -8) {
       fill(middleWoolColour)
     } else {
       drawShine = true;
       fill(mainSheepColour);
     }
     noStroke();
     circle(this.fluffiList[i].x, this.fluffiList[i].y, 1.5);
 
     if (drawShine){
       fill(shineyWoolColour)
       this._drawRoundedTriangle(this.fluffiList[i].x, this.fluffiList[i].y, 0.7, 0.7)
     }
   }
 }

 this._drawEars = function(x, y, mainSheepColour){
   push();
   angleMode(RADIANS)
   strokeWeight(0.15)
   rotate(this.ear_tilt); // TODO PUT ALL ANGLES IN RADIANS FUNCTION
   translate(this.ear_tilt, -this.ear_tilt);
   fill(mainSheepColour);
   arc(x, y, 2, 1.5, 0, PI, OPEN);
   arc(x, y+0.01, 2, 0.7, PI, 0, OPEN);
   arc(x, y+0.2, 1.2, 0.3, PI, 0, OPEN);
   fill(199, 139, 159, 200); //transparent pink
   noStroke();
   ellipse(x, y+0.25, 1.2, 0.3);
   
   if (this.earrings == 1){
     // two blue earrings on each ear
     fill('#004B87'); // dark blue
     ellipse(x+2, y+1, 0.7, 0.7);
     ellipse(x+2, y+2, 2.5, 1);
     fill('#2BA4DD') // light blue
     ellipse(x+1.2, y+2, 0.5, 0.5);
     ellipse(x+2, y+2, 0.5, 0.5);
     ellipse(x+2.7, y+2, 0.5, 0.5);
   } else if (this.earrings == 2){
     // no earrings
   } else {
     // orange and purple square earrings on top of one another
     fill('purple');
     rect(x+1.5, y+0.5, 1, 1);
     fill('orange')
     rect(x+2.2, y+1.2, 1, 1);
   }
   pop();
 }

 this._drawCheeksAndNose = function(pink){
  angleMode(RADIANS)
   // rosy cheeks
   fill(pink)
   noStroke();
   circle(1.5, 1.5, 1)
   circle(-1.5, 1.5, 1)
   
   // mid mouth
   ellipse(0, 2.3, 0.2, 0.5);
   //nostrils
   push();
   rotate(PI/3)
   translate(2.4, -2)
   ellipse(-0.5, 2.7, 0.2, 0.7);
   pop();
   push();
   rotate(-PI/3)
   translate(-2.4, -2)
   ellipse(0.5, 2.7, 0.2, 0.7);
   pop();
 
   // nose
   push();
   scale(1.3, -0.6)
   fill('pink')
   noStroke();
   this._drawRoundedTriangle(0, -3, 0.5, 0.7)
   pop();
 }

 /**
  * Found from https://editor.p5js.org/golan/sketches/P-NxlPAOa
  * @param {*} cx x coord
  * @param {*} cy y coord
  * @param {*} radius size
  * @param {*} roundedNess roundness of triangle edges
  */
 this._drawRoundedTriangle = function(cx, cy, radius, roundedNess) {
  angleMode(RADIANS)
   var trianglePoints = [];

   for (var i = 0; i < 3; i++) { // triangle vertices
     var x = cx + radius * cos(i * TWO_PI / 3.0 - HALF_PI);
     var y = cy + radius * sin(i * TWO_PI / 3.0 - HALF_PI);
     trianglePoints[i] = {
       x, y
     };
   }

   strokeJoin(ROUND);
   var rad = roundedNess * radius;

   beginShape();
   for (var i = 0; i < 3; i++) {
     var px = map(roundedNess, 0, 1, trianglePoints[i].x, cx);
     var py = map(roundedNess, 0, 1, trianglePoints[i].y, cy);

     var ang1 = (i + 1) * TWO_PI / 3.0 + HALF_PI;
     var ang2 = (i + 2) * TWO_PI / 3.0 + HALF_PI;
     var dang = (ang2 - ang1) / 60.0;
     for (var t = ang1; t <= ang2; t += dang) {
       var ax = px + rad * cos(t);
       var ay = py + rad * sin(t);
       vertex(ax, ay);
     }
   }
   endShape(CLOSE);
 }

  // example of a function *inside* the face object.
  // this draws a segment, and do_loop will connect the ends if true
  this._draw_segment = function(segment, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        ellipse(px, py, 0.1);
        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          line(px, py, nx, ny);
        }
        else if(do_loop) {
          let nx = segment[0][0];
          let ny = segment[0][1];
          line(px, py, nx, ny);
        }
    }
  };

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.num_eyes = int(map(settings[0], 0, 100, 1, 2));
    this.eye_shift = map(settings[1], 0, 100, -2, 2);
    this.mouth_size = map(settings[2], 0, 100, 0.5, 8);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.num_eyes, 1, 2, 0, 100);
    settings[1] = map(this.eye_shift, -2, 2, 0, 100);
    settings[2] = map(this.mouth_size, 0.5, 8, 0, 100);
    return settings;
  }
}

/**
 * From ChatGBT, altered to my code.
 * @param {*} numCoordinates max coords you want
 * @returns coordinates
 */
function getRandomCoordinates(numCoordinates) {
  const coordinates = [];
  const minY = -2; // TODO: change this, and ask how to make random points 
  const maxY = -3.5;
  const minX = -1;
  const maxX = 2;

  for (let i = 0; i < numCoordinates; i++) {
      const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
      const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
      coordinates.push({ x, y });
  }

  return coordinates;
}