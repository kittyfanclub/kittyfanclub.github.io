// This code is licensed under the GNU General Public License found at: kittyfanclub.github.io/license.txt
//requires sounds.js
var kittyCount = 0;

function getSpectators(count, location) {
  for (i = 0; i < count; i++) {
    try {
      startNumber= Math.floor(Math.random() * 400000) + 1000;
      showKittyById(startNumber, location, true);
    } catch(e) {
        alert(e);
    }
  }
}

function  initBackgroundKitty() {
  var body = document.getElementsByTagName('body')[0];
  body.style.background =
    'url("https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/1.svg") center no-repeat';
  body.style.backgroundPosition = 'bottom right';
}

function updateBackgroundKitty() {
  initBackgroundKitty();
  var body = document.getElementsByTagName('body')[0];
  setInterval(function() {
    let id = Math.floor(Math.random() * 400000) + 1000;
    try {
      var kittyUrl = 'https://api.cryptokitties.co/kitties/' + id;
      $.getJSON(kittyUrl, function(data) {
        if (data.image_url != undefined && data.image_url.length > 0) {
          var background = 'url('+data.image_url+') center no-repeat';
          body.style.background = background;
          body.style.backgroundPosition = 'bottom right';
        }
      } )
    } catch(e) {
    }
    return false;
  }, 5000);
}

function removeKitties() {
  $("img").remove();
}

function showNewKitty(location) {
  removeKitties();
  showKitty(location);
}


function showKitty(location) {
  kittyId = document.getElementById('kittyid').value;
  showKittyById(kittyId, location, true);
}

function showKittyById(id, location, playMeow) {
  if (id.length == 0) {
      id= Math.floor(Math.random() * 20000);
  }
  if (location == undefined) {
    location = 'body';
  }
  try {
    kittyCount = kittyCount + 1;
    var kittyUrl = 'https://api.cryptokitties.co/kitties/' + id;
    $.getJSON(kittyUrl, function(data) {
        var curKitty = kittyCount * 1000000 + id;
        $( "<img>" )
        .attr( "src", data.image_url )
        .attr('title', id + ". " + data.name + " -- " + data.bio)
        .attr('id', 'kitty' + curKitty)
        .attr('onclick', 'kittyClicked(\'kitty'+curKitty+'\')')
        .on('dragstart', function(event) {
          event.preventDefault();
          kittyPetted(curKitty);
        })
        .appendTo( location );
        retVal = true;
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
  return false;
}
