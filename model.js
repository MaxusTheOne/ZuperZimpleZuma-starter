import SimpleLinkedList from "./simplelinkedlist.js";

export {init, getFirstBall, getNextBall, getCannonBall,dump,addRandomBall,addRandomBalls,findMatches,removeMatches,insertBallAfterWIthNum,loadCannon,insertBallAfter}
const list = new SimpleLinkedList();

function init() {
  console.log("Model init");
  loadCannon()
}

function dump() {
  let node = list.head;
  let output = "";
  while(node != null) {
    output += '"' + node.data + node.id +'"';
    output += " -> ";
   
    node = node.next;
  }
  output += "null";
  console.log(output);
}

// **** WRAPPERS ****
function addRandomBall() {
  const ball = randomBall()
  list.add(ball)
  return ball
}
function addRandomBalls(int) {
  for (let i = 0; i < int; i++) {
    const ball = randomBall()
    list.add(ball)
  }
}

function addBall(ball) {
  list.add(ball)
  return ball
}

function numberOfBalls() {
  return list.size()
}

function getFirstBall(){
  return list.head
}

function getNextBall(node){
  return node.next
}

function insertBallAfter(node, ball){

  return list.insertAfter(ball, node)
}
function insertBallAfterWIthNum(num, ball){

  let node = list.head
  for(let i = 1; i < num; i++){
    node = node.next;
  }

  return list.insertAfter(ball, node)
}

// **** CANNON ****
let cannonBall;

function loadCannon() {
  cannonBall = randomBall();
  return cannonBall;
}

function getCannonBall() {
  return cannonBall;
}

// **** MATCHES ****
// ["🔴", "🔵","🟡","🟢","🟢"]

function findMatches(node) {
  const matches = [node]
  let lookAt = node
  //Before
  if (lookAt.prev != null){
    while (lookAt.prev.data == node.data && lookAt.prev != null){

      matches.push(lookAt.prev)
      lookAt = lookAt.prev
      if (lookAt.prev == null) break;
    }
  }
  lookAt = node
  //After
  if (lookAt.next != null){
    while (lookAt.next.data == node.data){

      matches.push(lookAt.next)
      lookAt = lookAt.next
      if (lookAt.next == null) break;
    }
  }
  return matches
}

function removeMatches(nodes){

  nodes.forEach(node =>  list.remove(node));
}

// **** BALLS ****

const balls = ["🔴", "🔵","🟡","🟢"];

function randomBall() {
  return balls[Math.floor(Math.random()*balls.length)];
}

function red() {
  return balls[0];
}

function blue() {
  return balls[1];
}

function yellow() {
  return balls[2];
}

function green() {
  return balls[3];
}

//debugger;