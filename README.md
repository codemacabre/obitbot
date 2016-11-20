# ObitBot

[ObitBot](https://twitter.com/obitbot) is a friendly Twitter bot created using [Node.js](https://nodejs.org) to post procedurally generated obituaries.

## Aims
Despite the morbid nature of this bot, ObitBot is benevolent. The obituaries it tweets are based on real [mortality data](#data), highlighting the rates of death by cause worldwide. ObitBot provides us with a constant (fictional) feed designed to mirror our own species' deaths (albeit at a greatly decreased rate; Twitter would complain if tweets were posted every 1.8 seconds).

These fictional obituaries are assigned a random name, giving them a hint of humanity, making ObitBot a place to confront, and reflect upon our inevitable demise.

## Data
Obituaries are procedurally generated using several data sources.

Names are generated using [Behind the Name](http://www.behindthename.com/) API. Gender is randomly selected and a single forename and surname are retrieved accordingly.

Cause of death is generated based on probabilities calculated from the [WHO Mortality Database](http://www.who.int/healthinfo/mortality_data/). Data is retrieved from all reporting countries using the latest available year. This data is categoried by ICD indicators and divided by gender.
