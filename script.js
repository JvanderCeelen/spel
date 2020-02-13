window.onload = function () {
  var app = new Vue({
    el: '#game',
    data: {
      terminalInput: '',
      state: 'state',
      feedback: 'feedback',
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
          default:
            // code block
            return;
        }
      },

      clearTerminalInput: function() {
        this.terminalInput = '';
      },

      move: function() {
        this.state = 'moving';

        var direction = '';

        switch(this.terminalInput) {
          case 'n':
            direction = 'north';
            break;
          case 's':
            direction = 'south';
            break;
          case 'e':
            direction = 'east';
            break;
          case 'w':
            direction = 'west';
            break;
        }

        this.feedback = 'You have moved ' + direction;
      },

      attack: function() {
        this.feedback = 'yaaaaaaaaaaaaaaaaaar';
      },
    }
  })
}
