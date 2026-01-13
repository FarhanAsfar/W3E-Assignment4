import express from "express";
import axios from "axios";
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

const app = express();

const options = {
  method: 'GET',
  url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination',
  params: {query: 'new'},
  headers: {
    'x-rapidapi-key': 'e8bef105afmshdce85586e78ae3fp14c057jsn0e2040da93d5',
    'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
  }
};


app.get('/flight-location', async (req, res) => {
    try {
        const response = await axios.request(options);
        console.log(response.data);

        const airports = response.data.data.filter(item => item.type == 'AIRPORT');
        console.log(airports[0]?.id);

        const selectedAirport = airports[0];
        // const savedFlight = await prisma.flight.create({
        //   data: {

        //   }
        // })
        
        res.status(200).json(
            response.data
        );
    } catch (error) {
        console.error(error);
    }
})

// const options2 = {
//   method: 'GET',
//   url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights',
//   params: {
//     fromId: 'BOM.AIRPORT',
//     toId: 'DEL.AIRPORT',
//     departDate: '2026-01-23'
//   },
//   headers: {
//     'x-rapidapi-key': 'e8bef105afmshdce85586e78ae3fp14c057jsn0e2040da93d5',
//     'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
//   }
// };

// app.get('/flight-list', async (req, res) => {
//     try {
//         const response = await axios.request(options2);
        
//         const tokens = response.data.data.flightOffers.map(flight => flight.token);

//         res.status(200).json(
//             tokens,
//         );
//     } catch (error) {
//         console.error(error);
//     }
// })

// const options3 = {
//   method: 'GET',
//   url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/getFlightDetails',
//   params: {
//     token: 'd6a1f_H4sIAAAAAAAA_y2Qa4-iMBSGf41-a6GUizNJM0Ho7LByUUS8fGmwAjLriqHdKPz6rTg5J8_7nvckTXPOUt7Eu6ZVl6Y-SwH-CVi3sq0LWULe_tWqTuHYtn-aa60VTafNk8inoYF_u7GGNKCKv-8_yuLWwA5WhO4ymsZuyLI0WLJlGnhB_GtaPiQQHSfT5ljCQnCydGc_viM2tNNkaxkWGiPeSmJCJ9-vZovdzlm8wo58OUj_isbpRCJf3JPhME-GACc9Wm--Bc4vlzShcr_J8jwZKF6jlYiyU5h790esy03oU5z5rpP39yFZ32WURSLM6AT746Ml5wRBaDpvr3-0hSDO7MdzSZD-sidJstnqsE5eoyS2hfHoBTEAXTng05uD7M09LDwlc8v0gA5QvAVW8Ow9SIHhAHMqykvJZdNeF2VPbGogywbqrsXVsEE6Mbyitx4CKzPBruqa6YrnkQVzLSVHFivykSdWFdVzVzLTNJRWzFRsGII6fObfLNgqGRjqb83jVv8HkM3ZOPoBAAA.'
//   },
//   headers: {
//     'x-rapidapi-key': 'e8bef105afmshdce85586e78ae3fp14c057jsn0e2040da93d5',
//     'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
//   }
// };

// app.get ('/flight-details', async (req, res) => {
//     try {
//         const response = await axios.request(options3);

//         const details = response.data.data;

//         res.status(200).json(
//             details
//         )
//     } catch (error) {
//         console.error(error);
//     }
// })

app.listen(3000, ()=> {
    console.log("Server is running on port 3000")
});
