import map from './map.js';
import monsters from './monsters.js';
import hero from './hero.js';

window.onload = function () {

  const inputElement = document.getElementsByClassName('input-field')[0];
  const outputElement = document.getElementsByClassName('output-field')[0];
  const attackDie = 6;
  const heroHealthBar = document.getElementsByClassName('health-bar--hero')[0];
  const monsterHealthBar = document.getElementsByClassName('health-bar--monster')[0];
  const heroHealthBarInner = heroHealthBar.querySelector('.health-bar--inner');
  const monsterHealthBarInner = monsterHealthBar.querySelector('.health-bar--inner');

  inputElement.addEventListener('change', (event) => {
    procesInput(event.target.value);
  });

  let currentCoords = [0,0];

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

  function printFeedback(feedback) {
    feedback = `<span>${ feedback }</span>\n`;
    outputElement.innerHTML += feedback;
  }

  function attack(attacker, defender = hero) {
    printFeedback('yaaaaaaaaaaaaaaaaaar');
    let round = 0;
    let damage = 0;
    let attackerHp = attacker.hp;
    let defenderHp = defender.hp;

    const timer = ms => new Promise(res => setTimeout(res, ms))
    // create a variable which is a function with ms as parameter.
    // In this function create a promise with resolve as parameter.
    // Set a timeout with resolve as a function and ms as the timeout.
    // const timer = function(ms) {
    //   new Promise(function(res) {
    //     setTimeout(res, ms)
    //   })
    // }

    // TODO: read up on promises
    // This function becomes the resolve parameter of the promise
    async function load() {
      while (attackerHp > 0 || defenderHp > 0) {
        round += 1;
        console.log('round ', round);

        console.log(defenderHp);
        damage = calcAttackDamage(attacker);
        console.log(damage);
        defenderHp -= damage;
        console.log(defenderHp);
        handleHealthbar(defender, damage);
        printFeedback(`${attacker.name} hits ${defender.name} for ${damage} damage.`)

        if (defenderHp <= 0) return;

        console.log(attackerHp);
        damage = calcAttackDamage(defender);
        console.log(damage);
        attackerHp -= damage;
        console.log(attackerHp);
        handleHealthbar(attacker, damage);
        printFeedback(`${defender.name} hits ${attacker.name} for ${damage} damage.`)

        // call the timer function with 1s as parameter.
        await timer(1000);
      }
    }

    // call the load function
    load();

  }

  function calcAttackDamage (character) {
    // let random = Math.random();
    // console.log(random);
    // console.log(random * attackDie);
    // console.log(Math.ceil(random * attackDie));
    // console.log(Math.ceil(random * attackDie) + character.attack);
    return Math.ceil(Math.random() * attackDie + character.attack);
  }

  function handleHealthbar(character, damage) {
    // let totalHpWidth = 0;
    // percentageDamage = (damage / character.hp);

    // console.log(damage / character.hp);
    // console.log(heroHealthBarInner.clientWidth * (damage / character.hp));
    // console.log(heroHealthBarInner.clientWidth - heroHealthBarInner.clientWidth * (damage / character.hp));

    if (character.name === hero.name) {
      heroHealthBarInner.style.width = heroHealthBarInner.clientWidth - heroHealthBar.clientWidth * (damage / character.hp) + 'px';
    } else {
      monsterHealthBarInner.style.width = monsterHealthBarInner.clientWidth - monsterHealthBar.clientWidth * (damage / character.hp) + 'px';
    }
  }
}
