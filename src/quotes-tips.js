// function randomInteger(min, max) {
//   var result = Math.floor(Math.random() * (max - min + 1)) + min;
//   console.log("dice result: "+ result + '(between ' + min +' and '+max);
//   return result;
// }

function getQuotes(quotes){
  var timeDice = randomInteger(10000, 15000);
  var quoteDice = randomInteger(0, quotes.length-1);

  resetAnimation('#quote');
  $('#quote').text(quotes[quoteDice][0]);
  $('#quote_author').text(quotes[quoteDice][1]);

  setTimeout(function(){
    getQuotes(quotes);
  }, timeDice);
}

function getTips(tips) {
  var timeDice = randomInteger(10000, 15000);
  resetAnimation('#astuce_p');
  $('#astuce_p').text(tips[randomInteger(0, tips.length-1)]);

  setTimeout(function(){
    getTips(tips);
  }, timeDice);
}
