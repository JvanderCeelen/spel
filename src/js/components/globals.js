const globals = {
  storageAvailable: storageAvailability('localStorage'),
  inputElement: document.querySelector('.input-field'),
  outputElement: document.querySelector('.output-field'),
}

function storageAvailability(type) {
  let storage;

  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch(event) {
    return (
      event instanceof DOMException &&
      event.name === 'QuotaExceededError' &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export {globals as default};