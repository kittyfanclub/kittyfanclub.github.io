var allSoundsMap = new Map();

function getSound(file) {
  try {
    let sound = allSoundsMap.get(file);
    if (sound == undefined) {
      sound = new Audio(file);
      allSoundsMap.set(file, sound);
    }
    return sound;
  } catch (err) {

  }
}
function playSound(file) {
  try {
    let sound = getSound(file);
    sound.play();
  } catch (err) {

  }
}

function playRandomMeow() {
  let num = Math.floor(Math.random() * 7) + 1;
  let file = 'sounds/meows/meow' + num + '.mp3';
  playSound(file);
}


function playRandomPurr() {
  let file = 'sounds/purr/purr.mp3';
  try {
    let sound = getSound(file);
    sound.play();
  } catch (err) {

  }
}



function silence(file) {
  if (file === undefined) {
    // silence all sounds
    for (var [key, value] of allSoundsMap) {
      try {
        value.pause();
      } catch (err) {
      }
    }
    return;
  }

  // silence 1 sound
  let sound = allSoundsMap.get(file);
  if (sound != undefined) {
    sound.pause();
  }
}
