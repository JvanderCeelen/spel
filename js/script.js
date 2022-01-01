import map from './map.js';
import monsters from './monsters.js';

window.onload = function () {
  var app = new Vue({
    el: '#game',
    data: {
      terminalInput: '',
      feedback: '',
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
          case 'l':
          case 'look':
            // attack
            this.describeLocation();
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
          this.setFeedback('No exit in that direction.');
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

        if (exits.includes(this.terminalInput)) {
          return true;
        }
      },

      showExits: function() {
        this.setFeedback(map[this.currentCoords.toString()].exits);
      },

      showCurrentLocation: function() {
        this.setFeedback(map[this.currentCoords.toString()].name);
      },

      checkLocation: function() {

        for (var coords in map) {

          if (coords == this.currentCoords.toString()) {
            this.setFeedback('You arrive at ' + map[coords].name);
          }
        }
      },

      describeLocation: function() {
        this.setFeedback(map[this.currentCoords].description);
      },

      setFeedback: function(feedback) {
        this.feedback = '<span class="feedback">' + feedback + '</span>\n';
      },

      attack: function() {
        this.setFeedback('yaaaaaaaaaaaaaaaaaar');
      },
    }
  })
}
