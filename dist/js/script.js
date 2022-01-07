import map from './map.js';
import monsters from './monsters.js';

window.onload = function () {

  const inputElement = document.getElementsByClassName('input-field')[0];
  const outputElement = document.getElementsByClassName('output-field')[0];

  inputElement.addEventListener('change', (event) => {
    procesInput(event.target.value);
  });

  let currentCoords = [0,0];

    // data: {
    //   textInput: '',
    //   feedback: '',
    //   ,
    // },

  function procesInput(textInput) {
    handleInput(textInput);
    clearInputField();
  }

  function handleInput(textInput) {
    switch(textInput) {
      case '':
        // do nothing
        break;
      case 'n':
      case 's':
      case 'e':
      case 'w':
        // move
        move(textInput);
        break;
      case 'a':
      case 'attack':
        // attack
        attack();
        break;
      case 'exits':
        // attack
        showExits();
        break;
      case 'location':
        // attack
        showCurrentLocation();
        break;
      case 'l':
      case 'look':
        // attack
        describeLocation();
        break;
      default:
        // code block
        return;
    }
  }

  function clearInputField() {
    inputElement.value = '';
  }

  function move(textInput) {

    if (!hasExit(textInput)) {
      setFeedback('No exit in that direction.');
      return;
    }

    var direction = '';

    switch(textInput) {
      case 'n':
        // direction = 'north';
        currentCoords[0] += 1;
        break;
      case 's':
        // direction = 'south';
        currentCoords[0] -= 1;
        break;
      case 'e':
        // direction = 'east';
        currentCoords[1] += 1;
        break;
      case 'w':
        // direction = 'west';
        currentCoords[1] -= 1;
        break;
    }

    outputNewLocation();
  }

  function hasExit(textInput) {
    let exits = map[currentCoords.toString()].exits;

    if (exits.includes(textInput)) {
      return true;
    }
  }

  function showExits() {
    setFeedback(map[currentCoords.toString()].exits);
  }

  function showCurrentLocation() {
    setFeedback(map[currentCoords.toString()].name);
  }

  function outputNewLocation() {

    for (var coords in map) {

      if (coords == currentCoords.toString()) {
        setFeedback('You arrive at ' + map[coords].name);
      }
    }
  }

  function describeLocation() {
    setFeedback(map[currentCoords].description);
  }

  function setFeedback(feedback) {
    feedback = `<span>${ feedback }</span>\n`;
    outputElement.innerHTML += feedback;
  }

  function attack() {
    setFeedback('yaaaaaaaaaaaaaaaaaar');
  }
}
