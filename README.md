# ObitBot

## Overview
[ObitBot](https://twitter.com/obitbot) is a Twitter bot created using [Node.js](https://nodejs.org) and [Processing]((http://processing.org/)) to post procedurally generated obituaries.

The obituaries ObitBot tweets are based on real [mortality data](#data), highlighting the rates of death by cause worldwide. ObitBot provides us with a constant (fictional) feed designed to mirror our own species' deaths (albeit at a greatly decreased rate to comply with Twitter API limits).

These fictional obituaries are assigned a procedurally generated tombstone, making ObitBot a virtual cemetery and a place to confront, and reflect upon, our inevitable demise.

## Data
ObitBot's obituaries are procedurally generated using probabilities calculated from the [WHO Mortality Database](http://www.who.int/healthinfo/mortality_data/). Data is retrieved from all reporting countries using the latest available year (as of November 2016). This data is categorised into [ICD-10 code chapters](https://icd.codes/icd10cm) and divided by gender.

## Changes
ObitBot originally composed tweets using names randomly selected using [Behind the Name](http://www.behindthename.com/) API. Gender was randomly selected and a single forename and surname were retrieved accordingly.

This functionality was added with the sole intention of making the obituaries seem real and give them a hint of humanity. Names have been removed as of v1.2.0 for several reasons, primarily to avoid the risk of randomly generating a real name and potentially being insensitive, distressing or even triggering for readers.

## Usage
ObitBot requires the [twit](https://www.npmjs.com/package/twit) Node package to be installed in the `node_modules` subdirectory to communicate with Twitter.

The bot can be run using the following command:
```
$ node bot.js
```

API keys are required to interact with Twitter. These should be saved in the file `config.js` (not contained in this repo for obvious security reasons). Use the following formats:

#### config.js
```javascript
module.exports = {
  consumer_key:         'YOUR-KEY-HERE',
  consumer_secret:      'YOUR-KEY-HERE',
  access_token:         'YOUR-KEY-HERE',
  access_token_secret:  'YOUR-KEY-HERE',
  timeout_ms:           60*1000
}
```

## Disclaimer
A disclaimer was attached to the original version of this bot, reading as follows:
> ObitBot's obituaries are fictitious. Any resemblance to actual persons (living or deceased) is unintentional and should not be inferred.

As the tweets posted by current version of ObitBot are more abstract and less personalised, I feel there is less chance of provoking an upsetting response, however, the above disclaimer remains true in all future versions of this bot.

This file only provides basic usage information and it is outside of the scope of this repo to provide additional support. I highly recommend following Daniel Shiffman's [Twitter Bot Tutorial](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6atTSxoRiVnSuOn6JHnq2yV) series to learn more.

## License
ObitBot itself is open source, licensed under the [MIT license](./LICENSE.md).
