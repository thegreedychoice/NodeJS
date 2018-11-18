/*
*Library for storing & editing data
*
*/

//Dependencies
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');

//Container for the module (to be exported)
var lib = {};

//Base direcory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

//Write data to a file
lib.create =  function(dir, file, data, callback){
  //Open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json','wx', function(err, fileDescriptor){
    if(!err && fileDescriptor){
      //Convert data into a string
      var stringData = JSON.stringify(data);
      //Write to a file and close it
      fs.writeFile(fileDescriptor, stringData, function(err){
        if(!err){
          fs.close(fileDescriptor, function(err){
            if(!err){
              callback(false);
            } else{
              callback('Error closing new file');
            }
          });
        } else{
          callback('Error writing to the file!');
        }
      });
    } else{
      callback('Error creating a new file, may already exist');
    }
  });
};

//Read data from a file
lib.read = function(dir, file, callback){
  fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8', function(err, data){
    if(!err && data){
      var parsedData = helpers.parseJSONToObject(data);
      callback(false, parsedData);
    } else {
        callback(err, data);
    }
  });
};

//Updata the data inside the file
lib.update = function(dir, file, data, callback){
  //Open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json','r+',function(err, fileDescriptor){
    if(!err & fileDescriptor){
      //Convert data to string
      var stringData = JSON.stringify(data);
      //Truncate the file
      fs.truncate(fileDescriptor, function(err){
        if(!err){
          //Write to the file and close it
          fs.writeFile(fileDescriptor, stringData, function(err){
            if(!err){
              fs.close(fileDescriptor, function(err){
                if(!err){
                  callback(false);
                }
                else{
                  callback('Error closing the existing file');
                }
              });
            } else{
              callback('Error writing to existing file!');
            }
          });
        } else {
          callback('Error truncating file!');
        }
      });
    } else{
        callback('Could not open the file for updating, it may not exist');
    }
  })
};

//Delete a file
lib.delete = function(dir, file, callback){
  //unlink the file
  fs.unlink(lib.baseDir+dir+'/'+file+'.json', function(err){
    if(!err){
      callback(false);
    } else {
      callback('Error while deleting the file');
    }
  });
};

//List all the items in the directory
lib.list = function(dir, callback){
  fs.readdir(lib.baseDir+dir+'/', function(err, data){
    if(!err && data && data.length > 0){
      var trimmedFileNames = [];
      data.forEach(function(fileName){
        trimmedFileNames.push(fileName.replace('.json', ''));
      });
      callback(false, trimmedFileNames);
    } else {
      callback(err, data);
    }
  });
};

//Export the module
module.exports = lib;
