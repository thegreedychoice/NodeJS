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
  'hashingSecret': 'thisIsSecret'
};

//  Staging environment
environments.staging = {
  'httpPort': 4000,
  'httpsPort': 4001,
  'envName': 'staging',
  'hashingSecret': 'thisIsSecret'
};

//Production environment
environments.production = {
  'httpPort': 5000,
  'httpsPort': 5001,
  'envName': 'production',
  'hashingSecret': 'thisIsSecret'
};

//Determine which to export when command-line arg is passed
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//Check the current environment is defined and if yes, return the Object
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.development;

module.exports = environmentToExport;
