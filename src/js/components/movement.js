import printFeedback from './input.js';
import map from './map.js';

const movement = {
  currentCoords: [0,0],

  move(textInput) {
  
    if (! movement.hasExit(textInput)) {
      printFeedback('No exit in that direction.');
      return;
    }
  
    // let direction = '';
  
    switch(textInput) {
      case 'n':
        // direction = 'north';
        movement.currentCoords[0] += 1;
        break;
      case 's':
        // direction = 'south';
        movement.currentCoords[0] -= 1;
        break;
      case 'e':
        // direction = 'east';
        movement.currentCoords[1] += 1;
        break;
      case 'w':
        // direction = 'west';
        movement.currentCoords[1] -= 1;
        break;
    }
  
    movement.outputNewLocation();
    // checkForMonsters();
  },
  
  describeLocation() {
    printFeedback(map[movement.currentCoords].description);
  },
  
  hasExit(textInput) {
    let exits = map[movement.currentCoords.toString()].exits;
  
    if (exits.includes(textInput)) {
      return true;
    }
  },
  
  showExits() {
    printFeedback(map[movement.currentCoords.toString()].exits);
  },
  
  showCurrentLocation() {
    printFeedback(map[movement.currentCoords.toString()].name);
  },
  
  outputNewLocation() {
  
    for (var coords in map) {
  
      if (coords == movement.currentCoords.toString()) {
        printFeedback('You arrive at ' + map[coords].name);
      }
    }
  }
}

export {movement as default};

