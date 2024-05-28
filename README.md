[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/HpplOQZx)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15016911&assignment_repo_type=AssignmentRepo)
## 2024 MDDN342 Assignment 3: Data Mappings

REPLACE ALL TEXT IN THIS FILE

This README should be used to document your design.

  this.ear_tilt = 0.5; // based off head angle - are they looking up / down at the camera
  this turned into more how much of the forehead is showing (ears were tilted really far down) or how much of their jaw was showing (ears were tilted really far up / non existent)
  this.wool_colour = 3; // based off hair colour
  This worked out pretty well. Although people who had brown hair sometimes had nearly black hair, or nearly red hair, so I chose to put the red headed people in the brown sheep category and the brown/black haired people in the black sheep category. I did it this way, because it seemed more rare (the odd black sheep-like) to have brownish black hair than red hair in this set of people! There were only a few gray haired people, so most grey sheep also have huge eyes (because eye size is based off age - if they're really old and have gray hair their eyes are huge, but if you're young you have small eyes). I think the AI can tell age apart quite well, because in the Traning Quiz, I can seem to get them correct if I focus on their eye size and emotion. 
  this.earrings = 1; // based off sex - masculine to feminine
  The earrings was a little tricky, because there was only three options: blue earrings, purple earrings, or no earrings. I put all the males in the no earrings because there were much less males in this training data than females. I then put the females with the most makeup in the blue earrings category, and the females with the least makeup, and the most defined bone structure in the purple earrings category. The AI gets a little confused at the females because it is quite specific.
  this.emotion = 'depressed'; // based off mouth (are teeth showing, smiling or average smiling)
  The emotions was categorized by: full of joy - the person needed to be smiling with their teeth; tired - the person needed to be smiling without their teeth; depressed - the person needed to not be smiling or laughing (I included mouth expressions with their teeth showing in this, and thinking back on this, it has given the AI less specificity for the training). 