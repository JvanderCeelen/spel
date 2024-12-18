import globals from './globals';

const storage = {

  setStorage(key, value) {
    if (! globals.storageAvailable) return;
    localStorage.setItem(key, value)
  },
}

export {storage as default};