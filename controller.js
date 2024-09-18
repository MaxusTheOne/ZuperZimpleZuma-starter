import * as model from "./model.js";
import * as view from "./view.js";

// TODO: Export functions used by the view
export {createInitialChain, addNewBall,insertBallAfterNode}

window.addEventListener("load", init);

function init() {
  console.log("Controller init");
  model.init();
  view.init();

  createInitialChain();
  view.updateDisplay(model);
  // show debug info on the model
  model.dump();
  
  // store "shortcuts" to model and view in window
  window.model = model;
  window.view = view;
}

function createInitialChain() {
  for (let i = 0; i < 5; i++) {
    model.addRandomBall();
  }
}

// TODO: Add controller functions to handle things happening in the view

function addNewBall(){
  const newBall = model.addRandomBall()
  view.updateDisplay(model)
  
  view.animateNewBall(model,view.getVisualBallForModelNode(newBall))
  return newBall

}

function insertBallAfterNode(node){
  const newNode = model.insertBallAfter(node, model.getCannonBall())
  model.loadCannon()

  let nodeArr = []
  nodeArr = model.findMatches(newNode)
  if (nodeArr.length >= 3) model.removeMatches(nodeArr)
  
  view.updateDisplay(model)
}


// **** ANIMATIONS ****

// TODO: Add controller functions to be called when animations have completed

