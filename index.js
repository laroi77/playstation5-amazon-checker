const request = require("request");
const cheerio = require("cheerio");
const say = require("say")
const open = require("open")

const DETECTION_STRING_NOT_AVAILABLE = "Derzeit nicht verfügbar."; //OTHER COUNTRY, NEEDS A CHANGE
const PLAYSTATION_DIGITAL_URL = "https://www.amazon.com/PlayStation-5-Digital/dp/B08FC6MR62/ref=sr_1_3?dchild=1&keywords=playstation+5&qid=1606160811&sr=8-3"; //OTHER COUNTRY, NEEDS A CHANGE
const PLAYSTATION_DRIVE_URL = "https://www.amazon.com/PlayStation-5-Console/dp/B08FC5L3RG/ref=sr_1_2?dchild=1&keywords=playstation+5&qid=1606160811&sr=8-2"; //OTHER COUNTRY, NEEDS A CHANGE
const INTERVAL = 30000;
const AVAILABLE_MESSAGE = " ist auf Amazon verfügbar!";

let isBrowserOpen = false;

setInterval(() => {

  request({
    uri: PLAYSTATION_DIGITAL_URL
  }, function (error, response, body) {
    var $ = cheerio.load(body);
    var availbleDigital = $("#availability > span").text().indexOf(DETECTION_STRING_NOT_AVAILABLE);
    var productNameDigital = $("#productTitle").text();
    if (availbleDigital < 0 && productNameDigital != "") {
      say.speak(productNameDigital + AVAILABLE_MESSAGE);
      if (!isBrowserOpen) open(PLAYSTATION_DIGITAL_URL, {
        app: 'google chrome'
      });
      isBrowserOpen = true;
    }
  });

  request({
    uri: PLAYSTATION_DRIVE_URL
  }, function (error, response, body) {
    var $ = cheerio.load(body);
    var availbleDrive = $("#availability > span").text().indexOf(DETECTION_STRING_NOT_AVAILABLE);
    var productNameDrive = $("#productTitle").text();
    if (availbleDrive < 0 && productNameDrive != "") {
      say.speak(productNameDrive + AVAILABLE_MESSAGE);
      if (!isBrowserOpen) open(PLAYSTATION_DRIVE_URL, {
        app: 'google chrome'
      });
      isBrowserOpen = true;
    }
  });

}, INTERVAL);