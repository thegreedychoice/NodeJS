/*
* Create and export configuration variables
*
*/

//Container for all the environments
var environments = {};

//  Development (default) environment
environments.development = {
  'port': 3000,
  'envName': 'development'
};

//  Staging environment
environments.staging = {
  'port': 4000,
  'envName': 'staging'
};

//Production environment
environments.production = {
  'port': 5000,
  'envName': 'production'
};

//Determine which to export when command-line arg is passed
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//Check the current environment is defined and if yes, return the Object
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.development;

module.exports = environmentToExport;
