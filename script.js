import map from './map.js';

window.onload = function () {
  var app = new Vue({
    el: '#game',
    data: {
      terminalInput: '',
      feedback: 'feedback',
      currentCoords: [0,0],
    },
    methods: {

      procesTerminalInput: function() {
        this.handleTerminalInput();
        this.clearTerminalInput();
      },

      handleTerminalInput: function() {
        switch(this.terminalInput) {
          case '':
            // do nothing
            break;
          case 'n':
          case 's':
          case 'e':
          case 'w':
            // move
            this.move()
            break;
          case 'a':
          case 'attack':
            // attack
            this.attack();
            break;
          case 'exits':
            // attack
            this.showExits();
            break;
          case 'location':
            // attack
            this.showCurrentLocation();
            break;
          default:
            // code block
            return;
        }
      },

      clearTerminalInput: function() {
        this.terminalInput = '';
      },

      move: function() {

        if (!this.hasExit()) {
          this.feedback = 'No exit in that direction.';
          return;
        }

        var direction = '';

        switch(this.terminalInput) {
          case 'n':
            // direction = 'north';
            this.currentCoords[0] += 1;
            break;
          case 's':
            // direction = 'south';
            this.currentCoords[0] -= 1;
            break;
          case 'e':
            // direction = 'east';
            this.currentCoords[1] += 1;
            break;
          case 'w':
            // direction = 'west';
            this.currentCoords[1] -= 1;
            break;
        }

        this.checkLocation();
      },

      hasExit: function() {
        let exits = map[this.currentCoords.toString()].exits;
        console.log(exits);
        if (exits.includes(this.terminalInput)) {
          return true;
        }
      },

      showExits: function() {
        this.feedback = map[this.currentCoords.toString()].exits;
      },

      showCurrentLocation: function() {
        this.feedback = map[this.currentCoords.toString()].name;
      },

      checkLocation: function() {

        for (var coords in map) {

          if (coords == this.currentCoords.toString()) {
            this.feedback = 'You arrive at ' + map[coords].name;
          }
        }
      },

      attack: function() {
        this.feedback = 'yaaaaaaaaaaaaaaaaaar';
      },
    }
  })
}
