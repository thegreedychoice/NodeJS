/*
* Create and export configuration variables
*
*/

//Container for all the environments
var environments = {};

//  Development (default) environment
environments.development = {
  'httpPort': 3000,
  'httpsPort': 3001,
  'envName': 'development',
  'hashingSecret': 'thisIsSecret',
  'maxChecks': 5,
  'twilio': {
    'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
    'authToken' : '9455e3eb3109edc12e3d8c92768f7a67',
    'fromPhone' : '+15005550006'
  }
};

//  Staging environment
environments.staging = {
  'httpPort': 4000,
  'httpsPort': 4001,
  'envName': 'staging',
  'hashingSecret': 'thisIsSecret',
  'maxChecks': 5,
  'twilio': {
    'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
    'authToken' : '9455e3eb3109edc12e3d8c92768f7a67',
    'fromPhone' : '+15005550006'
  }
};

//Production environment
environments.production = {
  'httpPort': 5000,
  'httpsPort': 5001,
  'envName': 'production',
  'hashingSecret': 'thisIsSecret',
  'maxChecks': 5,
  'twilio': {
    'accountSid': '',
    'authToken': '',
    'fromPhone': ''
  }
};

//Determine which to export when command-line arg is passed
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//Check the current environment is defined and if yes, return the Object
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.development;

module.exports = environmentToExport;
