/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = false;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 5;

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

  this.emotion
  // make random coordinates for head fluff
  this.fluffiList = getRandomCoordinates(20);
  this.ear_tilt = 0.5; // based off head angle - are they looking up / dow nat the camera
  this.wool_colour = 3; // based off hair colour
  this.earrings = 1; // based off sex - masculine to feminine
  this.eyeSize = 0.5; //  based off age
  this.emotion = 'depressed'; // based off mouth (are teeth showing, smiling or average smiling)
  this.emotionTeller = 0 ;
  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   * Same pose, same face - positions according to this
   * Same pose, different face - training data variables
   */  
  this.draw = function(positions) {
   let left_eye_pos = segment_average(positions.left_eye);
   let right_eye_pos = segment_average(positions.right_eye);

   let pink = color(227, 132, 163, 200);
   let mainSheepColour;
   let middleWoolColour;
   let outlineOfSheep;
   let shadowColour;
   let shineyWoolColour;
 
   if (this.wool_colour == 0){
     mainSheepColour = color('#BF8665'); // brown
     middleWoolColour = color('#A6754B'); // greyish brown
     outlineOfSheep = color('#593E25');
     shadowColour = color('#8a623e');
     shineyWoolColour = color('#D9A679');
   } else if (this.wool_colour == 1){
     mainSheepColour = color(250, 249, 230); // cream
     middleWoolColour = color(235, 240, 219); // middle cream
     outlineOfSheep = color(54, 49, 92); // navy blue
     shadowColour = color(224, 224, 206); // shadow cream
     shineyWoolColour = color('white');
   } else if (this.wool_colour == 2){
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

   // turning left or right
   let tipOfNoseBridgeX = positions.nose_bridge[positions.nose_bridge.length-1][0];
   let showLeftSide = Math.abs(tipOfNoseBridgeX - positions.chin[2][0]) < 0.7 ? false : true;
   let showRightSide = Math.abs(tipOfNoseBridgeX - positions.chin[14][0]) < 0.7 ? false : true;

   // draw the sheep using private methods
   this._drawEarsAndFaceShape(positions.chin, left_eye_pos, right_eye_pos, positions.right_eyebrow[2][1], showLeftSide, showRightSide, mainSheepColour, shadowColour);
   this._drawWool(shadowColour, middleWoolColour, mainSheepColour, shineyWoolColour);
   this._drawPupils(left_eye_pos, right_eye_pos, showLeftSide, showRightSide, outlineOfSheep, mainSheepColour);
   
   // move cheeks, nose and mouth down according to faceSize
   let cheekPosition1 = positions.nose_tip[0];
   let cheekPosition2 = positions.nose_tip[positions.nose_tip.length-1];
   let nosePosition = segment_average(positions.nose_tip);
   
   this._drawCheeksAndNose(pink, cheekPosition1, cheekPosition2, nosePosition, showLeftSide, showRightSide);
   
   // emotion
   push();
   noFill();
   stroke(outlineOfSheep);
   strokeWeight(0.1)
   if (this.emotion == 'full of joy'){
     scale(1.5, 1)
     if (!showLeftSide){
       arc(nosePosition[0]+0.23, 1.5, 0.3, 0.3, 0, PI, OPEN);
    } else if (!showRightSide){
       arc(nosePosition[0]-0.07, 1.5, 0.3, 0.3, 0, PI, OPEN);
     } else {
        arc(nosePosition[0]+0.23, 1.5, 0.3, 0.3, 0, PI, OPEN);
        arc(nosePosition[0]-0.07, 1.5, 0.3, 0.3, 0, PI, OPEN);
        fill('pink')
        strokeWeight(0.1)
        arc(nosePosition[0]+0.1, 1.7, 0.3, 0.3, 0, PI, OPEN);
        pop();
     }
   } else if (this.emotion == 'depressed'){
     scale(1.5, -1);
     // sad mouth
     let mouth_Y = -1.8;
     arc(nosePosition[0]+0.1, mouth_Y, 0.5, 0.5, 0, PI, OPEN);
     arc(nosePosition[0]+0.1, mouth_Y, 0.5, 0.1, 0, PI, OPEN);
     pop();
   } else if (this.emotion == 'tired'){
     line(-0.5, nosePosition[1]+1.2, 0.7, nosePosition[1]+1.2);
     pop();
   }
 }

 this._drawEarsAndFaceShape = function(facePoints, ear_pos1, ear_pos2, yPos, showLeftSide, showRightSide, mainColour, shadowColor){
   // ears
   stroke(shadowColor);
   strokeWeight(0.3);
   if (showRightSide){
     push()
     translate(1.5, 1)
     this._drawEars(ear_pos1[0], ear_pos1[1], mainColour); 
     pop();
   }
   if (showLeftSide){
     push();
     scale(-1, 1)
     this._drawEars(ear_pos2[0], ear_pos2[1], mainColour);
     pop();
   }

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
  * TODO: SHOW LEFT SIDE AND RIGHT SIDE CONDITIONALS
  * @param {*} outlineOfSheep color of stroke
  */
 this._drawPupils = function(left_eye_pos, right_eye_pos, showLeftSide, showRightSide, outlineOfSheep, mainColour){
   fill(outlineOfSheep);
   stroke(outlineOfSheep);
   
  if (this.emotion == 'tired'){
    noFill();
    strokeWeight(0.2)
    let biggerWrinkleSize = 0.4;
    let biggerWrinkleSizeWidth = 0.5
    let wrinklePosDiff = 0.1;
    let wrinklePosDiff_X = 0.1;
    if (showLeftSide){
      ellipse(left_eye_pos[0], left_eye_pos[1], this.eyeSize, this.eyeSize);
      strokeWeight(0.1)
      arc(left_eye_pos[0]-wrinklePosDiff_X-0.1, left_eye_pos[1]+wrinklePosDiff, this.eyeSize+biggerWrinkleSizeWidth, this.eyeSize+biggerWrinkleSize, 0, PI+(PI/10), OPEN);
      arc(left_eye_pos[0]-wrinklePosDiff_X, left_eye_pos[1]+wrinklePosDiff, this.eyeSize+0.3, this.eyeSize+0.2, 0, PI, OPEN);
    }
    if (showRightSide){
      strokeWeight(0.2)
      ellipse(right_eye_pos[0], right_eye_pos[1], this.eyeSize, this.eyeSize);
      strokeWeight(0.1)
      arc(right_eye_pos[0]+wrinklePosDiff_X+0.1, right_eye_pos[1]+wrinklePosDiff, this.eyeSize+biggerWrinkleSizeWidth, this.eyeSize+biggerWrinkleSize, 0, PI+(PI/10), OPEN);
      arc(right_eye_pos[0]+wrinklePosDiff_X, right_eye_pos[1]+wrinklePosDiff, this.eyeSize+0.3, this.eyeSize+0.2, 0, PI, OPEN);
    }
  } else if (this.emotion == 'full of joy'){
    strokeWeight(0.2)
    let extraEyeSize = 0.1;
    if (showLeftSide) arc(left_eye_pos[0], left_eye_pos[1], this.eyeSize+extraEyeSize, this.eyeSize+extraEyeSize, PI, 0, OPEN);
    if (showRightSide) arc(right_eye_pos[0], right_eye_pos[1], this.eyeSize+extraEyeSize, this.eyeSize+extraEyeSize, PI, 0, OPEN);
  } else if (this.emotion == 'depressed') {
    strokeWeight(0.1)
    fill(mainColour);
    let eyelid_Y = -0.1;
    let eyelid_X = 0.2;
    if (showLeftSide){
      ellipse(left_eye_pos[0], left_eye_pos[1]+0.4, this.eyeSize, this.eyeSize);
      arc(left_eye_pos[0]-eyelid_X, left_eye_pos[1]-eyelid_Y, this.eyeSize+0.8, this.eyeSize+0.3, 0, PI-PI/2, OPEN);
    }
    if (showRightSide){
      ellipse(right_eye_pos[0], right_eye_pos[1]+0.4, this.eyeSize, this.eyeSize);
      arc(right_eye_pos[0]+eyelid_X, right_eye_pos[1]-eyelid_Y, this.eyeSize+0.8, this.eyeSize+0.3, PI/2, PI, OPEN);
    }
  }
  
 }

 this._drawWool = function(shadowColour, middleWoolColour, mainSheepColour, shineyWoolColour){
   for (let i = 0; i < this.fluffiList.length; i++){
     let drawShine = false;
     if (this.fluffiList[i].y < -3){
       drawShine = true;
       fill(mainSheepColour);
    } else if (this.fluffiList[i].y < -2) {
      fill(middleWoolColour)
    } else {
       fill(shadowColour)
     }
     noStroke();
     circle(this.fluffiList[i].x, this.fluffiList[i].y, 1.5);
 
     if (drawShine){
       fill(shineyWoolColour)
       this._drawRoundedTriangle(this.fluffiList[i].x-0.3, this.fluffiList[i].y-0.3, 0.2, 0.7)
     }
   }
 }

 this._drawEars = function(x, y, mainSheepColour){
   push();
   angleMode(RADIANS)
   strokeWeight(0.15)
   rotate(this.ear_tilt);
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
     ellipse(x+0.2, y+0.6, 0.2, 0.2);
     ellipse(x+0.5, y+1, 1, 0.5);
     fill('#2BA4DD') // light blue
     let dotSize = 0.2;
     ellipse(x+0.3, y+1, dotSize, dotSize);
     ellipse(x+0.5, y+1, dotSize, dotSize);
     ellipse(x+0.7, y+1, dotSize, dotSize);
   } else if (this.earrings == 2){
     // orange and purple square earrings on top of one another
     fill('purple');
     rect(x+0.2, y+0.5, 0.3, 0.3);
     fill('orange')
     rect(x+0.5, y+0.8, 0.4, 0.4);
    } else {
     // no earrings
   }
   pop();
 }

 this._drawCheeksAndNose = function(pink, cheekPosition1, cheekPosition2, nosePosition, showLeftSide, showRightSide){
  angleMode(RADIANS)
   // rosy cheeks
   fill(pink)
   noStroke();
   if (showLeftSide){
     circle(cheekPosition1[0]-0.6, cheekPosition1[1], 0.7)
   }
   if (showRightSide){
     circle(cheekPosition2[0]+0.6, cheekPosition2[1], 0.7)
   }
   
   push();
   translate(nosePosition[0], nosePosition[1]);
   // mid mouth
   ellipse(0, 1, 0.2, 0.5);
   //nostrils
   push();
   rotate(PI/3)
   translate(2.4, -2)
   ellipse(-1.5, 2.1, 0.2, 0.7);
   pop();
   push();
   rotate(-PI/3)
   translate(-2.4, -2)
   ellipse(1.5, 2.1, 0.2, 0.7);
   pop();
 
   // nose
   push();
   scale(1.3, -0.6)
   fill('pink')
   noStroke();
   this._drawRoundedTriangle(0, -1, 0.5, 0.7)
   pop();
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
    this.wool_colour = int(map(settings[0], 0, 100, 0, 4));
    this.eyeSize = map(settings[1], 0, 100, 0, 1);
    this.ear_tilt = map(settings[2], 0, 100, 0, 1);
    this.earrings = int(map(settings[3], 0, 100, 1, 3));
    this.emotionTeller = int(map(settings[4], 0, 100, 1, 3));
    this.emotion = this.emotionTeller == 1 ? 'full of joy' : this.emotionTeller == 2 ? 'tired' : 'depressed';
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(5);
    settings[0] = map(this.wool_colour, 0, 4, 0, 100);
    settings[1] = map(this.eyeSize, 0, 1, 0, 100);
    settings[2] = map(this.ear_tilt, 0, 1, 0, 100);
    settings[3] = map(this.earrings, 1, 3, 0, 100);
    settings[4] = map(this.emotionTeller, 1, 3, 0, 100);
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
  const minY = -4; // TODO: change this, and ask how to make random points 
  const maxY = -2;
  const minX = -1;
  const maxX = 2;

  for (let i = 0; i < numCoordinates; i++) {
      const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
      const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
      coordinates.push({ x, y });
  }

  return coordinates;
}