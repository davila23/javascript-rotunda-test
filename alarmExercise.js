/*

Suppose we have a web application that runs on a single server. Errors that
occur from time to time during normal operation of the application are logged to a
text file that is stored in the file system on the server.

We are not concerned about these errors when their frequency is low. However,
when lots of errors occur in a short period of time, there may be a problem with
the application and we want to be notified immediately. Specifically, when more
than ten errors occur in one minute, we want to receive an email notification.
In general terms or pseudo code, how would you implement such an alarm?

Please assume:

1. The general paradigm of logging errors to a text file will be kept in place.

2. There exists a function
function logError( error )
This function is called each time there is an error and appends the error to
the end of the log file.

3. We never want to receive more than one email notification per minute.

*/

// IMPORTANT : This is a pseudo code as an example, was not tested 

const cron = require("node-cron");
const myLoggers = require('log4js');
const express = require("express");

let nodemailer = require("nodemailer");
var counter = 0;

app = express();
app.listen("3128");


/* ------------------------------ Configure Logger File  ------------------------------ */

myLoggers.configure({
    appenders: { mylogger: { type:"file", filename: "path_to_file/filename" } },
    categories: { default: { appenders:["mylogger"], level:"ALL" } }
});

const logger = myLoggers.getLogger("default");

/* ------------------------------ Configure Email Sender  ------------------------------ */

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "COMPANYEMAIL@gmail.com",
    pass: "userpass"
  }
});

/* ------------------------------ Configure Log Error  ------------------------------ */

function logError( error ){
    counter ++;
    logger.warn('Error' + error);
}

/* ------------------------------ Configure Cron  ------------------------------*/

cron.schedule("1 * * * *", function(){
 
  console.log("---------------------");
  console.log("Running Cron Job");
  
  let mailOptions = {
    from: "COMPANYEMAIL@gmail.com",
    to: "sampleuser@gmail.com",
    subject: `Error in {System}`,
    text: `Hi there, this email was automatically sent by us`
  };

 // If 10 errors accumulated within one minute, send an email.
 if(counter > 10)

   transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      throw error;
    } else {
      console.log("Email successfully sent!");
    }
  });

  // Once the cron is over, I reset the counter to 0
  counter = 0;
});

