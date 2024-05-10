// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');

// fetchMyIP((error, ip) => {

//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

fetchCoordsByIP("99.246.44.7", (error, coordinates) => {
  if (error) {
    return console.log("It didn't work!" , error);
  }
  console.log('It worked! Returned coordinates:' , coordinates);
});