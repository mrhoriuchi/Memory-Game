const gameContainer = document.getElementById("game");
const resetButton = document.getElementById("reset");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add('card');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let card1 = null;
let card2 = null;
let gameCount = 0;
let gamePlays = 0;

//I could just set this to 0 in the html, but I figured I'd just copy paste what I had below.
document.getElementById('gamePlays').innerText = gamePlays;

// TODO: Implement this function!
function handleCardClick(event) {  
  if(card1 == null){
    card1 = event.target;
    card1.style.background = card1.classList[0];
    gamePlays+=1;
    document.getElementById('gamePlays').innerText = gamePlays;
  }
  
  //Made this else if so that if you click too fast, nothing happens
  else if(card1 != null && card2 == null){
    card2 = event.target;
    card2.style.background = card2.classList[0];
    gamePlays+=1;
    document.getElementById('gamePlays').innerText = gamePlays;

    //This is for if you click the same card twice.
    if(card1===card2){
      alert("You clicked the same card twice!");
      card1.style.background = '';
      card2.style.background = '';
      card1 = null;
      card2 = null;
    }

    //This will reset card1 and card2 and make the cards stay flipped.
    else if(card1.className === card2.className){
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      gameCount+=2;
      if(gameCount==10){
        setTimeout(function(){
          alert("You win!");
        },100);
      }
    }

    //This will make the cards you flipped blank because they don't match.
    else{
      setTimeout(function(){
      card1.style.background = '';
      card2.style.background = '';
      card1 = null;
      card2 = null;
      },1000);
    }
  }
}

//Need to add the event listener for the reset button.
resetButton.addEventListener("click", function(){
  const allDivs = document.querySelectorAll('.card')
  for(singleDiv of allDivs){
    singleDiv.remove();
  }
  createDivsForColors(shuffle(shuffledColors));
  card1 = null;
  card2 = null;
  gameCount = 0;
  gamePlays = 0;
})

// when the DOM loads
createDivsForColors(shuffledColors);
