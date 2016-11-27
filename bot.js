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
var btnPath = '';

// Setup variables
var btnContent = '';
var tweetContent = {
  status: ''
};
var factoidCount = 0;
var factoid = '';
var causeOfDeath = '';
var gender = ''
var forename = 'Tess'; // fallback
var surname = 'Terr'; // fallback

tweetIt();
setInterval(tweetIt, 1000 * 60 * 60);

// Get random mortality statistic
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

// Get random cause of death
function getRandomCause() {
  var r = Math.random() * 100;
  var selector = 0;
  switch (gender) {
    case 'm':
      if (r <= 0.0023) {
        // ICD 7 (Disease of the eye and adnexa)
        selector = Math.floor(Math.random() * 2);
        if (selector === 0) {
          causeOfDeath = 'of a disease of the eye';
        } else {
          causeOfDeath = 'of a disease of the adnexa';
        }
      } else if (r <= 0.0050) {
        // ICD 8 (Disease of the ear and mastoid process)
        selector = Math.floor(Math.random() * 2);
        if (selector === 0) {
          causeOfDeath = 'of a disease of the ear';
        } else {
          causeOfDeath = 'of a disease of the mastoid process';
        }
      } else if (r <= 0.1422) {
        // ICD 12 (Disease of the skin and subcutaneous tissue)
        selector = Math.floor(Math.random() * 2);
        if (selector === 0) {
          causeOfDeath = 'of a disease of the skin';
        } else {
          causeOfDeath = 'of a disease of the subcutaneous tissue';
        }
      } else if (r <= 0.2660) {
        // ICD 13 (Disease of the musculoskeletal system and connective tissue)
        selector = Math.floor(Math.random() * 2);
        if (selector === 0) {
          causeOfDeath = 'of a disease of the musculoskeletal system';
        } else {
          causeOfDeath = 'of a disease of the connective tissue';
        }
      } else if (r <= 0.3537) {
        // ICD 3 (Disease of blood and disorder of immune mechanism)
        selector = Math.floor(Math.random() * 2);
        if (selector === 0) {
          causeOfDeath = 'of a disease of the blood';
        } else {
          causeOfDeath = 'of a disorder of the immune system';
        }
      } else if (r <= 0.4439) {
        // ICD 4 (Endocrine, nutritional and metabolic disease)
        selector = Math.floor(Math.random() * 3);
        if (selector === 0) {
          causeOfDeath = 'of an endocrine disease';
        } else if (selector == 1) {
          causeOfDeath = 'of a nutritional disease';
        } else {
          causeOfDeath = 'of a metabolic disease';
        }
      } else if (r <=  0.5705) {
        // ICD 17 (Congenital malformation, deformation and abnormality)
        selector = Math.floor(Math.random() * 3);
        if (selector === 0) {
          causeOfDeath = 'of a congenital malformation';
        } else if (selector == 1) {
          causeOfDeath = 'of a congenital deformation';
        } else {
          causeOfDeath = 'of a congenital abnormality';
        }
      } else if (r <= 0.9608) {
        // ICD 16 (Condition originating in the perinatal period)
        causeOfDeath = 'of a condition originating in the perinatal period';
      } else if (r <= 1.6497) {
        // ICD 5 (Mental and behavioural disorder)
        selector = Math.floor(Math.random() * 2);
        if (selector === 0) {
          causeOfDeath = 'of a mental disorder';
        } else if (selector == 1) {
          causeOfDeath = 'of a behavioural disorder';
        }
      } else if (r <= 2.0821) {
        // ICD 14 (Disease of the genitourinary system)
        causeOfDeath = 'of a disease of the genitourinary system';
      } else if (r <= 2.5575) {
        // ICD 6 (Disease of the nervous system)
        causeOfDeath = 'of a disease of the nervous system';
      } else if (r <= 3.5005) {
        // ICD 18 (Symptom, sign and abnormal clinical and laboratory findings)
        selector = Math.floor(Math.random() * 4);
        if (selector === 0) {
          causeOfDeath = 'of a symptom of abnormal laboratory findings';
        } else if (selector == 1) {
          causeOfDeath = 'of a sign of abnormal laboratory findings';
        } else if (selector == 2) {
          causeOfDeath = 'of a symptom of abnormal clinical findings';
        } else {
          causeOfDeath = 'of a sign of abnormal clinical findings';
        }
      } else if (r <= 3.5005) {
        // ICD 1 (Infectious and parasitic disease)
        selector = Math.floor(Math.random() * 2);
        if (selector === 0) {
          causeOfDeath = 'of an infectious disease';
        } else {
          causeOfDeath = 'of a parasitic disease';
        }
      } else if (r <= 5.0241) {
        // ICD 11 (Disease of the digestive system)
        causeOfDeath = 'of a disease of the digestive system';
      } else if (r <= 9.2260) {
        // ICD 10 (Disease of the respiratory system)
        causeOfDeath = 'of a disease of the respiratory system';
      } else if (r <= 10.9316) {
        // ICD 20 (External cause of morbidity and mortality)
        selector = Math.floor(Math.random() * 2);
        if (selector === 0) {
          causeOfDeath = 'of an external cause of morbidity';
        } else {
          causeOfDeath = 'of an external cause of mortality';
        }
      } else if (r <= 21.4441) {
        // ICD 2 (Neoplasm)
        causeOfDeath = 'of a neoplasm';
      } else {
        // ICD 9 (Disease of the circulatory system)
        causeOfDeath = 'of a disease of the circulatory system';
      }
      break;
    case 'f':
      if (r <= 0.0030) {
        // ICD 7 (Disease of the eye and adnexa)
        selector = Math.floor(Math.random() * 2);
        if (selector === 0) {
          causeOfDeath = 'of a disease of the eye';
        } else {
          causeOfDeath = 'of a disease of the adnexa';
        }
      } else if (r <= 0.0046) {
        // ICD 8 (Disease of the ear and mastoid process)
        selector = Math.floor(Math.random() * 2);
        if (selector === 0) {
          causeOfDeath = 'of a disease of the ear';
        } else {
          causeOfDeath = 'of a disease of the mastoid process';
        }
      } else if (r <= 0.1296) {
        // ICD 15 (Pregnancy, childbirth and the puerperium)
        selector = Math.floor(Math.random() * 3);
        if (selector === 0) {
          causeOfDeath = 'during pregnancy';
        } else if (selector == 1) {
          causeOfDeath = 'during childbirth';
        } else if (selector == 2) {
          causeOfDeath = 'during the puerperium';
        }
      } else if (r <= 0.2246) {
        // ICD 12 (Disease of the skin and subcutaneous tissue)
        selector = Math.floor(Math.random() * 2);
        if (selector === 0) {
          causeOfDeath = 'of a disease of the skin';
        } else {
          causeOfDeath = 'of a disease of the subcutaneous tissue';
        }
      } else if (r <= 0.4439) {
        // ICD 3 (Disease of blood and disorder of immune mechanism)
        selector = Math.floor(Math.random() * 2);
        if (selector === 0) {
          causeOfDeath = 'of a disease of the blood';
        } else {
          causeOfDeath = 'of a disorder of the immune system';
        }
      } else if (r <= 0.5499) {
        // ICD 13 (Disease of the musculoskeletal system and connective tissue)
        selector = Math.floor(Math.random() * 2);
        if (selector === 0) {
          causeOfDeath = 'of a disease of the musculoskeletal system';
        } else {
          causeOfDeath = 'of a disease of the connective tissue';
        }
      } else if (r <= 0.5512) {
        // ICD 17 (Congenital malformation, deformation and abnormality)
        selector = Math.floor(Math.random() * 3);
        if (selector === 0) {
          causeOfDeath = 'of a congenital malformation';
        } else if (selector == 1) {
          causeOfDeath = 'of a congenital deformation';
        } else {
          causeOfDeath = 'of a congenital abnormality';
        }
      } else if (r <= 0.8493) {
        // ICD 16 (Condition originating in the perinatal period)
        causeOfDeath = 'of a condition originating in the perinatal period';
      } else if (r <= 2.3234) {
        // ICD 14 (Disease of the genitourinary system)
        causeOfDeath = 'of a disease of the genitourinary system';
      } else if (r <= 2.8568) {
        // ICD 5 (Mental and behavioural disorder)
        selector = Math.floor(Math.random() * 2);
        if (selector === 0) {
          causeOfDeath = 'of a mental disorder';
        } else if (selector == 1) {
          causeOfDeath = 'of a behavioural disorder';
        }
      } else if (r <= 2.9853) {
        // ICD 1 (Infectious and parasitic disease)
        selector = Math.floor(Math.random() * 2);
        if (selector === 0) {
          causeOfDeath = 'of an infectious disease';
        } else {
          causeOfDeath = 'of a parasitic disease';
        }
      } else if (r <= 3.4029) {
        // ICD 6 (Disease of the nervous system)
        causeOfDeath = 'of a disease of the nervous system';
      } else if (r <= 4.0942) {
        // ICD 11 (Disease of the digestive system)
        causeOfDeath = 'of a disease of the digestive system';
      } else if (r <= 4.2203) {
        // ICD 4 (Endocrine, nutritional and metabolic disease)
        selector = Math.floor(Math.random() * 3);
        if (selector === 0) {
          causeOfDeath = 'of an endocrine disease';
        } else if (selector == 1) {
          causeOfDeath = 'of a nutritional disease';
        } else {
          causeOfDeath = 'of a metabolic disease';
        }
      } else if (r <= 4.2633) {
        // ICD 20 (External cause of morbidity and mortality)
        selector = Math.floor(Math.random() * 2);
        if (selector === 0) {
          causeOfDeath = 'of an external cause of morbidity';
        } else {
          causeOfDeath = 'of an external cause of mortality';
        }
      } else if (r <= 6.2166) {
        // ICD 18 (Symptom, sign and abnormal clinical and laboratory findings)
        selector = Math.floor(Math.random() * 4);
        if (selector === 0) {
          causeOfDeath = 'of a symptom of abnormal laboratory findings';
        } else if (selector == 1) {
          causeOfDeath = 'of a sign of abnormal laboratory findings';
        } else if (selector == 2) {
          causeOfDeath = 'of a symptom of abnormal clinical findings';
        } else {
          causeOfDeath = 'of a sign of abnormal clinical findings';
        }
      } else if (r <= 8.5463) {
        // ICD 10 (Disease of the respiratory system)
        causeOfDeath = 'of a disease of the respiratory system';
      } else if (r <= 19.2189) {
        // ICD 2 (Neoplasm)
        causeOfDeath = 'of a neoplasm';
      } else {
        // ICD 9 (Disease of the circulatory system)
        causeOfDeath = 'of a disease of the circulatory system';
      }
      break;
  }
}

// Get random names
function getRandomNames() {
  btnContent = '';
  btnPath = '/api/random.php?gender=' + gender + '&number=1&randomsurname=yes&key=' + btnAPIKey;
  console.log('Getting names from behindthename.com...');
  callback = function(response) {
    response.on('data', function(chunk) {
      btnContent += chunk;
    });
    response.on('end', function() {
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
          composeTweet();
        }
      });
    });
  };
  http.get({
    host: 'www.behindthename.com',
    path: btnPath
  }, callback).end();
}

function composeTweet() {
  tweetContent = {
    status: factoid + 'Today, ' + forename + ' ' + surname + ' could have died ' + causeOfDeath + '.'
  };
  if (tweetContent.status.length > 140) {
    console.log('ERROR! Tweet is too long. Cropping...')
    tweetContent = {
      status: factoid + 'Today, ' + forename + ' ' + surname + ' could have died.'
    };
  }
  // Send tweet
  t.post('statuses/update', tweetContent, tweeted);
  function tweeted(err, data, response) {
    if (err) {
      console.log('ERROR! Tweet failed to send.');
    } else {
      console.log('SUCCESS! Tweet sent.');
    }
  }
  //debugMode();
}

// Debug mode: print tweet data to console
function debugMode() {
  console.log('\nTweet stats:');
  console.log('Gender: ' + gender);
  console.log('Forename: ' + forename);
  console.log('Surname: ' + surname);
  console.log('Cause: ' + causeOfDeath);
  console.log('Tweet length: ' + tweetContent.status.length + ' characters.\n');
}

function tweetIt() {
  getFactoid(factoidCount);
  getRandomGender();
  getRandomCause();
  getRandomNames();
}
