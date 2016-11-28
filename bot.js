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
var factSelector = 0;
var factCount = 0;
var fact = '';
var causeOfDeath = '';
var gender = ''
var forename = 'Tess'; // fallback
var surname = 'Terr'; // fallback

tweetIt();
setInterval(tweetIt, 1000 * 60 * 60);

// Get random mortality statistic
function getFact(n) {
  switch(n) {
    case 0:
      fact = '56 million people die every year. ';
      factCount++;
      break;
    case 1:
      fact = 'Over 4.5 million people die every month. ';
      factCount++;
      break;
    case 2:
      fact = 'Over 150000 people die every day. ';
      factCount++;
      break;
    case 3:
      fact = 'Almost 6400 people die every hour. ';
      factCount++;
      break;
    case 4:
      fact = '106 people die every minute. ';
      factCount++;
      break;
    case 5:
      fact = '1.8 people die every second. ';
      factCount = 0;
      break;
  }
}

// Get random gender
function getRandomGender() {
  var r = Math.floor(Math.random() * 2);
  if (r == 0) {
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
        // ICD-10 Chapter 7 (Disease of the eye and adnexa)
        selector = Math.floor(Math.random() * 2);
        if (selector == 0) {
          causeOfDeath = 'of a disease of the eye';
        } else {
          causeOfDeath = 'of a disease of the adnexa';
        }
      } else if (r <= (0.0023 + 0.0050)) {
        // ICD-10 Chapter 8 (Disease of the ear and mastoid process)
        selector = Math.floor(Math.random() * 2);
        if (selector == 0) {
          causeOfDeath = 'of a disease of the ear';
        } else {
          causeOfDeath = 'of a disease of the mastoid process';
        }
      } else if (r <= (0.0023 + 0.0050 + 0.1422)) {
        // ICD-10 Chapter 12 (Disease of the skin and subcutaneous tissue)
        selector = Math.floor(Math.random() * 2);
        if (selector == 0) {
          causeOfDeath = 'of a disease of the skin';
        } else {
          causeOfDeath = 'of a disease of the subcutaneous tissue';
        }
      } else if (r <= (0.0023 + 0.0050 + 0.1422 + 0.2660)) {
        // ICD-10 Chapter 13 (Disease of the musculoskeletal system and connective tissue)
        selector = Math.floor(Math.random() * 2);
        if (selector == 0) {
          causeOfDeath = 'of a disease of the musculoskeletal system';
        } else {
          causeOfDeath = 'of a disease of the connective tissue';
        }
      } else if (r <= (0.0023 + 0.0050 + 0.1422 + 0.2660 + 0.3537)) {
        // ICD-10 Chapter 3 (Disease of blood and disorder of immune mechanism)
        selector = Math.floor(Math.random() * 3);
        if (selector == 0) {
          causeOfDeath = 'of a disease of the blood';
        } else if (selector == 1) {
          causeOfDeath = 'of a disorder of the immune system';
        } else {
          causeOfDeath = 'of a form of anaemia';
        }
      } else if (r <= (0.0023 + 0.0050 + 0.1422 + 0.2660 + 0.3537 + 0.4439)) {
        // ICD-10 Chapter 4 (Endocrine, nutritional and metabolic disease)
        selector = Math.floor(Math.random() * 4);
        if (selector == 0) {
          causeOfDeath = 'of an endocrine disease';
        } else if (selector == 1) {
          causeOfDeath = 'of a nutritional disease';
        } else if (selector == 2) {
          causeOfDeath = 'of a metabolic disease';
        } else {
          selector = Math.random() * 100;
          if (selector <= 6.4136) {
            causeOfDeath = 'of malnutrition';
          } else {
            causeOfDeath = 'of diabetes mellitus'
          }
        }
      } else if (r <=  (0.0023 + 0.0050 + 0.1422 + 0.2660 + 0.3537 + 0.4439 + 0.5705)) {
        // ICD-10 Chapter 17 (Congenital malformation, deformation and abnormality)
        selector = Math.floor(Math.random() * 3);
        if (selector == 0) {
          causeOfDeath = 'of a congenital malformation';
        } else if (selector == 1) {
          causeOfDeath = 'of a congenital deformation';
        } else {
          causeOfDeath = 'of a congenital abnormality';
        }
      } else if (r <= (0.0023 + 0.0050 + 0.1422 + 0.2660 + 0.3537 + 0.4439 + 0.5705 + 0.9608)) {
        // ICD-10 Chapter 16 (Condition originating in the perinatal period)
        causeOfDeath = 'of a condition originating in the perinatal period';
      } else if (r <= (0.0023 + 0.0050 + 0.1422 + 0.2660 + 0.3537 + 0.4439 + 0.5705 + 0.9608 + 1.6497)) {
        // ICD-10 Chapter 5 (Mental and behavioural disorder)
        selector = Math.floor(Math.random() * 3);
        if (selector == 0) {
          causeOfDeath = 'of a mental disorder';
        } else if (selector == 1) {
          causeOfDeath = 'of a behavioural disorder';
        } else {
          selector = Math.floor(Math.random() * 2);
          if (selector == 0) {
            causeOfDeath = 'of Alzheimer\'s disease';
          } else {
            causeOfDeath = 'of a form of dementia';
          }
        }
      } else if (r <= (0.0023 + 0.0050 + 0.1422 + 0.2660 + 0.3537 + 0.4439 + 0.5705 + 0.9608 + 1.6497 + 2.0821)) {
        // ICD-10 Chapter 14 (Disease of the genitourinary system)
        selector = Math.floor(Math.random() * 2);
        if (selector == 0) {
          causeOfDeath = 'of a disease of the genitourinary system';
        } else {
          selector = Math.random() * 100;
          if (selector <= 4.5054) {
            causeOfDeath = 'of hyperplasia of the prostate';
          } else {
            selector = Math.floor(Math.random() * 2)
            if (selector == 0) {
              causeOfDeath = 'of a disorder of the kidney';
            } else {
              causeOfDeath = 'of a disorder of the ureter';
            }
          }
        }
      } else if (r <= (0.0023 + 0.0050 + 0.1422 + 0.2660 + 0.3537 + 0.4439 + 0.5705 + 0.9608 + 1.6497 + 2.0821 + 2.5575)) {
        // ICD-10 Chapter 6 (Disease of the nervous system)
        causeOfDeath = 'of a disease of the nervous system';
      } else if (r <= (0.0023 + 0.0050 + 0.1422 + 0.2660 + 0.3537 + 0.4439 + 0.5705 + 0.9608 + 1.6497 + 2.0821 + 2.5575 + 3.5005)) {
        // ICD-10 Chapter 18 (Symptom, sign and abnormal clinical and laboratory findings)
        selector = Math.floor(Math.random() * 4);
        if (selector == 0) {
          causeOfDeath = 'of a symptom of abnormal laboratory findings';
        } else if (selector == 1) {
          causeOfDeath = 'of a sign of abnormal laboratory findings';
        } else if (selector == 2) {
          causeOfDeath = 'of a symptom of abnormal clinical findings';
        } else {
          causeOfDeath = 'of a sign of abnormal clinical findings';
        }
      } else if (r <= (0.0023 + 0.0050 + 0.1422 + 0.2660 + 0.3537 + 0.4439 + 0.5705 + 0.9608 + 1.6497 + 2.0821 + 2.5575 + 3.5005 + 3.5005)) {
        // ICD-10 Chapter 1 (Infectious and parasitic disease)
        selector = Math.floor(Math.random() * 3);
        if (selector == 0) {
          causeOfDeath = 'of an infectious disease';
        } else if (selector == 1) {
          causeOfDeath = 'of a parasitic disease';
        } else {
          selector = Math.random() * 100;
          if (selector <= 0.0064) {
            causeOfDeath = 'of diptheria';
          } else if (selector <= (0.0064 + 0.0261)) {
            causeOfDeath = 'of measles';
          } else if (selector <= (0.0064 + 0.0261 + 0.0570)) {
            causeOfDeath = 'of whooping cough';
          } else if (selector <= (0.0064 + 0.0261 + 0.0570 + 0.1083)) {
            causeOfDeath = 'of poliomyelitis';
          } else if (selector <= (0.0064 + 0.0261 + 0.0570 + 0.1083 + 0.2844)) {
            causeOfDeath = 'of tetanus';
          } else if (selector <= (0.0064 + 0.0261 + 0.0570 + 0.1083 + 0.2844 + 0.3001)) {
            causeOfDeath = 'of meningococcal infection';
          } else if (selector <= (0.0064 + 0.0261 + 0.0570 + 0.1083 + 0.2844 + 0.3001 + 0.3497)) {
            causeOfDeath = 'of malaria';
          } else if (selector <= (0.0064 + 0.0261 + 0.0570 + 0.1083 + 0.2844 + 0.3001 + 0.3497 + 0.5823)) {
            causeOfDeath = 'of a sexually-transmitted infection';
          } else if (selector <= (0.0064 + 0.0261 + 0.0570 + 0.1083 + 0.2844 + 0.3001 + 0.3497 + 0.5823 + 7.2395)) {
            causeOfDeath = 'of viral hepatitis';
          } else if (selector <= (0.0064 + 0.0261 + 0.0570 + 0.1083 + 0.2844 + 0.3001 + 0.3497 + 0.5823 + 7.2395 + 11.2284)) {
            causeOfDeath = 'of an intestinal infectious disease';
          } else if (selector <= (0.0064 + 0.0261 + 0.0570 + 0.1083 + 0.2844 + 0.3001 + 0.3497 + 0.5823 + 7.2395 + 11.2284 + 18.1738)) {
            causeOfDeath = 'of HIV disease';
          } else if (selector <= (0.0064 + 0.0261 + 0.0570 + 0.1083 + 0.2844 + 0.3001 + 0.3497 + 0.5823 + 7.2395 + 11.2284 + 18.1738 + 29.7720)) {
            causeOfDeath = 'of tuberculosis';
          } else {
            causeOfDeath = 'of septicaemia';
          }
        }
      } else if (r <= (0.0023 + 0.0050 + 0.1422 + 0.2660 + 0.3537 + 0.4439 + 0.5705 + 0.9608 + 1.6497 + 2.0821 + 2.5575 + 3.5005 + 3.5005 + 5.0241)) {
        // ICD-10 Chapter 11 (Disease of the digestive system)
        selector = Math.floor(Math.random() * 2);
        if (selector == 0) {
          causeOfDeath = 'of a disease of the digestive system';
        } else {
          selector = Math.random() * 100;
          if (selector <= 9.6999) {
            selector = Math.floor(Math.random() * 2);
            if (selector = 0) {
              causeOfDeath = 'of a gastric ulcer';
            } else {
              causeOfDeath = 'of a duodenal ulcer';
            }
          } else {
            causeOfDeath = 'of a disease of the liver';
          }
        }
      } else if (r <= (0.0023 + 0.0050 + 0.1422 + 0.2660 + 0.3537 + 0.4439 + 0.5705 + 0.9608 + 1.6497 + 2.0821 + 2.5575 + 3.5005 + 3.5005 + 5.0241 + 9.2260)) {
        // ICD-10 Chapter 10 (Disease of the respiratory system)
        selector = Math.floor(Math.random() * 2);
        if (selector == 0) {
          causeOfDeath = 'of a disease of the respiratory system';
        } else {
          selector = Math.random() * 100;
          if (selector <= 0.6763) {
            causeOfDeath = 'of influenza';
          } else if (selector <= (0.6763 + 49.5280)) {
            causeOfDeath = 'of a chronic lower respiratory disease';
          } else {
            causeOfDeath = 'of pneumonia';
          }
        }
      } else if (r <= (0.0023 + 0.0050 + 0.1422 + 0.2660 + 0.3537 + 0.4439 + 0.5705 + 0.9608 + 1.6497 + 2.0821 + 2.5575 + 3.5005 + 3.5005 + 5.0241 + 9.2260 + 10.9316)) {
        // ICD-10 Chapter 20 (External cause of morbidity and mortality)
        selector = Math.random() * 100;
        if (selector <= 1.6567) {
          selector = Math.floor(Math.random() * 3);
          if (selector == 0) {
            causeOfDeath = 'of exposure to smoke';
          } else if (selector == 1) {
            causeOfDeath = 'of exposure to fire';
          } else {
            causeOfDeath = 'of exposure to flames';
          }
        } else if (selector <= (1.6567 + 4.2351)) {
          selector = Math.floor(Math.random() * 2);
          if (selector == 0) {
            causeOfDeath = 'of accidental drowning';
          } else {
            causeOfDeath = 'of accidental submersion';
          }
        } else if (selector <= (1.6567 + 4.2351 + 6.8039)) {
          selector = Math.floor(Math.random() * 2);
          if (selector == 0) {
            causeOfDeath = 'of accidental poisoning';
          } else {
            causeOfDeath = 'of accidental exposure to a noxious substance';
          }
        } else if (selector <= (1.6567 + 4.2351 + 6.8039 + 7.4330)) {
          causeOfDeath = 'of a fall';
        } else if (selector <= (1.6567 + 4.2351 + 6.8039 + 7.4330 + 15.4248)) {
          causeOfDeath = 'as a victim of assault';
        } else if (selector <= (1.6567 + 4.2351 + 6.8039 + 7.4330 + 15.4248 + 17.3186)) {
          causeOfDeath = 'of intentional self-harm';
        } else if (selector <= (1.6567 + 4.2351 + 6.8039 + 7.4330 + 15.4248 + 17.3186 + 20.0778)) {
          causeOfDeath = 'of a transport accident';
        } else {
          causeOfDeath = 'of an undefined external cause of mortality';
        }
      } else if (r <= (0.0023 + 0.0050 + 0.1422 + 0.2660 + 0.3537 + 0.4439 + 0.5705 + 0.9608 + 1.6497 + 2.0821 + 2.5575 + 3.5005 + 3.5005 + 5.0241 + 9.2260 + 10.9316 + 21.4441)) {
        // ICD-10 Chapter 2 (Neoplasm)
        selector = Math.random() * 100;
        if (selector <= 1.8612) {
          selector = Math.floor(Math.random() * 2);
          if (selector == 0) {
            causeOfDeath = 'of melanoma';
          } else {
            causeOfDeath = 'of a form of skin cancer';
          }
        } else if (selector <= (1.8612 + 3.1796)) {
          causeOfDeath = 'of a benign neoplasm';
        } else if (selector <= (1.8612 + 3.1796 + 3.6920)) {
          selector = Math.floor(Math.random() * 3);
          if (selector == 0) {
            causeOfDeath = 'of a malignant neoplasm of the lip';
          } else if (selector == 1) {
            causeOfDeath = 'of a malignant neoplasm of the oral cavity';
          } else {
            causeOfDeath = 'of a malignant neoplasm of the pharynx';
          }
        } else if (selector <= (1.8612 + 3.1796 + 3.6920 + 4.0776)) {
          causeOfDeath = 'of a malignant neoplasm of the bladder';
        } else if (selector <= (1.8612 + 3.1796 + 3.6920 + 4.0776 + 4.0838)) {
          causeOfDeath = 'of leukaemia';
        } else if (selector <= (1.8612 + 3.1796 + 3.6920 + 4.0776 + 4.0838 + 4.1331)) {
          causeOfDeath = 'of a malignant neoplasm of the oesophagus';
        } else if (selector <= (1.8612 + 3.1796 + 3.6920 + 4.0776 + 4.0838 + 4.1331 + 4.9090)) {
          selector = Math.floor(Math.random() * 2);
          if (selector == 0) {
            causeOfDeath = 'of a malignant lymphoma';
          } else {
            causeOfDeath = 'of multiple myeloma';
          }
        } else if (selector <= (1.8612 + 3.1796 + 3.6920 + 4.0776 + 4.0838 + 4.1331 + 4.9090 + 6.4663)) {
          causeOfDeath = 'of a malignant neoplasm of the pancreas';
        } else if (selector <= (1.8612 + 3.1796 + 3.6920 + 4.0776 + 4.0838 + 4.1331 + 4.9090 + 6.4663 + 7.2110)) {
          selector = Math.floor(Math.random() * 2);
          if (selector == 0) {
            causeOfDeath = 'of a malignant neoplasm of the liver';
          } else {
            causeOfDeath = 'of a malignant neoplasm of intrahepatic bile ducts';
          }
        } else if (selector <= (1.8612 + 3.1796 + 3.6920 + 4.0776 + 4.0838 + 4.1331 + 4.9090 + 6.4663 + 7.2110 + 8.4675)) {
          causeOfDeath = 'of a malignant neoplasm of the stomach';
        } else if (selector <= (1.8612 + 3.1796 + 3.6920 + 4.0776 + 4.0838 + 4.1331 + 4.9090 + 6.4663 + 7.2110 + 8.4675 + 10.9814)) {
          causeOfDeath = 'of a malignant neoplasm of the prostate';
        } else if (selector <= (1.8612 + 3.1796 + 3.6920 + 4.0776 + 4.0838 + 4.1331 + 4.9090 + 6.4663 + 7.2110 + 8.4675 + 10.9814 + 12.0702)) {
          selector = Math.floor(Math.random() * 5);
          if (selector == 0) {
            causeOfDeath = 'of a malignant neoplasm of the colon';
          } else if (selector == 1) {
            causeOfDeath = 'of a malignant neoplasm of the rectosigmoid junction';
          } else if (selector == 2) {
            causeOfDeath = 'of a malignant neoplasm of the rectum';
          } else if (selector == 3) {
            causeOfDeath = 'of a malignant neoplasm of the anus';
          } else {
            causeOfDeath = 'of a malignant neoplasm of the anal canal';
          }
        } else {
          selector = Math.floor(Math.random() * 3);
          if (selector == 0) {
            causeOfDeath = 'of a malignant neoplasm of the trachea';
          } else if (selector == 1) {
            causeOfDeath = 'of a malignant neoplasm of the bronchus';
          } else {
            causeOfDeath = 'of a malignant neoplasm of the lung';
          }
        }
      } else {
        // ICD-10 Chapter 9 (Disease of the circulatory system)
        selector = Math.floor(Math.random() * 100);
        if (selector <= 0.5084) {
          selector = Math.floor(Math.random() * 2);
          if (selector == 0) {
            causeOfDeath = 'of acute rheumatic fever';
          } else {
            causeOfDeath = 'of a chronic rheumatic heart disease';
          }
        } else if (selector <= (0.5084 + 6.3549)) {
          selector = Math.floor(Math.random() * 3);
          if (selector == 0) {
            causeOfDeath = 'of a disease of the arteries';
          } else if (selector == 1) {
            causeOfDeath = 'of a disease of the arterioles';
          } else {
            causeOfDeath = 'of a disease of the capillaries';
          }
        } else if (selector <= (0.5084 + 6.3549 + 9.1139)) {
          causeOfDeath = 'of a hypertensive disease';
        } else if (selector <= (0.5084 + 6.3549 + 9.1139 + 28.4372)) {
          causeOfDeath = 'of a cerebrovascular disease';
        } else {
          causeOfDeath = 'of an ischaemic heart disease';
        }
      }
      break;
    case 'f':
      if (r <= 0.0030) {
        // ICD-10 Chapter 7 (Disease of the eye and adnexa)
        selector = Math.floor(Math.random() * 2);
        if (selector == 0) {
          causeOfDeath = 'of a disease of the eye';
        } else {
          causeOfDeath = 'of a disease of the adnexa';
        }
      } else if (r <= (0.0030 + 0.0046)) {
        // ICD-10 Chapter 8 (Disease of the ear and mastoid process)
        selector = Math.floor(Math.random() * 2);
        if (selector == 0) {
          causeOfDeath = 'of a disease of the ear';
        } else {
          causeOfDeath = 'of a disease of the mastoid process';
        }
      } else if (r <= (0.0030 + 0.0046 + 0.1296)) {
        // ICD-10 Chapter 15 (Pregnancy, childbirth and the puerperium)
        selector = Math.floor(Math.random() * 4);
        if (selector == 0) {
          causeOfDeath = 'during pregnancy';
        } else if (selector == 1) {
          causeOfDeath = 'during childbirth';
        } else if (selector == 2) {
          causeOfDeath = 'during the puerperium';
        } else {
          selector = math.random() * 100;
          if (selector <= 8.7319) {
            causeOfDeath = 'due to a pregnancy with an abortive outcome';
          } else if (selector <= (8.7319 + 20.8202)) {
            causeOfDeath = 'due to an undefined indirect obstetric cause';
          } else {
            causeOfDeath = 'due to an undefined direct obstetric cause';
          }
        }
      } else if (r <= (0.0030 + 0.0046 + 0.1296 + 0.2246)) {
        // ICD-10 Chapter 12 (Disease of the skin and subcutaneous tissue)
        selector = Math.floor(Math.random() * 2);
        if (selector == 0) {
          causeOfDeath = 'of a disease of the skin';
        } else {
          causeOfDeath = 'of a disease of the subcutaneous tissue';
        }
      } else if (r <= (0.0030 + 0.0046 + 0.1296 + 0.2246 + 0.4439)) {
        // ICD-10 Chapter 3 (Disease of blood and disorder of immune mechanism)
        selector = Math.floor(Math.random() * 3);
        if (selector == 0) {
          causeOfDeath = 'of a disease of the blood';
        } else if (selector == 1) {
          causeOfDeath = 'of a disorder of the immune system';
        } else {
          causeOfDeath = 'of a form of anaemia';
        }
      } else if (r <= (0.0030 + 0.0046 + 0.1296 + 0.2246 + 0.4439 + 0.5499)) {
        // ICD-10 Chapter 13 (Disease of the musculoskeletal system and connective tissue)
        selector = Math.floor(Math.random() * 2);
        if (selector == 0) {
          causeOfDeath = 'of a disease of the musculoskeletal system';
        } else {
          causeOfDeath = 'of a disease of the connective tissue';
        }
      } else if (r <= (0.0030 + 0.0046 + 0.1296 + 0.2246 + 0.4439 + 0.5499 + 0.5512)) {
        // ICD-10 Chapter 17 (Congenital malformation, deformation and abnormality)
        selector = Math.floor(Math.random() * 3);
        if (selector == 0) {
          causeOfDeath = 'of a congenital malformation';
        } else if (selector == 1) {
          causeOfDeath = 'of a congenital deformation';
        } else {
          causeOfDeath = 'of a congenital abnormality';
        }
      } else if (r <= (0.0030 + 0.0046 + 0.1296 + 0.2246 + 0.4439 + 0.5499 + 0.5512 + 0.8493)) {
        // ICD-10 Chapter 16 (Condition originating in the perinatal period)
        causeOfDeath = 'of a condition originating in the perinatal period';
      } else if (r <= (0.0030 + 0.0046 + 0.1296 + 0.2246 + 0.4439 + 0.5499 + 0.5512 + 0.8493 + 2.3234)) {
        // ICD-10 Chapter 14 (Disease of the genitourinary system)
        selector = Math.floor(Math.random() * 2);
        if (selector == 0) {
          causeOfDeath = 'of a disease of the genitourinary system';
        } else {
          selector = Math.floor(Math.random() * 2);
          if (selector == 0) {
            causeOfDeath = 'of a disorder of the kidney';
          } else {
            causeOfDeath = 'of a disorder of the ureter';
          }
        }
      } else if (r <= (0.0030 + 0.0046 + 0.1296 + 0.2246 + 0.4439 + 0.5499 + 0.5512 + 0.8493 + 2.3234 + 2.8568)) {
        // ICD-10 Chapter 5 (Mental and behavioural disorder)
        selector = Math.floor(Math.random() * 3);
        if (selector == 0) {
          causeOfDeath = 'of a mental disorder';
        } else if (selector == 1) {
          causeOfDeath = 'of a behavioural disorder';
        } else {
          selector = Math.floor(Math.random() * 2);
          if (selector == 0) {
            causeOfDeath = 'of Alzheimer\'s disease';
          } else {
            causeOfDeath = 'of a form of dementia';
          }
        }
      } else if (r <= (0.0030 + 0.0046 + 0.1296 + 0.2246 + 0.4439 + 0.5499 + 0.5512 + 0.8493 + 2.3234 + 2.8568 + 2.9853)) {
        // ICD-10 Chapter 1 (Infectious and parasitic disease)
        selector = Math.floor(Math.random() * 3);
        if (selector == 0) {
          causeOfDeath = 'of an infectious disease';
        } else if (selector == 1) {
          causeOfDeath = 'of a parasitic disease';
        } else {
          selector = Math.random() * 100;
          if (selector <= 0.0134) {
            causeOfDeath = 'of diptheria';
          } else if (selector <= (0.0134 + 0.0377)) {
            causeOfDeath = 'of measles';
          } else if (selector <= (0.0134 + 0.0377 + 0.0804)) {
            causeOfDeath = 'of whooping cough';
          } else if (selector <= (0.0134 + 0.0377 + 0.0804 + 0.1327)) {
            causeOfDeath = 'of tetanus';
          } else if (selector <= (0.0134 + 0.0377 + 0.0804 + 0.1327 + 0.1419)) {
            causeOfDeath = 'of poliomyelitis';
          } else if (selector <= (0.0134 + 0.0377 + 0.0804 + 0.1327 + 0.1419 + 0.2754)) {
            causeOfDeath = 'of malaria';
          } else if (selector <= (0.0134 + 0.0377 + 0.0804 + 0.1327 + 0.1419 + 0.2754 + 0.3436)) {
            causeOfDeath = 'of meningococcal infection';
          } else if (selector <= (0.0134 + 0.0377 + 0.0804 + 0.1327 + 0.1419 + 0.2754 + 0.3436 + 0.4466)) {
            causeOfDeath = 'of a sexually-transmitted infection';
          } else if (selector <= (0.0134 + 0.0377 + 0.0804 + 0.1327 + 0.1419 + 0.2754 + 0.3436 + 0.4466 + 6.7552)) {
            causeOfDeath = 'of viral hepatitis';
          } else if (selector <= (0.0134 + 0.0377 + 0.0804 + 0.1327 + 0.1419 + 0.2754 + 0.3436 + 0.4466 + 6.7552 + 12.5068)) {
            causeOfDeath = 'of HIV disease';
          } else if (selector <= (0.0134 + 0.0377 + 0.0804 + 0.1327 + 0.1419 + 0.2754 + 0.3436 + 0.4466 + 6.7552 + 12.5068 + 17.6612)) {
            causeOfDeath = 'of an intestinal infectious disease';
          } else if (selector <= (0.0134 + 0.0377 + 0.0804 + 0.1327 + 0.1419 + 0.2754 + 0.3436 + 0.4466 + 6.7552 + 12.5068 + 17.6612 + 18.1216)) {
            causeOfDeath = 'of tuberculosis';
          } else {
            causeOfDeath = 'of septicaemia';
          }
        }
      } else if (r <= (0.0030 + 0.0046 + 0.1296 + 0.2246 + 0.4439 + 0.5499 + 0.5512 + 0.8493 + 2.3234 + 2.8568 + 2.9853 + 3.4029)) {
        // ICD-10 Chapter 6 (Disease of the nervous system)
        causeOfDeath = 'of a disease of the nervous system';
      } else if (r <= (0.0030 + 0.0046 + 0.1296 + 0.2246 + 0.4439 + 0.5499 + 0.5512 + 0.8493 + 2.3234 + 2.8568 + 2.9853 + 3.4029 + 4.0942)) {
        // ICD-10 Chapter 11 (Disease of the digestive system)
        selector = Math.floor(Math.random() * 2);
        if (selector == 0) {
          causeOfDeath = 'of a disease of the digestive system';
        } else {
          selector = Math.random() * 100;
          if (selector <= 13.1626) {
            selector = Math.floor(Math.random() * 2);
            if (selector = 0) {
              causeOfDeath = 'of a gastric ulcer';
            } else {
              causeOfDeath = 'of a duodenal ulcer';
            }
          } else {
            causeOfDeath = 'of a disease of the liver';
          }
        }
      } else if (r <= (0.0030 + 0.0046 + 0.1296 + 0.2246 + 0.4439 + 0.5499 + 0.5512 + 0.8493 + 2.3234 + 2.8568 + 2.9853 + 3.4029 + 4.0942 + 4.2203)) {
        // ICD-10 Chapter 4 (Endocrine, nutritional and metabolic disease)
        selector = Math.floor(Math.random() * 4);
        if (selector == 0) {
          causeOfDeath = 'of an endocrine disease';
        } else if (selector == 1) {
          causeOfDeath = 'of a nutritional disease';
        } else if (selector == 2) {
          causeOfDeath = 'of a metabolic disease';
        } else {
          selector = Math.random() * 100;
          if (selector <= 7.2464) {
            causeOfDeath = 'of malnutrition';
          } else {
            causeOfDeath = 'of diabetes mellitus'
          }
        }
      } else if (r <= (0.0030 + 0.0046 + 0.1296 + 0.2246 + 0.4439 + 0.5499 + 0.5512 + 0.8493 + 2.3234 + 2.8568 + 2.9853 + 3.4029 + 4.0942 + 4.2203 + 4.2633)) {
        // ICD-10 Chapter 20 (External cause of morbidity and mortality)
        selector = Math.random() * 100;
        if (selector <= 2.5565) {
          selector = Math.floor(Math.random() * 3);
          if (selector == 0) {
            causeOfDeath = 'of exposure to smoke';
          } else if (selector == 1) {
            causeOfDeath = 'of exposure to fire';
          } else {
            causeOfDeath = 'of exposure to flames';
          }
        } else if (selector <= (2.5565 + 3.5119)) {
          selector = Math.floor(Math.random() * 2);
          if (selector == 0) {
            causeOfDeath = 'of accidental drowning';
          } else {
            causeOfDeath = 'of accidental submersion';
          }
        } else if (selector <= (2.5565 + 3.5119 + 6.6338)) {
          causeOfDeath = 'as a victim of assault';
        } else if (selector <= (2.5565 + 3.5119 + 6.6338 + 7.7557)) {
          selector = Math.floor(Math.random() * 2);
          if (selector == 0) {
            causeOfDeath = 'of accidental poisoning';
          } else {
            causeOfDeath = 'of accidental exposure to a noxious substance';
          }
        } else if (selector <= (2.5565 + 3.5119 + 6.6338 + 7.7557 + 14.3983)) {
          causeOfDeath = 'of intentional self-harm';
        } else if (selector <= (2.5565 + 3.5119 + 6.6338 + 7.7557 + 14.3983 + 16.4118)) {
          causeOfDeath = 'of a transport accident';
        } else if (selector <= (2.5565 + 3.5119 + 6.6338 + 7.7557 + 14.3983 + 16.4118 + 16.4542)) {
          causeOfDeath = 'of a fall';
        } else {
          causeOfDeath = 'of an undefined external cause of mortality';
        }
      } else if (r <= (0.0030 + 0.0046 + 0.1296 + 0.2246 + 0.4439 + 0.5499 + 0.5512 + 0.8493 + 2.3234 + 2.8568 + 2.9853 + 3.4029 + 4.0942 + 4.2203 + 4.2633 + 6.2166)) {
        // ICD-10 Chapter 18 (Symptom, sign and abnormal clinical and laboratory findings)
        selector = Math.floor(Math.random() * 4);
        if (selector == 0) {
          causeOfDeath = 'of a symptom of abnormal laboratory findings';
        } else if (selector == 1) {
          causeOfDeath = 'of a sign of abnormal laboratory findings';
        } else if (selector == 2) {
          causeOfDeath = 'of a symptom of abnormal clinical findings';
        } else {
          causeOfDeath = 'of a sign of abnormal clinical findings';
        }
      } else if (r <= (0.0030 + 0.0046 + 0.1296 + 0.2246 + 0.4439 + 0.5499 + 0.5512 + 0.8493 + 2.3234 + 2.8568 + 2.9853 + 3.4029 + 4.0942 + 4.2203 + 4.2633 + 6.2166 + 8.5463)) {
        // ICD-10 Chapter 10 (Disease of the respiratory system)
        selector = Math.floor(Math.random() * 2);
        if (selector == 0) {
          causeOfDeath = 'of a disease of the respiratory system';
        } else {
          selector = Math.random() * 100;
          if (selector <= 0.9594) {
            causeOfDeath = 'of influenza';
          } else if (selector <= (0.9594 + 45.0315)) {
            causeOfDeath = 'of a chronic lower respiratory disease';
          } else {
            causeOfDeath = 'of pneumonia';
          }
        }
      } else if (r <= (0.0030 + 0.0046 + 0.1296 + 0.2246 + 0.4439 + 0.5499 + 0.5512 + 0.8493 + 2.3234 + 2.8568 + 2.9853 + 3.4029 + 4.0942 + 4.2203 + 4.2633 + 6.2166 + 8.5463 + 19.2189)) {
        // ICD-10 Chapter 2 (Neoplasm)
        selector = Math.random() * 100;
        if (selector <= 1.5256) {
          selector = Math.floor(Math.random() * 2);
          if (selector == 0) {
            causeOfDeath = 'of melanoma';
          } else {
            causeOfDeath = 'of a form of skin cancer';
          }
        } else if (selector <= (1.5256 + 1.5278)) {
          selector = Math.floor(Math.random() * 3);
          if (selector == 0) {
            causeOfDeath = 'of a malignant neoplasm of the lip';
          } else if (selector == 1) {
            causeOfDeath = 'of a malignant neoplasm of the oral cavity';
          } else {
            causeOfDeath = 'of a malignant neoplasm of the pharynx';
          }
        } else if (selector <= (1.5256 + 1.5278 + 1.5431)) {
          causeOfDeath = 'of a malignant neoplasm of the oesophagus';
        } else if (selector <= (1.5256 + 1.5278 + 1.5431 + 1.7720)) {
          causeOfDeath = 'of a malignant neoplasm of the bladder';
        } else if (selector <= (1.5256 + 1.5278 + 1.5431 + 1.7720 + 3.7684)) {
          causeOfDeath = 'of a benign neoplasm';
        } else if (selector <= (1.5256 + 1.5278 + 1.5431 + 1.7720 + 3.7684 + 3.9176)) {
          causeOfDeath = 'of a malignant neoplasm of the cervix uteri';
        } else if (selector <= (1.5256 + 1.5278 + 1.5431 + 1.7720 + 3.7684 + 3.9176 + 3.9812)) {
          causeOfDeath = 'of leukaemia';
        } else if (selector <= (1.5256 + 1.5278 + 1.5431 + 1.7720 + 3.7684 + 3.9176 + 3.9812 + 4.0451)) {
          causeOfDeath = 'of a malignant neoplasm of the corpus uteri';
        } else if (selector <= (1.5256 + 1.5278 + 1.5431 + 1.7720 + 3.7684 + 3.9176 + 3.9812 + 4.0451 + 4.8613)) {
          selector = Math.floor(Math.random() * 2);
          if (selector == 0) {
            causeOfDeath = 'of a malignant neoplasm of the liver';
          } else {
            causeOfDeath = 'of a malignant neoplasm of intrahepatic bile ducts';
          }
        } else if (selector <= (1.5256 + 1.5278 + 1.5431 + 1.7720 + 3.7684 + 3.9176 + 3.9812 + 4.0451 + 4.8613 + 5.1003)) {
          selector = Math.floor(Math.random() * 2);
          if (selector == 0) {
            causeOfDeath = 'of a malignant lymphoma';
          } else {
            causeOfDeath = 'of multiple myeloma';
          }
        } else if (selector <= (1.5256 + 1.5278 + 1.5431 + 1.7720 + 3.7684 + 3.9176 + 3.9812 + 4.0451 + 4.8613 + 5.1003 + 5.5976)) {
          causeOfDeath = 'of a malignant neoplasm of the ovary';
        } else if (selector <= (1.5256 + 1.5278 + 1.5431 + 1.7720 + 3.7684 + 3.9176 + 3.9812 + 4.0451 + 4.8613 + 5.1003 + 5.5976 + 6.5416)) {
          causeOfDeath = 'of a malignant neoplasm of the stomach';
        } else if (selector <= (1.5256 + 1.5278 + 1.5431 + 1.7720 + 3.7684 + 3.9176 + 3.9812 + 4.0451 + 4.8613 + 5.1003 + 5.5976 + 6.5416 + 7.5945)) {
          causeOfDeath = 'of a malignant neoplasm of the pancreas';
        } else if (selector <= (1.5256 + 1.5278 + 1.5431 + 1.7720 + 3.7684 + 3.9176 + 3.9812 + 4.0451 + 4.8613 + 5.1003 + 5.5976 + 6.5416 + 7.5945 + 13.2414)) {
          selector = Math.floor(Math.random() * 5);
          if (selector == 0) {
            causeOfDeath = 'of a malignant neoplasm of the colon';
          } else if (selector == 1) {
            causeOfDeath = 'of a malignant neoplasm of the rectosigmoid junction';
          } else if (selector == 2) {
            causeOfDeath = 'of a malignant neoplasm of the rectum';
          } else if (selector == 3) {
            causeOfDeath = 'of a malignant neoplasm of the anus';
          } else {
            causeOfDeath = 'of a malignant neoplasm of the anal canal';
          }
        } else if (selector <= (1.5256 + 1.5278 + 1.5431 + 1.7720 + 3.7684 + 3.9176 + 3.9812 + 4.0451 + 4.8613 + 5.1003 + 5.5976 + 6.5416 + 7.5945 + 13.2414 + 17.0955)) {
          selector = Math.floor(Math.random() * 3);
          if (selector == 0) {
            causeOfDeath = 'of a malignant neoplasm of the trachea';
          } else if (selector == 1) {
            causeOfDeath = 'of a malignant neoplasm of the bronchus';
          } else {
            causeOfDeath = 'of a malignant neoplasm of the lung';
          }
        } else {
          causeOfDeath = 'of a malignant neoplasm of the breast';
        }
      } else {
        // ICD-10 Chapter 9 (Disease of the circulatory system)
        selector = Math.floor(Math.random() * 100);
        if (selector <= 0.8421) {
          selector = Math.floor(Math.random() * 2);
          if (selector == 0) {
            causeOfDeath = 'of acute rheumatic fever';
          } else {
            causeOfDeath = 'of a chronic rheumatic heart disease';
          }
        } else if (selector <= (0.8421 + 7.2596)) {
          selector = Math.floor(Math.random() * 3);
          if (selector == 0) {
            causeOfDeath = 'of a disease of the arteries';
          } else if (selector == 1) {
            causeOfDeath = 'of a disease of the arterioles';
          } else {
            causeOfDeath = 'of a disease of the capillaries';
          }
        } else if (selector <= (0.8421 + 7.2596 + 11.2708)) {
          causeOfDeath = 'of a hypertensive disease';
        } else if (selector <= (0.8421 + 7.2596 + 11.2708 + 33.7179)) {
          causeOfDeath = 'of a cerebrovascular disease';
        } else {
          causeOfDeath = 'of an ischaemic heart disease';
        }
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
    status: fact + 'Today, ' + forename + ' ' + surname + ' could have died ' + causeOfDeath + '.'
  };
  if (tweetContent.status.length > 140) {
    console.log('ERROR! Tweet is too long. Cropping...')
    tweetContent = {
      status: fact + 'Today, ' + forename + ' ' + surname + ' could have died.'
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
  console.log('\n' + tweetContent.status);
  console.log('\nTweet stats:');
  console.log('Gender: ' + gender);
  console.log('Forename: ' + forename);
  console.log('Surname: ' + surname);
  console.log('Cause: ' + causeOfDeath);
  console.log('Tweet length: ' + tweetContent.status.length + ' characters.\n');
}

function tweetIt() {
  getFact(factCount);
  getRandomGender();
  getRandomCause();
  getRandomNames();
}
