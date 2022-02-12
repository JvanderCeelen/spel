import map from './map.js';
import monsters from './monsters.js';
import hero from './hero.js';

window.onload = function () {

  const inputElement = document.getElementsByClassName('input-field')[0];
  const outputElement = document.getElementsByClassName('output-field')[0];
  const heroHealthBar = document.getElementsByClassName('health-bar--hero')[0];
  const monsterHealthBar = document.getElementsByClassName('health-bar--monster')[0];
  const heroHealthBarInner = heroHealthBar.querySelector('.health-bar--inner');
  const monsterHealthBarInner = monsterHealthBar.querySelector('.health-bar--inner');

  const attackDie = 6;
  // Create a function with a promise that resolves after a timeout of x miliseconds.
  // This is used as a delay for the attack rounds.
  const timer = ms => new Promise(res => setTimeout(res, ms));
  const lineHeight = 28.714285714;
  const secPerLine = 0.5;

  inputElement.addEventListener('change', (event) => {
    procesInput(event.target.value);
  });

  let currentCoords = [0,0];

  function intro() {
    printStory('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', ['story']);
  }

  // call on load
  intro();

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
      printFeedback('No exit in that direction.');
      return;
    }

    // let direction = '';

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
    checkForMonsters();
  }

  function hasExit(textInput) {
    let exits = map[currentCoords.toString()].exits;

    if (exits.includes(textInput)) {
      return true;
    }
  }

  function showExits() {
    printFeedback(map[currentCoords.toString()].exits);
  }

  function showCurrentLocation() {
    printFeedback(map[currentCoords.toString()].name);
  }

  function outputNewLocation() {

    for (var coords in map) {

      if (coords == currentCoords.toString()) {
        printFeedback('You arrive at ' + map[coords].name);
      }
    }
  }

  function checkForMonsters() {

    let presentMonsters = map[currentCoords].monsters;

    // check for monsters
    if (presentMonsters.length) {
      presentMonsters.forEach( monster => {
        if (monsters[monster].agressive) attack(monsters[monster]);
      })
    }
  }

  function describeLocation() {
    printFeedback(map[currentCoords].description);
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
    outputElement.prepend(span);
  }

  async function printStory(story, cssClass) {
    inputElement.readOnly = true;
    console.log(inputElement);
    printFeedback(story, cssClass);

    await timer(20);

    let storyElement = document.querySelector('.story');
    let duration = (storyElement.clientHeight / lineHeight) * secPerLine;

    storyElement.classList.add('scroll-up');
    storyElement.style.transitionDuration = `${duration}s`;

    duration = Math.round(duration * 1000);

    setTimeout( () => {
      inputElement.readOnly = false
    }, duration);
  }

  function attack(attacker, defender = hero) {
    printFeedback('yaaaaaaaaaaaaaaaaaar');
    let round = 0,
        damage = 0,
        attackerHp = attacker.hp,
        defenderHp = defender.hp;

    async function load() {
      while (attackerHp > 0 && defenderHp > 0) {
        round += 1;

        damage = calcAttackDamage(attacker);
        defenderHp = (defenderHp - damage > 0) ? defenderHp - damage : 0;
        handleHealthbar(defender, damage);
        printFeedback(`${attacker.name} hits ${defender.name} for ${damage} damage.`);

        if (defenderHp == 0) {
          isHero(defender.name) ? printFeedback('Noooooooooooo! You are dead...') : printFeedback(`${defender.name} falls dead to the ground`);
          return;
        }

        damage = calcAttackDamage(defender);
        attackerHp = (attackerHp - damage > 0) ? attackerHp - damage : 0;
        handleHealthbar(attacker, damage);
        printFeedback(`${defender.name} hits ${attacker.name} for ${damage} damage.`);

        if (attackerHp == 0) isHero(attacker.name) ? printFeedback('Noooooooooooo! You are dead...') : printFeedback(`${attacker.name} falls dead to the ground`);

        // call the timer function with 1s as parameter.
        await timer(1000);
      }
    }

    load();

  }

  function calcAttackDamage (character) {
    return Math.ceil(Math.random() * attackDie + character.attack);
  }

  function handleHealthbar(character, damage) {
    let barWidth = 0;

    if (isHero(character.name)) {
      barWidth = heroHealthBarInner.clientWidth - heroHealthBar.clientWidth * (damage / character.hp);
      heroHealthBarInner.style.width = (barWidth >= 0) ? barWidth + 'px' : 0 + 'px';
    } else {
      barWidth = monsterHealthBarInner.clientWidth - monsterHealthBar.clientWidth * (damage / character.hp);
      monsterHealthBarInner.style.width = (barWidth >= 0) ? barWidth + 'px' : 0 + 'px';
    }
  }

  function isHero(name) {
    return (name === hero.name) ? true : false;
  }
}
