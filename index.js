// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {

//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP("99.246.44.7", (error, coordinates) => {
//   if (error) {
//     return console.log("It didn't work!" , error);
//   }
//   console.log('It worked! Returned coordinates:' , coordinates);
// });

const exampleCoords = { latitude: 43.467517, longitude: -79.6876659 };
fetchISSFlyOverTimes(exampleCoords, (error, flyover) => {
  if (error) {
    return console.log("It didn't work!" , error);
  }

  console.log('It worked! Returned flyover:' , flyover);
});