import pcs from './pcs.js';
import storage from './storage.js';
import globals from './globals.js';

const menuDialog = document.querySelector('dialog.c-menu');
const newGameDialog = document.querySelector('dialog.c-menu--new-game');

menuDialog.showModal();
readButtons();

function readButtons() {
  const buttons = Array.from(menuDialog.querySelectorAll('button'));
  
  buttons.forEach( (button) => {
    
    switch (button.dataset.function) {
      case 'new':
        button.onclick = (event) => handleNewGame();
        break;
      case 'save':
        break;
      case 'load':
        break;
      case 'quit':
        button.onclick = (event) => window.close();
        break;
    }
  })
}

function handleNewGame() {
  menuDialog.close();
  newGameDialog.showModal();
  populateNewGamePCs();
}

function populateNewGamePCs() {
  const list = newGameDialog.querySelector('ul');
  
  for (const person in pcs) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    const name = pcs[person].name;
    
    button.append(name);
    button.dataset.function = name;
    li.appendChild(button);
    list.appendChild(li);

    button.onclick = (event) => {
      storage.setStorage('newGame', name);
      newGameDialog.close();
      globals.inputElement.focus();
    }
  }
}