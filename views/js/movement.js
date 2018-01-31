// This code is licensed under the GNU General Public License found at: kittyfanclub.github.io/license.txt
function move(kittyName, x, y) {
  let kitty = document.getElementById(kittyName)
      kitty.style.left = x;
      kitty.style.top =  y;
  }

  function slideKitty(kittyName, x, y, stepTime, totalTime) {
    let start = Date.now();
    let steps = totalTime / stepTime;
    let kitty = document.getElementById(kittyName)
    let xInc = x / steps;
    let yInc = y / steps;
    let timer = setInterval(function() {
        let timePassed = Date.now() - start;
        let kitty = document.getElementById(kittyName)

        kitty.style.left =  timePassed / stepTime * xInc + "px";
        kitty.style.top =  timePassed / stepTime * yInc + "px";
        if (timePassed > totalTime) clearInterval(timer);
      }, stepTime);
    }

    function slideAndReturnKitty(kittyName, x, y, stepTime, totalTime) {
      let start1 = Date.now();
      let halfTime = totalTime / 2;
      let steps = halfTime / stepTime;
      let kitty = document.getElementById(kittyName);
      let xInc = x / steps;
      let yInc = y / steps;

      let movedX = 0;
      let movedY = 0;
      let time1Running = true;
      // move
      let timer1 = setInterval(function() {
          let timePassed = Date.now() - start1;
          let kitty = document.getElementById(kittyName)

          movedX = timePassed / stepTime * xInc;
          movedY = timePassed / stepTime * yInc
          kitty.style.left = movedX  + "px";
          kitty.style.top = movedY + "px";
          if (timePassed > halfTime) {
            clearInterval(timer1);
            time1Running = false;
          }
        }, stepTime);

        // move back
        let time2Running = false;
        let start2 = Date.now();
        let timer2 = setInterval(function() {
          if (!time1Running) {
            if (!time2Running) {
              start2 = Date.now();
              time2Running = true;
            }
            else {
              timePassed = Date.now() - start2;
              kitty = document.getElementById(kittyName)

              kitty.style.left = movedX - timePassed / stepTime * xInc + "px";
              kitty.style.top =  movedY - timePassed / stepTime * yInc + "px";
              if (timePassed > halfTime) {
                clearInterval(timer2);
              }
            }
          }
        }, stepTime);
      }

    function nothing(totalTime) {
      let start = Date.now();
      while (Date.now() - start < totalTime) {

      }
    }

    function kittyClicked(kittyName) {
      // move up and down
      // random number between 3 and 10
      let num = Math.floor(Math.random() * 10) + 1;

      slideAndReturnKitty(kittyName, 0, -2 * num, 10, 60 * num);
      playRandomMeow();
    }

    function kittyPetted(kittyName) {
      // move up and down
      slideAndReturnKitty(kittyName, 0, -20, 10, 600);
      playRandomPurr();
    }

    function danceKitty(kittyName, totalTime) {
      // move left and back
      slideAndReturnKitty(kittyName, 0, -10, 10, 600);
    }
    function kneadKitty(kittyName, totalTime) {
      slideAndReturnKitty(kittyName, 0, -10, 10, 600);
    }
    function moveKitty(kittyName, x, y, steps) {
        let kitty = document.getElementById(kittyName)
        let xInc = (x - kitty.style.left) / steps;
        let yInc = (y - kitty.style.top) / steps;
        for (var i = 0; i < steps; i++) {
          kitty.style.left = kitty.style.left + xInc;
          kitty.style.top =  kitty.style.top + yInc;
        }
      }
