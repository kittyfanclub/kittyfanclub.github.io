function getBattleCat(id) {
  var json = getBattleCatJson(id);
  var kitty = buildKittyFromObject(json);

  return kitty;
}

// this is what defines this as the builder for all creatures
// only one declaration of this variable should be included in
// the entire system
var g_creatureBuilderFunction =
function getBattleCatAsynch(id, callbackFunction) {

  var callback1 = function(data) {
    // define callback function to set values for kitty
    if (data == "error") {
      // return an error
      callbackFunction("error");
    }
    if (data.id != undefined &&
        data.name != undefined &&
        data.image_url != undefined &&
        data.img != undefined &&
        data.genetics != undefined) {
      var kitty = buildKittyFromObject(data);
      callbackFunction(kitty);
    }
  }
    //callBackFunction(kitty);
  var catData = new Object();
  getGeneticCodeAsynch(id, catData, callback1);
  getKittyDataAsynch(id, catData, callback1);
}

function getBattleCatJson(id) {
  if (id == undefined) {
    return getDummyBattleCatJson();
  }
  return getBattleCatFromCryptoKittyDex(id);
}

function getDummyBattleCatJson() {
  var myJSON = {
      "id" : "1",
      "name" : "fred",
      "image" : "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/1.png",
      "genetics" : "ccac 7787 fa7f afaa 1646 7755 f9ee 4444 6766 7366 cccc eede"
    };
  return myJSON;
}
function getGeneticCode(id) {

  var callback = function(code) {
      console.log("callback:" + code);
  }

  getGeneticCodeAsynch(id, callback);
}

function getGeneticCodeAsynch(id, catData, callback) {
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
      catData.genetics = parsedCode;
      callback(catData);
    })
    .done(function() {
      })
    .fail(function() {
      callback(null);
    });
}

function getKittyDataAsynch(id, catData, callback) {
  var kittyUrl = 'https://api.cryptokitties.co/kitties/' + id;
  $.getJSON(kittyUrl, function(data) {
    if (data.image_url != undefined && data.image_url.length > 0) {
      // return image
      catData.image_url = data.image_url;
      // return id
      catData.id = id;
      // return name
      catData.name = data.name;
      callback(catData);

      // load image
      var img = new Image();
      img.onload=function(){
        try {
          catData.img = img;
          callback(catData);
        } catch (err) {
          callback("error");
          console.log(err);
        }
      }
      img.src = catData.image_url;
    }
    else {
      callback("error");
    }
  } );

}



function getBattleCatFromCryptoKittyDex(id) {
  var urlStr = "https://cryptokittydex.com/kitties/" + id;
  $.ajax({
      url: urlStr,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
      },
      type: "GET", /* or type:"GET" or type:"PUT" */
      dataType: "html",
      data: {
      },
      success: function (result) {
          console.log(result);
      },
      error: function () {
          console.log("error");
      }
  });
}


function buildKittyFromObject(_buildData) {
  var name = buildCreatureName(_buildData);
  var attributes = buildCreatureAttributes(_buildData);
  var display = buildCreatureDisplay(_buildData);
  var moves = buildCreatureMoves(_buildData);

  var creature = new BattleCreature(name, attributes, display, moves);
  return creature;
}

function buildCreatureName(_buildData) {
  return _buildData.name;
}

function buildCreatureDisplay(_buildData) {

  var display = new CreatureDisplay(1, 1, 50, 50, _buildData.image_url, _buildData.img);

  return display;
}

function buildCreatureAttributes(_buildData) {
  var genetics = _buildData.genetics;
  var life = getCreatureLife(genetics);
  var baseDefense = getCreatureBaseDefense(genetics);

  var attributes = new CreatureAttributes(life, baseDefense);

  return attributes;
}

function getCreatureLife(genetics) {
  var set = getGeneticSet(genetics, 11);
  var m1 = (getGeneticSetElement(set, 0) + 1);
  var m2 = (getGeneticSetElement(set, 1) + 1);
  var modifier = (m1 * m2) % 16;

  return getPower(100, modifier, 10);
}

function getCreatureBaseDefense(genetics) {
  var set = getGeneticSet(genetics, 11);
  var m1 = (getGeneticSetElement(set, 1) + 1);
  var m2 = (getGeneticSetElement(set, 2) + 1);
  var modifier = (m1 * m2) % 16;

  return getPower(100, modifier, 10);
}


function buildCreatureMoves(_buildData) {
  var genetics = _buildData.genetics;
  //constructor(_name, _cooldown, _power, _critChance, _dev) {

  var attackMoves = buildAttackMoves(genetics, 9, 8, 7);
  var defenseMoves = buildDefenseMoves(genetics, 3);

  var moves = new CreatureMoves(attackMoves, defenseMoves);

  return moves;
}
/*
0 ccac
1 7787
2 fa7f
3 afaa - mouth (defense move - name, power, cooldown)
4 1646
5 7755 - fancy type (passive )
6 f9ee - secondary color (aoe )
7 4444 - primary color (attacks - name, power, dev, cooldown)
8 6766- eye type (attacks - name, power, dev, cooldown)
9 7366- eye color (attacks - name, power, dev, cooldown)
10 cccc- pattern (attacks - name, power, dev, cooldown)
11 eede- body (defense) and (life)

Genes are stored in 12 blocks of 4x5-bit codes
Each 5-bit code represents a cattribute associated with the position in the gene
(body, pattern type, eye color, eye type, primary color, pattern color, secondary color, fancy type, mouth)
Each block of 4 codes represents 1 dominant trait expressed in the Kitty followed by 3 recessive traits.
*/

function getGeneticSet(genetics, setNumber) {
  var start = setNumber * 5;
  var end = start + 4;
  var set = genetics.substring(start, end);
  return set;
}

function getGeneticSetElement(genSet, eleNumber) {
  return convertGenToDecimal(genSet.substring(eleNumber, eleNumber + 1));
}

function convertGenToDecimal(hex) {
  if (hex=="0") return 0;
  if (hex=="1") return 1;
  if (hex=="2") return 2;
  if (hex=="3") return 3;
  if (hex=="4") return 4;
  if (hex=="5") return 5;
  if (hex=="6") return 6;
  if (hex=="7") return 7;
  if (hex=="8") return 8;
  if (hex=="9") return 9;
  if (hex=="a") return 10;
  if (hex=="b") return 11;
  if (hex=="c") return 12;
  if (hex=="d") return 13;
  if (hex=="e") return 14;
  if (hex=="f") return 15;
  if (hex=="g") return 0;
  if (hex=="h") return 1;
  if (hex=="i") return 2;
  if (hex=="j") return 3;
  if (hex=="k") return 4;
  if (hex=="l") return 5;
  if (hex=="m") return 6;
  if (hex=="n") return 7;
  if (hex=="o") return 8;
  if (hex=="p") return 9;
  if (hex=="q") return 10;
  if (hex=="r") return 11;
  if (hex=="s") return 12;
  if (hex=="t") return 13;
  if (hex=="u") return 14;
  if (hex=="v") return 15;
  return 0;
}
