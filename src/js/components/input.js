import globals from './globals';
import movement from './movement';

// Create a function with a promise that resolves after a timeout of x miliseconds.
// This is used as a delay for the attack rounds.
const timer = ms => new Promise(res => setTimeout(res, ms));
const lineHeight = 28.714285714;
const secPerLine = 0.5;

globals.inputElement.onchange = (event) => procesInput(event.target.value);

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
      movement.move(textInput);
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
      movement.describeLocation();
      break;
    default:
      // code block
      return;
  }
}

function clearInputField() {
  globals.inputElement.value = '';
}

/**
 * Print feedback to the window
 * @param  {string} feedback - the text
 * @param  {array} cssClass - list of classes to add to the span element
 */
async function printFeedback(feedback, cssClass = false) {
  let span = document.createElement("span");
  if (cssClass.length) cssClass.forEach( element => span.classList.add(element) )
  let text = document.createTextNode(feedback);

  span.appendChild(text);
  globals.outputElement.prepend(span);
}

async function printStory(story, cssClass) {
  globals.inputElement.readOnly = true;
  printFeedback(story, cssClass);

  await timer(20);

  let storyElement = document.querySelector('.story');
  let duration = (storyElement.clientHeight / lineHeight) * secPerLine;

  storyElement.classList.add('scroll-up');
  storyElement.style.transitionDuration = `${duration}s`;

  duration = Math.round(duration * 1000);

  setTimeout( () => {
    globals.inputElement.readOnly = false
  }, duration);
}

export { printFeedback as default};
