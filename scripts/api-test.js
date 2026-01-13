import express from "express";
import axios from "axios";
import { prisma } from "../lib/prisma.js";

const app = express();

const options = {
  method: 'GET',
  url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination',
  params: { query: 'new' },
  headers: {
    'x-rapidapi-key': 'e8bef105afmshdce85586e78ae3fp14c057jsn0e2040da93d5',
    'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
  }
};

//Search and save flight locations in Airport and Location tables
// app.get('/flight-location', async (req, res) => {
//   try {
//     const response = await axios.request(options);

//     const airports = response.data.data.filter(
//       item => item.type === 'AIRPORT'
//     );

//     const savedAirports = [];

//     for (const airport of airports) {
//       // update location, if not found then create new location
//       const location = await prisma.location.upsert({
//         where: { city: airport.code },
//         update: {},
//         create: {
//           city: airport.code,
//           cityName: airport.cityName,
//           country: airport.country,
//           countryName: airport.countryName,
//         },
//       });

//       //update airport, if not found then create new airport
//       const savedAirport = await prisma.airport.upsert({
//         where: { airportId: airport.id },
//         update: {
//           airportName: airport.name,
//           locationId: location.id,
//         },
//         create: {
//           airportId: airport.id,
//           airportName: airport.name,
//           locationId: location.id,
//         },
//       });

//       savedAirports.push(savedAirport);
//     }

//     res.status(200).json(savedAirports);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// });


const options2 = {
  method: 'GET',
  url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights',
  params: {
    fromId: 'BOM.AIRPORT',
    toId: 'DEL.AIRPORT',
    departDate: '2026-01-23'
  },
  headers: {
    'x-rapidapi-key': 'e8bef105afmshdce85586e78ae3fp14c057jsn0e2040da93d5',
    'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
  }
};

// app.get('/flight-list', async (req, res) => {
//     try {
//         const response = await axios.request(options2);

//         // const tokens = response.data.data.flightOffers.map(flight => flight.token);

//         const flightInfo = response.data.data.flightOffers;
//         const city = flightInfo[0].segments[0].departureAirport.city;
//         const cityName = flightInfo[0].segments[0].departureAirport.cityName;
//         const country = flightInfo[0].segments[0].departureAirport.country;
//         const countryName = flightInfo[0].segments[0].departureAirport.countryName;

//         const location = await prisma.location.create({
//             data: {
//                 city: city,
//                 cityName: cityName,
//                 country: country,
//                 countryName: countryName,
//             }
//         });

//         res.status(200).json(
//             location,
//         );
//     } catch (error) {
//         console.error(error);
//     }
// })

const options3 = {
  method: 'GET',
  url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/getFlightDetails',
  params: {
    token: 'd6a1f_H4sIAAAAAAAA_y2Qa4-iMBSGf41-a6GUizNJM0Ho7LByUUS8fGmwAjLriqHdKPz6rTg5J8_7nvckTXPOUt7Eu6ZVl6Y-SwH-CVi3sq0LWULe_tWqTuHYtn-aa60VTafNk8inoYF_u7GGNKCKv-8_yuLWwA5WhO4ymsZuyLI0WLJlGnhB_GtaPiQQHSfT5ljCQnCydGc_viM2tNNkaxkWGiPeSmJCJ9-vZovdzlm8wo58OUj_isbpRCJf3JPhME-GACc9Wm--Bc4vlzShcr_J8jwZKF6jlYiyU5h790esy03oU5z5rpP39yFZ32WURSLM6AT746Ml5wRBaDpvr3-0hSDO7MdzSZD-sidJstnqsE5eoyS2hfHoBTEAXTng05uD7M09LDwlc8v0gA5QvAVW8Ow9SIHhAHMqykvJZdNeF2VPbGogywbqrsXVsEE6Mbyitx4CKzPBruqa6YrnkQVzLSVHFivykSdWFdVzVzLTNJRWzFRsGII6fObfLNgqGRjqb83jVv8HkM3ZOPoBAAA.'
  },
  headers: {
    'x-rapidapi-key': 'e8bef105afmshdce85586e78ae3fp14c057jsn0e2040da93d5',
    'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
  }
};

app.get('/flight-details', async (req, res) => {
  try {
    const response = await axios.request(options3);
    const details = response.data.data;

    const segment = details.segments[0];
    const leg = segment.legs[0];

    const departureAirport = await findOrCreateAirport(
      segment.departureAirport
    );

    const arrivalAirport = await findOrCreateAirport(
      segment.arrivalAirport
    );

    const flight = await prisma.flight.create({
      data: {
        flightName: `${departureAirport.airportId} → ${arrivalAirport.airportId}`,
        flightNumber: String(leg.flightInfo.flightNumber),
        airlineName: leg.carriersData[0].name,
        departureAirportId: departureAirport.id,
        arrivalAirportId: arrivalAirport.id,
      },
    });

    res.status(200).json(flight);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


async function findOrCreateAirport(airportData) {
  // 1. Try to find airport
  let airport = await prisma.airport.findUnique({
    where: { airportId: airportData.code },
  });

  if (airport) return airport;

  // 2. Find or create location
  const location = await prisma.location.upsert({
    where: { city: airportData.city },
    update: {},
    create: {
      city: airportData.city,
      cityName: airportData.cityName,
      country: airportData.country,
      countryName: airportData.countryName,
    },
  });

  // 3. Create airport
  airport = await prisma.airport.create({
    data: {
      airportId: airportData.code,
      airportName: airportData.name,
      locationId: location.id,
    },
  });

  return airport;
}

app.listen(3000, () => {
  console.log("Server is running on port 3000")
});
