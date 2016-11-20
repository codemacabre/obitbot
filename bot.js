console.log('The bot is starting');

// Setup node packages
var fs = require('fs');
var twit = require('twit');
var http = require('http');
var parseString = require('xml2js').parseString;

// Setup Twitter API
var twitterAPI = require('./twitterapi.js');
var t = new twit(twitterAPI);

// Setup Behind the Name API
var btnAPI = require('./btnapi.js');
var btnAPIKey = btnAPI.key;
var btnPath = '/api/random.php?gender=' + gender + '&number=1&randomsurname=yes&key=' + btnAPIKey;

// Setup variables
var btnContent = '';
var tweetContent = {
  status: ''
};
var timeOfDeath = 'This morning'; // placeholder
var causeOfDeath = 'heart attack'; // placeholder
var gender;
var forename = '';
var surname = '';
var epitaph = 'Rest in peace.'; // placeholder

// Get random time of death
// TODO

// Get random cause of death
// TODO

// Get random gender
function getRandomGender() {
  var r = Math.floor(Math.random() * 2);
  if (r === 0) {
    gender = 'f';
  } else {
    gender = 'm';
  }
}

// Get random names
function getRandomNames(callback) {
  console.log('Getting names from behindthename.com...');
  return http.get({
    host: 'www.behindthename.com',
    path: btnPath
  }, function(response) {
    response.on('data', function(d) {
      btnContent += d;
      parseString(btnContent, function (err, result) {
        if (err) {
          console.log('Error parsing XML data!');
        } else {
          // Strip ugly XML / JSON structure
          var json = JSON.stringify(result);
          json = JSON.parse(json.substring(30, (json.length - 4)));

          // Get both names from remaining JSON array
          forename = json[0];
          surname = json[1];
        }
      });
    });
    response.on('end', function() {
      callback();
    });
  });
}

// Get random epitaph
// TODO

getRandomGender();
getRandomNames(function() {
  tweetContent = {
    status: timeOfDeath + ', ' + forename + ' ' + surname + ' died of a ' + causeOfDeath + '. ' + epitaph
  };
  console.log(tweetContent);
});


// Send tweet
/*
t.post('statuses/update', tweetContent, tweeted);

function tweeted(err, data, response) {
  if (err) {
    console.log('ERROR! Tweet failed to send.');
  } else {
    console.log('SUCCESS! Tweet sent.');
  }
}
*/
