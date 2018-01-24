function getGeneticCode(id) {

  var callback = function(code) {
      console.log("callback:" + code);
  }

  getGeneticCodeAsynch(id, callback);
}

function getGeneticCodeAsynch(id, callback) {
  var idHexNum = id.toString(16);
  var idHex = idHexNum + "";
  while (idHex.length < 6) {
    idHex = "0" + idHex;
  }
  var url = "http://api.infura.io/v1/jsonrpc/mainnet/eth_call?params=%5B%7B%22to%22%3A%220x06012c8cf97BEaD5deAe237070F9587f8E7A266d%22%2C%20%22data%22%3A%220xe98b7f4d0000000000000000000000000000000000000000000000000000000000"+idHex+"%22%7D%2C%22latest%22%5D";
  var req = $.getJSON(url, function(data) {
      var geneticCode = data.result;
      var code = geneticCode.substring(geneticCode.length - 60);
      var parsedCode = "";
      for (var i = 0; i < code.length; i = i + 4) {
        if (parsedCode.length > 0) {
            parsedCode = parsedCode + " ";
        }
        parsedCode = parsedCode + code.substring(i, i + 4);
      }
      callback(parsedCode);
    })
    .done(function() {
      })
    .fail(function() {
      callback(null);
    });
}
