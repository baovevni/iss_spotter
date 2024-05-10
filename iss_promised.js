const needle = require('needle');

const fetchMyIP = function() {
  return needle('get', `https://api.ipify.org/?format=json`)
    .then((response) => {
      const body = response.body; // retrieve the body value from the response object
      const ip = body.ip; // retrieve the ip from the body object
      return ip;
    });
};

const fetchCoordsByIP = function(ip) {
  return needle('get', `http://ipwho.is/${ip}`)
    .then((response) => {
      const latitude = response.body.latitude;
      const longitude = response.body.longitude;
      return { latitude, longitude };
    });
};

const fetchISSFlyOverTimes = function({ latitude, longitude }) {
  return needle(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`)
    .then((response) => {
      const passes = response.body.response;
      return passes;
    });

};

const nextISSTimesForMyLocation = function(){
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP(ip))
    .then(({ latitude, longitude }) => fetchISSFlyOverTimes({ latitude, longitude }))
    .then((passes) => {
      return passes;
    })

}

module.exports = { nextISSTimesForMyLocation };
