import * as view from "./view.js";
import * as controller from "./controller.js"
export {animateNewBall,animateCannonBall,animateRemoveBalls}

// TODO: Export animation functions
// ALSO: Remember to import the same functions in view

// *********************************
// *                               *
// *         ANIMATIONS            *
// *                               *
// *********************************

function animateNewBall(model, newBall) {
  // update entire model
  view.updateDisplay(model)

  // Find the visualBall for this newBall
  const visualBall = view.getVisualBallForModelNode(newBall)
  

  // We only want to animate the image - not the entire div with the button
  const onlyImg = visualBall.firstElementChild;
  console.log(onlyImg);
  

  // First: - position to start from - somewhere just outside the screen
    const chainBox = document.getElementById("chain");
    const chainBoxRect = chainBox.getBoundingClientRect();
    
    
    
  // Last: - position to end - the current position of the visualBall
    const ballRect = visualBall.getBoundingClientRect();
  
  
  
  // Invert - calculate difference
  const distance = chainBoxRect.right - ballRect.left

  // temp prop.. I think
  onlyImg.style.setProperty("--delta-x", distance + "px");
  
  // Play animation
  onlyImg.classList.add("animate-add");
  onlyImg.addEventListener("animationend", doneAnimateNewBall);
  function doneAnimateNewBall(event) {
    // onlyImg.removeEventListener("animationend", doneAnimateNewBall);
    // onlyImg.classList.remove("animate-add");
  }
}

/**
 * Use simple animation to expand the space already occupied by a visualball 
 */
function animateExpandSpaceForBall( visualBall ) {
  visualBall.classList.add("animate-expand");
  visualBall.addEventListener("animationend", doneExpanding);

  function doneExpanding() {
    visualBall.removeEventListener("animationend", doneExpanding);
    visualBall.classList.remove("animate-expand");
  }
}

/**
 * Use FLIP animation to animate a ball from the position of the canonball
 */
function animateCannonBall(model, newBall) {
  // Start by updating the entire model
  view.updateDisplay(model)

  // Find the visualBall for this newBall
  const visualBall = view.getVisualBallForModelNode(newBall)

  // Animate the space for the new ball
  animateExpandSpaceForBall(visualBall);

  // Do FLIP animation to move the newball from the position of the cannonball
  // to the current position of the visualBall

  // First: Find the starting position of the ball - which is where the cannonball is
  const visualCannonball = document.querySelector("#cannon .ball img").getBoundingClientRect();
  
  // TODO: Find the position (x and y) of the visualCannonBall
  const visualCannonballxy = [visualCannonball.x, visualCannonball.y]
  console.log(visualCannonballxy);
  
  
  // Last: Find the destination position of the ball - which is where it has been added
  const ballImage = visualBall.querySelector("img"); // only use the img, not the entire element with the button
  const ballImageProps = ballImage.getBoundingClientRect()

  // TODO: Find the position (x and y) of the ballImage
  const ballImagexy = [ballImageProps.x, ballImageProps.y]

  // Invert: calculate the distance to move from source to destination
  const deltaX = visualCannonballxy[0] - ballImagexy[0]; 
  const deltaY = visualCannonballxy[1] - ballImagexy[1]; 
  console.log(deltaX,deltaY);
  

  // Play: run the animation from source to destination
  ballImage.style.setProperty("--delta-x", deltaX + "px");
  ballImage.style.setProperty("--delta-y", deltaY + "px");
  ballImage.classList.add("animate-fromcannon");

  // Hide the cannonball while animating
  document.querySelector("#cannon .ball img").classList.add("hide");

  ballImage.addEventListener("animationend", doneMoving);

  function doneMoving() {
    ballImage.removeEventListener("animationend", doneMoving);
    ballImage.classList.remove("animate-fromcannon");
    ballImage.style.removeProperty("--delta-x");
    ballImage.style.removeProperty("--delta-y");

    // Show the cannonball again, after animating
    document.querySelector("#cannon .ball img").classList.remove("hide");
    // TODO: Notify controller when ball has moved
    console.log("Done moving canonball");
  }
}

function animateRemoveBalls(model, balls) {
  // NOTE: Run the animation-implode animations BEFORE updating the view
  console.log("removing matches", balls);
  

  
  let first = true;
  const lastBall = balls[balls.length-1];
  const nextBall = model.getNextBall(lastBall);
  for(const ball of balls) {
    const visualBall = view.getVisualBallForModelNode(ball);
    visualBall.classList.add("implode");  
    if(first) {
      first = false;
      visualBall.addEventListener("animationend", () => {
        console.log("removeAnimation end");
        
        controller.matchesRemoved([nextBall]);
        view.updateDisplay(model);    
      });
    }  
  }
}



 