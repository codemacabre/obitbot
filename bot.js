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
var factoidCount = 0;
var factoid = '';
var timeOfDeath = 'One of them could have been '; // placeholder
var causeOfDeath = 'heart attack'; // placeholder
var gender;
var forename = '';
var surname = '';

// Get random time of death
// TODO

// Get random cause of death
// TODO

function getFactoid(n) {
  switch(n) {
    case 0:
      factoid = '56 million people die every year. ';
      factoidCount++;
      break;
    case 1:
      factoid = 'Over 4.5 million people die every month. ';
      factoidCount++;
      break;
    case 2:
      factoid = 'Over 150000 people die every day. ';
      factoidCount++;
      break;
    case 3:
      factoid = 'Almost 6400 people die every hour. ';
      factoidCount++;
      break;
    case 4:
      factoid = '106 people die every minute. ';
      factoidCount++;
      break;
    case 5:
      factoid = '1.8 people die every second. ';
      factoidCount = 0;
      break;
  }
}

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
//function getRandomNames(callback) {
function getRandomNames() {
  btnContent = '';
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
      //callback();
    });
  });
}

function composeTweet() {
  tweetContent = {
    status: factoid + timeOfDeath + forename + ' ' + surname + ' who could have died of a ' + causeOfDeath + '.'
  };
}

function tweetIt() {
  getFactoid(factoidCount);
  getRandomGender();
  //getRandomCause();
  getRandomNames();
  composeTweet();
  if (tweetContent.status.length <= 140) {
    //console.log(tweetContent.status);
    console.log('\nTweet stats:');
    console.log('Gender: ' + gender);
    console.log('Forename: ' + forename);
    console.log('Surname: ' + surname);
    console.log('Cause: ' + causeOfDeath);
    console.log('Tweet length: ' + tweetContent.status.length + ' characters.');
  } else {
    console.log('ERROR! Tweet is too long. Cropping...')
    tweetContent = {
      status: 'Today, ' + forename + ' ' + surname + ' could have died of a ' + causeOfDeath + '.'
    };
  }
}

//setInterval(tweetIt, 1000*10);
tweetIt();

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
