// TODO: Import controller
import * as controller from "./controller.js"
import { animateNewBall,animateCannonBall,animateRemoveBalls } from "./animations.js";
export {init, updateDisplay, getVisualBallForModelNode,animateNewBall,animateCannonBall,animateRemoveBalls}

// *********************************
// *                               *
// *          THE VIEW             *
// *                               *
// *********************************

function init() {
  console.log("View init");
  document.querySelector("#addball").addEventListener("click", addNewBall);
}

function addNewBall() {
  console.log("View clicked add new ball"); 
  // notify controller
  const newBallNode = controller.addNewBall();
  
}

const visualBalls = {
  "🔴": "red-ball.png",
  "🔵": "blue-ball.png",
  "🟡": "yellow-ball.png",
  "🟢": "green-ball.png"
}

const nodeToVisualBall  = new Map();
function getVisualBallForModelNode(ballNode) {
  return nodeToVisualBall.get(ballNode);
}

function updateDisplay(model) {
  // Update the entire chain
  console.log("view updated");
  
  const visualChain = document.querySelector("#chain");
  // remove everything
  visualChain.innerHTML = "";

  // iterate through model of balls with the usual linked list method:
  // - find the first, loop while it isn't null, inside the loop: find the next


  let ballNode = model.getFirstBall()
  

  while(ballNode != null ) {
    // add visual ball
    const visualBall = createVisualBall(ballNode.data);
    visualChain.append(visualBall);
    // add button next to ball
    addButtonTo(visualBall, ballNode);
    nodeToVisualBall.set(ballNode, visualBall);

    // get next ball
    ballNode = model.getNextBall(ballNode)

  }

  // Also update the cannonball
  updateCannonBall(model.getCannonBall());
}

function updateCannonBall(color) {
  const visualCannon = document.querySelector("#cannon");
  visualCannon.innerHTML = "";
  const visualCannonBall = createVisualBall(color);
  visualCannon.append(visualCannonBall);
}

function createVisualBall(color) {
  const visualBall = document.createElement("div");
  visualBall.classList.add("ball");
  const image = document.createElement("img");
  image.src = "images/"+visualBalls[color];
  visualBall.append(image);
  return visualBall;
}

function addButtonTo(visualBall, ballModel) {
  const button = createButton();
  visualBall.append(button);
  // handle click
  button.addEventListener("click", () => {
    console.log(`Clicked button after ${ballModel.data}`);
    console.log(ballModel);
    // notify controller
    controller.insertBallAfterNode(ballModel)

  });
}

function createButton() {
  const button = document.createElement("button");
  button.textContent = "↑";
  return button;
}
