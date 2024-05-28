[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/HpplOQZx)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15016911&assignment_repo_type=AssignmentRepo)
# 2024 MDDN342 Assignment 3: Data Mappings

# Summary 

# Documentation
## Part 1: Face Sketching
1. Same face, different pose
My initial idea is to have my sheeps variables all the same, and the different pose would be their emotions.
2. Same pose, different face
As you can see, their pose is their emotion, and the different sheep can be hugely varying. 

## Part 2 & 3: Mapping Landmarks & Training Examples
The face points from the positions array shapes the sheep face through the shape of the persons chin, their nose placement, ear placement (which I assumed was the top of the chin coordinates), eye position, and which direction they're facing in. 

The ear placement was very tricky, as chin position still doesn't specify exactly where the ears actually are, and because I've been using different angle modes, the ears still got placed in weird situations. This is why I had to use eyebrow placement and eye placement try get the correct placement of the ears. The nose, cheeks, and mouth are all moved together with the nose tip and bridge positions. 

When a person is turned to the right or to the left significantly, I've made the cheek, ear, and eye disappear so it actually looks like the face has turned to the right or the left. The sheep wool is not determined by anything, it's still just a random generator, as sheeps' fluff should always be random depending on the person :)

- the sheeps' ear tilt: is based off the persons head angle, like if they're looking up or down at the camera. This turned into more how much of the forehead is showing (ears were tilted really far down) or how much of their jaw was showing (ears were tilted really far up / non existent).
- the sheeps' wool colour: is based off the persons hair colour. This worked out pretty well. Although people who had brown hair sometimes had nearly black hair, or nearly red hair, so I chose to put the red headed people in the brown sheep category and the brown/black haired people in the black sheep category. I did it this way, because it seemed more rare (the odd black sheep-like) to have brownish black hair than red hair in this set of people! There were only a few gray haired people, so most grey sheep also have huge eyes (because eye size is based off age). I think the AI can tell age apart quite well, because in the Traning Quiz, I can seem to get them correct if I focus on their eye size and emotion. 
- the sheeps' eye size: is based off the persons age. If they're really old their eyes are huge, but if you're young you have small eyes. To help the AI with this training, I counted old people as having heaps of wrinkles versus the young people having no creases whatsoever. 
- the sheeps' earrings; is based off a persons facial masculinity to femininity. The earrings was a little tricky, because there was only three options: blue earrings, purple earrings, or no earrings. I put all the males in the no earrings because there were much less males in this training data than females, and I wanted to AI to properly identify masculine faces. I then put the females with the most makeup in the blue earrings category, and the females with the least makeup - also with the most defined bone structure in the purple earrings category (these females would be the more 'masculine' type faces). The AI gets a little confused at the females because it is quite specific.
- the sheeps' emotion: is based off mouth expression - going from the teeth showing smile, teeth covered smile, to anything which isn't a smile. In other words, the emotions were categorized by: full of joy - the person needed to be smiling with their teeth; tired - the person needed to be smiling without their teeth; depressed - the person needed to not be smiling or laughing (I included sad mouth expressions with their teeth showing in this, and thinking back on this, it has given the AI less specificity for the training). 

### Changes to the code base
I have commented out all the rotate functionality inside system_runner.js, specifically these lines: 

// rotate(degrees(data_angle)); 

because I wanted the sheeps faces to be continually straight up, as sheep only tilt their heads if they're sick. Also, this code conflicted with the rotation functionality I already had in the face.js file. 

### References
- kids playing in the grass: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.agrowingunderstanding.com.au%2Fhow-group-programs-can-help-your-child-reach-their-goals%2F&psig=AOvVaw10XZhMxMTUB0QdAkoDnXOp&ust=1716959837469000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCID5hv7Lr4YDFQAAAAAdAAAAABAE
- Sad girls preview single cover: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.officialcharts.com%2Fchart-news%2Fclean-bandit-french-the-kid-and-rema-team-up-on-sad-girls-first-listen__37363%2F&psig=AOvVaw28Q8G00pfIWFv1B73dhAb0&ust=1716959991884000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMjNh-_Mr4YDFQAAAAAdAAAAABBn
- Three people running in the grass: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-photo%2Fgroup-three-friends-boy-two-girls-running-having-fun-together-outdoors_13915081.htm&psig=AOvVaw3EBxhE_GQ1d2xfk6NkcWSK&ust=1716960434085000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNDMpZ7Or4YDFQAAAAAdAAAAABBG
- family with sheep: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.theland.com.au%2Fstory%2F8479581%2Ftight-supply-lifts-lamb-prices-across-nsw%2F&psig=AOvVaw2sFpXhTuF87h5NfI4TV3xB&ust=1716960617321000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMDp___Or4YDFQAAAAAdAAAAABBR

