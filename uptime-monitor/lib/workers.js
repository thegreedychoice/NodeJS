/*
* Worker related tasks
*
*/

//Dependencies
var path = require('path');
var fs = require('fs');
var _data = require('./data');
var https = require('https');
var http = require('http');
var helpers = require('./helpers');
var url = require('url');

//Instantiate the worker object
var workers = {};

//Timer to execute the woker-process once per minute 

//Init Script
workers.init = function(){
  //Execute all the checks immediately
  worker.gatherAllChecks();

  //Call the loop so the checks will execute later on
  workers.loop();

};

//Export the module
module.exports = workers;
