// weatherDaily.js
//*************************************************************************
//*****  Client side -- client/frontend/src/sections/weatherDaily.js  *****
//*****  This is the client Weather Page, eight-day forecast.         *****
//*************************************************************************

// import React from 'react';

// const Daily = () => {
//   return (
//     <div>
//       <div><h6 className='daily-head'>Eight Day Forecast</h6></div>
//       <section className='DailyGrid box mt-3'>
//         <span>Date</span>
//         <span>Summary</span>
//         <span>Icon</span>
//         <span>Precip</span>
//         <span>Temp</span>
//         <span>Humid</span>
//         <span>Visblty</span>
//         <span>Wind Spd</span>
//         <span>`${weather.daily.data[0].time}`</span> {/* convert to mm/dd/yyyy */}
//         <span>`${weather.daily.data[0].summary}`</span>
//         <span>`${weather.daily.data[0].icon}`</span>
//         <span>`${weather.daily.data[0].precipProbability}`</span>
//         <span>`${weather.daily.data[0].temperature}`</span>
//         <span>`${weather.daily.data[0].humidity}`</span>
//         <span>`${weather.daily.data[0].visibility}`</span>
//         <span>`${weather.daily.data[0].windSpeed}`</span>
//         <span>`${weather.daily.data[1].time}`</span> {/* convert to mm/dd/yyyy */}
//         <span>`${weather.daily.data[1].summary}`</span>
//         <span>`${weather.daily.data[1].icon}`</span>
//         <span>`${weather.daily.data[1].precipProbability}`</span>
//         <span>`${weather.daily.data[1].temperature}`</span>
//         <span>`${weather.daily.data[1].humidity}`</span>
//         <span>`${weather.daily.data[1].visibility}`</span>
//         <span>`${weather.daily.data[1].windSpeed}`</span>
//         <span>`${weather.daily.data[2].time}`</span> {/* convert to mm/dd/yyyy */}
//         <span>`${weather.daily.data[2].summary}`</span>
//         <span>`${weather.daily.data[2].icon}`</span>
//         <span>`${weather.daily.data[2].precipProbability}`</span>
//         <span>`${weather.daily.data[2].temperature}`</span>
//         <span>`${weather.daily.data[2].humidity}`</span>
//         <span>`${weather.daily.data[2].visibility}`</span>
//         <span>`${weather.daily.data[2].windSpeed}`</span>
//         <span>`${weather.daily.data[3].time}`</span> {/* convert to mm/dd/yyyy */}
//         <span>`${weather.daily.data[3].summary}`</span>
//         <span>`${weather.daily.data[3].icon}`</span>
//         <span>`${weather.daily.data[3].precipProbability}`</span>
//         <span>`${weather.daily.data[3].temperature}`</span>
//         <span>`${weather.daily.data[3].humidity}`</span>
//         <span>`${weather.daily.data[3].visibility}`</span>
//         <span>`${weather.daily.data[3].windSpeed}`</span>
//         <span>`${weather.daily.data[4].time}`</span> {/* convert to mm/dd/yyyy */}
//         <span>`${weather.daily.data[4].summary}`</span>
//         <span>`${weather.daily.data[4].icon}`</span>
//         <span>`${weather.daily.data[4].precipProbability}`</span>
//         <span>`${weather.daily.data[4].temperature}`</span>
//         <span>`${weather.daily.data[4].humidity}`</span>
//         <span>`${weather.daily.data[4].visibility}`</span>
//         <span>`${weather.daily.data[4].windSpeed}`</span>
//         <span>`${weather.daily.data[5].time}`</span> {/* convert to mm/dd/yyyy */}
//         <span>`${weather.daily.data[5].summary}`</span>
//         <span>`${weather.daily.data[5].icon}`</span>
//         <span>`${weather.daily.data[5].precipProbability}`</span>
//         <span>`${weather.daily.data[5].temperature}`</span>
//         <span>`${weather.daily.data[5].humidity}`</span>
//         <span>`${weather.daily.data[5].visibility}`</span>
//         <span>`${weather.daily.data[5].windSpeed}`</span>
//         <span>`${weather.daily.data[6].time}`</span> {/* convert to mm/dd/yyyy */}
//         <span>`${weather.daily.data[6].summary}`</span>
//         <span>`${weather.daily.data[6].icon}`</span>
//         <span>`${weather.daily.data[6].precipProbability}`</span>
//         <span>`${weather.daily.data[6].temperature}`</span>
//         <span>`${weather.daily.data[6].humidity}`</span>
//         <span>`${weather.daily.data[6].visibility}`</span>
//         <span>`${weather.daily.data[6].windSpeed}`</span>
//         <span>`${weather.daily.data[7].time}`</span> {/* convert to mm/dd/yyyy */}
//         <span>`${weather.daily.data[7].summary}`</span>
//         <span>`${weather.daily.data[7].icon}`</span>
//         <span>`${weather.daily.data[7].precipProbability}`</span>
//         <span>`${weather.daily.data[7].temperature}`</span>
//         <span>`${weather.daily.data[7].humidity}`</span>
//         <span>`${weather.daily.data[7].visibility}`</span>
//         <span>`${weather.daily.data[7].windSpeed}`</span>
//       </section>
//     </div>
//   );
// }

// export default Daily;