function test1() {
  alert('Test1');
}

function getKitty(id) {
  alert(id);
  var kittyUrl = 'https://api.cryptokitties.co/kitties/' & id;
  $.getJSON(kittyUrl, function(data) {
    alert(data);
  });
}
