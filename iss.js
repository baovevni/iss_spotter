/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const needle = require('needle');


const fetchMyIP = function(callback) {
  needle.get(`https://api.ipify.org/?format=json`, (error, response, body) => {

    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const message = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(message, null);
    }

    return callback(null, body.ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  needle.get(`http://ipwho.is/${ip}`, (error, response, body) => {
    
    if (error) {
      return callback(error, null);
    }
    
    if (response.statusCode === 200 && body.success === false) {
      const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      return callback(message, null);
    }
    
    if (response.statusCode !== 200) {
      const message = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(message, null);
    }
    
    const latitude = body.latitude;
    const longitude = body.longitude;
    return callback(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  needle.get(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    
    if (error) {
      return callback(error, null);
    }
    
    if (response.statusCode !== 200) {
      const message = `Status Code ${response.statusCode} when fetching ISS flyover. Response: ${body}`;
      return callback(message, null);
    }
    
    const passes = body.response;
    return callback(null, passes);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };