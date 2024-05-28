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

  ## References
  - kids playing in the grass: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.agrowingunderstanding.com.au%2Fhow-group-programs-can-help-your-child-reach-their-goals%2F&psig=AOvVaw10XZhMxMTUB0QdAkoDnXOp&ust=1716959837469000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCID5hv7Lr4YDFQAAAAAdAAAAABAE
  - Sad girls preview single cover: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.officialcharts.com%2Fchart-news%2Fclean-bandit-french-the-kid-and-rema-team-up-on-sad-girls-first-listen__37363%2F&psig=AOvVaw28Q8G00pfIWFv1B73dhAb0&ust=1716959991884000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMjNh-_Mr4YDFQAAAAAdAAAAABBn
  - Three people running in the grass: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-photo%2Fgroup-three-friends-boy-two-girls-running-having-fun-together-outdoors_13915081.htm&psig=AOvVaw3EBxhE_GQ1d2xfk6NkcWSK&ust=1716960434085000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNDMpZ7Or4YDFQAAAAAdAAAAABBG
  - family with sheep: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.theland.com.au%2Fstory%2F8479581%2Ftight-supply-lifts-lamb-prices-across-nsw%2F&psig=AOvVaw2sFpXhTuF87h5NfI4TV3xB&ust=1716960617321000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMDp___Or4YDFQAAAAAdAAAAABBR
