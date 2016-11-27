# ObitBot

[ObitBot](https://twitter.com/obitbot) is a friendly Twitter bot created using [Node.js](https://nodejs.org) to post procedurally generated obituaries.

## Aims
Despite the morbid nature of this bot, ObitBot is benevolent. The obituaries it tweets are based on real [mortality data](#data), highlighting the rates of death by cause worldwide. ObitBot provides us with a constant (fictional) feed designed to mirror our own species' deaths (albeit at a greatly decreased rate; Twitter would complain if tweets were posted every 1.8 seconds).

These fictional obituaries are assigned a random name, giving them a hint of humanity, making ObitBot a place to confront, and reflect upon our inevitable demise.

## Data
Obituaries are procedurally generated using several data sources:

+ Names are generated using [Behind the Name](http://www.behindthename.com/) API. Gender is randomly selected and a single forename and surname are retrieved accordingly.

+ Cause of death is generated based on probabilities calculated from the [WHO Mortality Database](http://www.who.int/healthinfo/mortality_data/). Data is retrieved from all reporting countries using the latest available year (as of November 2016). This data is categorised into [ICD-10 code chapters](https://icd.codes/icd10cm) and divided by gender.

## Usage

ObitBot requires two Node packages to be installed in the `node_modules` subdirectory, [twit](https://www.npmjs.com/package/twit) to communicate with Twitter and [xml2js](https://www.npmjs.com/package/xml2js) to read the XML output from Behind the Name.

The bot can be run using the following command:
```
$ node bot.js
```

API keys are required to interact with Twitter and Behind the Name. These should be saved in files `twitterapi.js` and `btnapi.js` respectively (not contained in this repo for obvious security reasons). Use the following formats:

#### twitterapi.js
```javascript
module.exports = {
  consumer_key:         'YOUR-KEY-HERE',
  consumer_secret:      'YOUR-KEY-HERE',
  access_token:         'YOUR-KEY-HERE',
  access_token_secret:  'YOUR-KEY-HERE',
  timeout_ms:           60*1000
}
```

#### btnapi.js
```javascript
module.exports = {
  key:                  'YOUR-KEY-HERE'
}
```

## Disclaimer

ObitBot's obituaries are fictitious. Any resemblance to actual persons (living or deceased) is unintentional.

This file only provides basic usage information and it is outside of the scope of this repo to provide additional support. I highly recommend following Daniel Shiffman's excellent [Twitter Bot Tutorial](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6atTSxoRiVnSuOn6JHnq2yV) series for more information.

See [`LICENSE.md`](https://github.com/codemacabre/obitbot/blob/master/LICENSE.md) for more information.
