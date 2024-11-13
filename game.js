var gameTitles = [
  "Birth → Youth: Do you hatch?",
  "Youth → Adulthood: Do you cross the road?",
  "Adulthood → Parent: Do you mate?",
  "Death: How do you die?",
  "Now, here is your life"
];

var questions = [
  [
    "Your parents guarded you (as an egg) like a hawk. [HATCH and spoiled]",
    "Your parents half-assed guarding you but you were hidden very well so nobody saw you. [HATCH]",
    "Your parents guarded you until you were born and then got captured and gassed by USDA Wildlife Services [HATCH without parents] ",
    "Your parent ingested rat poison and you hatch with severe birth defects, unable to fly. [HATCH but sterile] ",
    "A seagull found you and ate you. [ELIMINATED]",
    "Your egg was oiled by USDA Wildlife Services and you could not hatch. [ELIMINATED]"
  ],
  [
    "No, you did not follow your mother goose across and just barely missed getting run over by a car. [LIVE]",
    "You couldn’t decide, so your mother ran back and got run over by a car. [LIVE without parents]",
    "Yes, but were hit by a car and lost one of your legs. [LIVE with one leg]",
    "You got distracted by fresh grass and got adopted by a human family. [LIVE but won’t mate]",
    "Yes, and you got run over by a car. [ELIMINATED]",
    "No, you stayed back and got picked off by a stray cat. [ELIMINATED]"
  ],
  [
    "Yes! You were the prettiest goose in the whole flock and easily found a mate. [EGG]",
    "Even though you were no alpha David Beckgoose, you somehow managed it! [EGG]",
    "Yes, the runt of the flock took pity on you and your genes will be passed on. [EGG]",
    "No, but you did find a nest with a few eggs with no one guarding them, so you adopted them. [EGG]",
    "Nope. :( Whether you grew up alone, without parents, or simply without ri  zz you didn’t manage to mate. [ELIMINATED]",
    "Wow, bad luck! In the process of attempting to mate, you are caught by USDA Wildlife Services and killed secretly. [ELIMINATED]"
  ],
  [
    "You die peacefully with an entire flock of grandchildren. ",
    "You go insane from city noise, decide to migrate South, and die happily alone on a beach in Mexico.",
    "YOU GOT SUCKED INTO AIRPLANE ENGINE. Don’t worry, the humans survived. (see: Miracle on the Hudson2)",
    "You’re bagged and gassed like your parents — circle of life everybody.",
    "You die fighting for food and territory with another flock, remembered as a hero.",
    "You were chased down by a dog and never to be seen again…… the dog owner was charged a small fee though……"
  ]
];

document.body.classList.add('purple-bg');
var currentStageIndex = 0;
var playerName = "";
var allAnswers = [];
var babystate = true;


function startNextQuestion() {
  playerName = document.getElementById('player-name').value;
  var button = document.querySelector('.cute-orange-button');
  button.textContent = "Roll Dice";
  button.onclick = rollDice;

  var gameTitleElement = document.getElementById("game-title");
  gameTitleElement.textContent = gameTitles[currentStageIndex];

  document.getElementById('game-section').style.display = 'block';
  document.getElementById('name-form').style.display = 'none';
  document.getElementById('result').style.display = 'none';

  if (currentStageIndex === 0) {
    document.getElementById('Image').src = 'end.gif';
  } else if (currentStageIndex === 1) {
    document.getElementById('Image').src = 'dis.gif';
  } else if (currentStageIndex === 2) {
    document.getElementById('Image').src = 'cross.gif';
  } else if (currentStageIndex === 3) {
    document.getElementById('Image').src = 'fist.gif';
  } else if (currentStageIndex === 4) {
    document.getElementById('Image').src = 'dis.gif';
  } else {
    document.getElementById('Image').src = 'giphy.gif';
  }

  var buttonContainer = document.getElementById("button-container");
  buttonContainer.innerHTML = "";

  if (currentStageIndex === gameTitles.length - 1) {
    showAllAnswers();
  }
}
var nextButton;

function playAudio() {
  // Create an audio element
  var audio = new Audio('1.mp3');

  // Play the audio
  audio.play();
}
var playButton = document.getElementById('playButton');

document.addEventListener('keydown', function(event) {
  // Check if the pressed key is the spacebar (key code 32)
  if (event.key === ' ') {
    // Prevent the default behavior of the spacebar (e.g., scrolling the page)
    event.preventDefault();

    // Play the audio
    playAudio();
  }
});


function rollDice() {
  playAudio();
  const diceResult = Math.floor(Math.random() * 6) + 1;
  if (diceResult == 4) {
    babystate = false
  }
  var resultDisplay = document.getElementById('result')

  resultDisplay.style.display = 'block';

  var currentQuestionArray = questions[currentStageIndex];

  if (currentStageIndex == 2 && babystate == false) {
    resultDisplay.innerHTML = `${playerName}, Good effort but your genes were never going to enter the gene pool.`;
  } else {
    resultDisplay.innerHTML = `${playerName}, you rolled a ${diceResult}.<br>${currentQuestionArray[diceResult - 1]}`;

    allAnswers[currentStageIndex] = currentQuestionArray[diceResult - 1];

    if (diceResult == 4) {
      babystate = false
      document.body.classList.remove('purple-bg');
      document.body.classList.remove('gray-bg');
      document.body.classList.add('green-bg');

    } else if (diceResult > 4) {
      babystate = true
      document.body.classList.remove('purple-bg');
      document.body.classList.remove('green-bg');
      document.body.classList.add('gray-bg');

    } else if (diceResult < 4 && currentStageIndex < gameTitles.length - 1) {
      babystate = true
      document.body.classList.remove('gray-bg');
      document.body.classList.remove('green-bg');
      document.body.classList.add('purple-bg');
    }
  }


  var buttonContainer = document.getElementById("button-container");

  nextButton = document.createElement("button");
  nextButton.className = "cute-orange-button";
  nextButton.textContent = "Next";
  nextButton.type = "button";
  nextButton.onclick = function() {
    if (currentStageIndex < gameTitles.length - 2 && diceResult < 5) {
      currentStageIndex++;
      startNextQuestion();
    }

    else {
      showAllAnswers();
    }
  };

  buttonContainer.appendChild(nextButton);
}

function showAllAnswers() {
  babystate = true;
  var gameTitleElement = document.getElementById("game-title");
  gameTitleElement.textContent = gameTitles[gameTitles.length - 1];

  var resultDisplay = document.getElementById('result');
  resultDisplay.innerHTML = `<div style="text-align: center;">${allAnswers.join('<br>')}</div>`;

  nextButton.textContent = "Read More";
  nextButton.style.backgroundColor = 'white';
  nextButton.style.color = 'black';
  nextButton.onclick = function() {
    window.location.href = 'https://www.goosewatchnyc.com/news';
  };

  // 创建 replayButton
  var replayButton = document.createElement("button");
  replayButton.className = "cute-orange-button";
  replayButton.textContent = "Next Life";
  replayButton.type = "button";
  replayButton.className = "cute-orange-button replay-button";
  replayButton.onclick = function() {
    currentStageIndex = 0;
    allAnswers = [];
    startNextQuestion();
  };

  // 获取 buttonContainer 并将 replayButton 添加到其中
  var buttonContainer = document.getElementById("button-container");

  buttonContainer.appendChild(replayButton);
}