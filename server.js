

// API endpoint: /api/timestamp/:date_string?
// A valid date can be parsed as: new Date(date_string)

// unix: integer (milliseconds)
// date_strings: "2016-11-20"

// if the date is EMPTY: new Date() (current timestamp)

// valid: {"unix": <date.getTime()>, "utc" : <date.toUTCString()> } 
// invalid: {"error" : "Invalid Date" }.
const express = require("express");
const cors = require("cors");

const app = module.exports = express();
app.use(cors());
// Build an API endpoint and receive the response as JSON
// get request if the user does not provide a unix timestamp or a date:
  // Date.now() => returns the unix timestamp at the current time/Date: the number of milliseconds since 1970
  // new Date.toUTCString() returns the current date in the form: Fri, 17 Jul 2020 15:03:48 GMT
  
  app.get("/api/timestamp/", (req, res) => {
    res.json({
    "unix": Date.now(),
    "utc": new Date().toUTCString()
  })
  });
  

  
  app.get("/api/timestamp/:date_string", (req,res) => {
    const date_string = req.params.date_string;
    const date_integer = parseInt(date_string);
  
    if (isNaN(date_integer)) { // if the unix timestamp or date entered is NOT a number, an error will be thrown
    res.json({error: "Invalid Date"});
    }
    if ((/\d{4}(?=-)/).test(date_string)) { // test the date_string to see if it is a year in the format "1990-", if this is true, it is a date
      if (new Date(date_string) == "Invalid Date") { // if a date is entered incorrectly & cannot be properly parsed: an error
        res.json({error : "Invalid Date" });
    } else { // if the date can be successfully parsed 
       let utcDate = new Date(date_string).toUTCString();
       res.json({
           unix: Date.parse(utcDate), // The Date.parse() method parses a string representation of a date, and returns the number of milliseconds since the UNIX EPOCH
           utc: utcDate
       });
   }
 } else { // if a UNIX timestamp is entered instead of a date
     let unixTime = parseInt(date_string); // make it an integer
       res.json({
           unix: unixTime,
           utc: new Date(unixTime*1000).toUTCString() // multiplied by 1000 so that the argument is in milliseconds, not seconds.
       });
   }
  })


// listen for requests :)
var listener = app.listen(3000, () =>  {
  console.log('Your app is listening on port ' + listener.address().port);
});