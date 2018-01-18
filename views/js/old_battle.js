//requires sounds.js
var kitty1Number;
var kitty2Number;

function replaceKitty(kittyName, location) {
  $("img").remove();

    // handle kitty1
    if (kittyName == 'kitty1') {
        kitty1Number = '';
    }
    kitty1Number =  getBattleKittyById(kitty1Number, location, true, 'kitty1');

    // handle kitty2
    if (kittyName == 'kitty2') {
      kitty2Number = '';
    }
    kitty2Number =  getBattleKittyById(kitty2Number, location, true, 'kitty2');
}

function getBattleKittyById(id, location, playMeow, kittyName) {
  if (id.length == 0) {
      id= Math.floor(Math.random() * 20000);
  }
  console.log('kitty id: '+ id);
  if (location == undefined) {
    location = 'body';
  }
  try {
    var kittyUrl = 'https://api.cryptokitties.co/kitties/' + id;
    console.log('kitty url: '+ kittyUrl + " location: " + location);
    $.getJSON(kittyUrl, function(data) {
        $( "<img>" )
        .attr( "src", data.image_url )
        .attr('id', kittyName)
        .attr('onclick', 'attack();')
        .appendTo( location );
        console.log('image url: '+ data.image_url);
    })
    .done(function() {
      if (playMeow) {
        playRandomMeow();
      }
      })

    //.fail(function(jqXHR, textStatus, errorThrown) { alert('getJSON request failed! ' + textStatus); })
    //.always(function() { alert('getJSON request ended!'); });
  } catch(e) {
  }
  return id;
}

// kitties attack each other
function attack() {
  let start = Date.now();
  playSound('sounds/battle/attack.mp3');

  let timer = setInterval(function() {
    let totaltime = 800;
    let xfactor = 5;
    let yfactor = 10;
    let timePassed = Date.now() - start;
    if (timePassed < totaltime/2) {
      k1xLoc = timePassed / xfactor + 'px';
      k1yLoc = -timePassed / yfactor + 'px';
      k2xLoc = -timePassed / xfactor + 'px';
      k2yLoc = -timePassed / yfactor + 'px';
    }
    else {
      k1xLoc = (totaltime - timePassed) / xfactor + 'px';
      k1yLoc = -(totaltime - timePassed) / yfactor + 'px';
      k2xLoc = -(totaltime - timePassed) / xfactor + 'px';
      k2yLoc = -(totaltime - timePassed) / yfactor + 'px';
    }
    kitty1.style.left = k1xLoc;
    kitty1.style.top = k1yLoc;
    kitty2.style.left = k2xLoc;
    kitty2.style.top = k2yLoc;
    if (timePassed > totaltime) clearInterval(timer);

  }, 20);
  playSound('sounds/battle/growl.mp3');
}
